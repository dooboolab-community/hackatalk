import { Channel, ChannelType, MembershipType, MessageType } from '@prisma/client';
import { inputObjectType, mutationField, stringArg } from '@nexus/schema';

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
        const changeVisibilityWhenInvisible = () => ctx.prisma.membership.update({
          data: {
            isVisible: true,
          },
          where: {
            userId_channelId: {
              userId,
              channelId: existingChannel.id,
            },
          },
        });

        changeVisibilityWhenInvisible();

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

export const leaveChannel = mutationField('leaveChannel', {
  type: 'Membership',
  args: { channelId: stringArg({ nullable: false }) },

  description: `User leaves [public] channel.
  Users cannot leave the [private] channel
  and rather this is going to be invisible in [Membership].
  This will reset to true when new [Message] is created to channel.
  User will leave the [public] channel and membership will be removed.
  `,

  resolve: async (parent, { channelId }, ctx) => {
    const userId = getUserId(ctx);

    const channels = await ctx.prisma.channel.findMany({
      where: { id: channelId, deletedAt: null },
      take: 1,
    });

    const channel = channels[0];

    if (channel.channelType === 'public') {
      return ctx.prisma.membership.delete({
        where: {
          userId_channelId: {
            userId,
            channelId,
          },
        },
      });
    }

    return ctx.prisma.membership.update({
      where: {
        userId_channelId: {
          channelId,
          userId,
        },
      },
      data: {
        isVisible: false,
      },
    });
  },
});

export const inviteUsersToChannel = mutationField('inviteUsersToChannel', {
  type: 'Channel',

  args: { channelId: stringArg({ nullable: false }), userIds: stringArg({ list: true, nullable: false }) },

  description: `Adds some users into [public] channel.
  `,

  resolve: async (_, { channelId, userIds }, ctx) => {
    const userId = getUserId(ctx);

    const channels = await ctx.prisma.channel.findMany({
      where: { id: channelId, deletedAt: null },
      take: 1,
    });
    const channel = channels[0];

    if (channel.channelType === 'private') {
      throw new Error("You can't add some users to private channel.");
    }

    const memberships = await ctx.prisma.membership.findMany({
      where: {
        userId,
        channelId: channel.id,
      },
      take: 1,
    });
    const membership = memberships[0];
    const hasAdminPermission = membership.membershipType !== 'admin' && membership.membershipType !== 'owner';

    if (hasAdminPermission) {
      throw new Error('You should have admin or owner membership to add some users to the channel.');
    }

    for (const userId of userIds) {
      const memberships = await ctx.prisma.membership.findMany({
        where: {
          channelId,
          userId,
        },
        take: 1,
      });

      if (memberships.length === 0) {
        await ctx.prisma.membership.create({
          data: {
            user: {
              connect: { id: userId },
            },
            channel: {
              connect: { id: channelId },
            },
          },
        });
      }
    }

    return channel;
  },
});

export const kickUsersFromChannel = mutationField('kickUsersFromChannel', {
  type: 'Channel',

  args: { channelId: stringArg({ nullable: false }), userIds: stringArg({ list: true, nullable: false }) },

  description: `Removes some users into [public] channel.
  `,

  resolve: async (_, { channelId, userIds }, ctx) => {
    const userId = getUserId(ctx);

    const channels = await ctx.prisma.channel.findMany({
      where: { id: channelId, deletedAt: null },
      take: 1,
    });

    const channel = channels[0];

    if (channel.channelType === 'private') {
      throw new Error("You can't remove some users from private channel.");
    }

    const memberships = await ctx.prisma.membership.findMany({
      where: {
        userId,
        channelId: channel.id,
      },
      take: 1,
    });

    const membership = memberships[0];
    const hasAdminPermission = membership.membershipType !== 'admin' && membership.membershipType !== 'owner';

    if (hasAdminPermission) {
      throw new Error('You should have admin or owner membership to add some users to the channel.');
    }

    await ctx.prisma.membership.deleteMany({
      where: {
        channelId,
        userId: {
          in: userIds,
        },
      },
    });

    return channel;
  },
});
