import {
  ChannelType,
  MessageType,
} from '@prisma/client';
import {
  changeVisibilityWhenInvisible,
  createMemberships,
  createNewChannel,
  findChannelWithUserIds,
  findExistingChannel,
  findPrivateChannelWithUserIds,
} from '../../services/ChannelService';
import { inputObjectType, list, mutationField, nonNull, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';

export const MessageCreateInput = inputObjectType({
  name: 'MessageCreateInput',
  definition(t) {
    t.messageType('messageType');
    t.string('text');
    t.list.string('imageUrls');
    t.list.string('fileUrls');
  },
});

export const ChannelCreateInput = inputObjectType({
  name: 'ChannelCreateInput',
  definition(t) {
    t.channelType('channelType');
    t.string('name');
    t.list.string('userIds');
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
        throw new Error('User has no members to chat within private channel.');
      }

      const existingChannel = await findChannelWithUserIds([userId, ...userIds]);

      if (existingChannel) {
        changeVisibilityWhenInvisible(userId, existingChannel);
        await createMemberships(existingChannel.id, userIds);
        message && (await createMessage(message, existingChannel.id));

        return existingChannel;
      }
    }

    const { id } = await createNewChannel(isPrivateChannel, userId, name);

    await createMemberships(id, userIds);
    message && (await createMessage(message, id));

    const getChannel = (channelId: string) => ctx.prisma.channel.findUnique({
      where: { id: channelId },
      include: {
        membership: true,
      },
    });

    return getChannel(id);
  },
});

export const findOrCreatePrivateChannel = mutationField('findOrCreatePrivateChannel', {
  type: 'Channel',
  args: { peerUserIds: nonNull(list(stringArg())) },
  description: 'Find or create channel associated to peer user id.',

  resolve: async (parent, { peerUserIds }, ctx) => {
    const userId = getUserId(ctx);
    const existingChannel = await findPrivateChannelWithUserIds([userId, ...peerUserIds]);

    if (existingChannel) {
      peerUserIds.forEach((id: string) => changeVisibilityWhenInvisible(id, existingChannel));

      return existingChannel;
    }

    const channel = await createNewChannel(true, userId);

    await createMemberships(channel.id, peerUserIds);

    return channel;
  },
});

export const leaveChannel = mutationField('leaveChannel', {
  type: 'Membership',
  args: { channelId: nonNull(stringArg()) },

  description: `User leaves [public] channel.
  Users cannot leave the [private] channel
  and rather this is going to be invisible in [Membership].
  This will reset to true when new [Message] is created to channel.
  User will leave the [public] channel and membership will be removed.
  `,

  resolve: async (parent, { channelId }, ctx) => {
    const userId = getUserId(ctx);
    const channel = await findExistingChannel(channelId);

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
  args: { channelId: nonNull(stringArg()), userIds: nonNull(list(stringArg())) },
  description: 'Adds some users into [public] channel.',

  resolve: async (_, { channelId, userIds }, ctx) => {
    const userId = getUserId(ctx);
    const channel = await findExistingChannel(channelId);

    if (channel.channelType === 'private') {
      throw new Error("You can't add some users to private channel.");
    }

    const membership = await ctx.prisma.membership.findFirst({
      where: {
        userId,
        channelId: channel.id,
      },
    });

    const hasAdminPermission = membership.membershipType !== 'admin' && membership.membershipType !== 'owner';

    if (hasAdminPermission) {
      throw new Error('You should have admin or owner membership to add some users to the channel.');
    }

    for (const userId of userIds) {
      const membership = await ctx.prisma.membership.findFirst({
        where: {
          channelId,
          userId,
        },
      });

      if (!membership) {
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
  args: { channelId: nonNull(stringArg()), userIds: nonNull(list(stringArg())) },
  description: 'Removes some users from [public] channel.',

  resolve: async (_, { channelId, userIds }, ctx) => {
    const userId = getUserId(ctx);
    const channel = await findExistingChannel(channelId);

    if (channel.channelType === 'private') {
      throw new Error('Removing users from the private channels is not allowed.');
    }

    const membership = await ctx.prisma.membership.findFirst({
      where: {
        userId,
        channelId: channel.id,
      },
    });

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
