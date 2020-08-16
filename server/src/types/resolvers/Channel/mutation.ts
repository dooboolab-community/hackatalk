import { Channel, ChannelType, MembershipType, MessageType } from '@prisma/client';
import { inputObjectType, mutationField } from '@nexus/schema';

import { getUserId } from '../../../utils/auth';

export const MessageCreateInput = inputObjectType({
  name: 'MessageCreateInput',
  definition(t) {
    t.messageType('messageType');
    t.string('text');
    t.string('imageUrls', { list: true });
    t.string('fileUrls', { list: true });
  },
});

export const ChannelCreateInput = inputObjectType({
  name: 'ChannelCreateInput',
  definition(t) {
    t.channelType('channelType');
    t.string('name');
    t.string('userIds', { list: true });
  },
});

export const createChannel = mutationField('createChannel', {
  type: 'Channel',

  args: {
    channel: ChannelCreateInput,
    message: MessageCreateInput,
  },

  description: `Creates channel of [ChannelType].
  The private channel is unique by the unique members while
  the public channel can be created by each request.
  The public channel is something like an open chat while
  private channel is all kinds of direct messages.

  The [Membership] of private channel will be identical to all users which is (member).
  
  <Optional> The channel can be created with message of [MessageType].
  Please becareful when creating message and provide proper [MessageType].
  This query will return [Channel] with [Membership] without [Message] that has just created.
  `,

  resolve: async (_, { channel, message }, ctx) => {
    const userId = getUserId(ctx);
    const { channelType = ChannelType.private, userIds = [], name } = channel;

    const createChannel = async (isPrivate: boolean) =>
      ctx.prisma.channel.create({
        data: {
          channelType,
          name,
          membership: {
            create: {
              membershipType: !isPrivate
                ? MembershipType.owner
                : MembershipType.member,
              user: { connect: { id: userId } },
            },
          },
        },
      });

    const createMemberships = async (channelId: string, userIds: string[]) => {
      const promises = [];

      for (const userId of userIds) {
        const batch = ctx.prisma.membership.create({
          data: {
            user: {
              connect: { id: userId },
            },
            channel: {
              connect: { id: channelId },
            },
          },
        });

        promises.push(batch);
      }

      await Promise.all(promises);
    };

    interface Message {
      text?: string;
      messageType?: MessageType,
      fileUrls?: string[],
      imageUrls?: string[],
    }

    const createMessage = (
      { text, messageType = MessageType.text, fileUrls = [], imageUrls = [] } : Message,
      channelId: string,
    ) => ctx.prisma.message.create({
      data: {
        text,
        messageType,
        fileUrls: { set: fileUrls },
        imageUrls: { set: imageUrls },
        channel: { connect: { id: channelId } },
        sender: { connect: { id: userId } },
      },
    });

    const isPrivateChannel = channelType === ChannelType.private;

    if (isPrivateChannel) {
      const hasNoMembersToChat = userIds.length === 0;

      if (hasNoMembersToChat) {
        throw new Error('User has no members to chat with in private channel.');
      }

      const findChannelWithUserIds = async () => {
        const channels = await ctx.prisma.channel.findMany({
          include: {
            membership: {
              select: {
                userId: true,
                membershipType: true,
              },
            },
          },
          where: {
            membership: {
              every: {
                userId: { in: [userId, ...userIds] },
              },
            },
          },
        });

        const totalUsers = userIds.length + 1; // +1 for auth user

        let existingChannel: Channel;

        for (const channel of channels) {
          if (totalUsers === channel.membership.length) {
            existingChannel = channel;
            break;
          }
        }

        return existingChannel;
      };

      const existingChannel = await findChannelWithUserIds();
      if (existingChannel) {
        message && await createMessage(message, existingChannel.id);
        return existingChannel;
      }
    }

    const { id } = await createChannel(isPrivateChannel);
    await createMemberships(id, userIds);
    message && await createMessage(message, id);

    const getChannel = (channelId: string) => ctx.prisma.channel.findOne({
      where: { id: channelId },
      include: {
        membership: true,
      },
    });

    return getChannel(id);
  },
});
