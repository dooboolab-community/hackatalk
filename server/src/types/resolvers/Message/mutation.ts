import { NEW_MESSAGE, NEW_REPLY } from './subscription';
import { mutationField, stringArg } from '@nexus/schema';
import { MessageCreateInput } from '../Channel/mutation';
import { getUserId } from '../../../utils/auth';

export const sendMessage = mutationField('sendMessage', {
  type: 'Message',
  nullable: true,
  args: {
    channelId: stringArg(),
    message: MessageCreateInput,
  },
  resolve: async (_, { channelId, message }, ctx) => {
    const userId = getUserId(ctx);
    const channel = await ctx.prisma.channel.findOne({
      where: {
        id: channelId,
      },
      include: {
        membership: {
          select: {
            userId: true,
            membershipType: true,
          },
        },
      },
    });

    if (!channel) {
      throw new Error('Channel not found');
    }

    const hasMembership = channel.membership.some((membership) => membership.userId === userId);
    if (!hasMembership) { throw new Error('Prohibited to send a message to channel not entered'); }

    const messageCreated = await ctx.prisma.message.create({
      data: {
        fileUrls: { set: message.fileUrls },
        imageUrls: { set: message.imageUrls },
        messageType: message.messageType,
        text: message.text,
        channel: {
          connect: {
            id: channelId,
          },
        },
        sender: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (messageCreated) {
      ctx.pubsub.publish(NEW_MESSAGE, {
        ids: channel.membership.map((membership) => membership.userId),
        message,
      });

      return messageCreated;
    } else {
      throw new Error('Failed to send a message');
    }
  },
});

export const sendReply = mutationField('sendReply', {
  type: 'Message',
  nullable: true,
  args: {
    messageId: stringArg(),
    message: MessageCreateInput,
  },
  resolve: async (_, { messageId, message }, ctx) => {
    const userId = getUserId(ctx);
    const replyTo = await ctx.prisma.message.findOne({
      where: {
        id: messageId,
      },
    });

    if (!replyTo) { throw new Error('Message not found'); }

    const channel = await ctx.prisma.channel.findOne({
      where: {
        id: replyTo.channelId,
      },
      include: {
        membership: {
          select: {
            userId: true,
            membershipType: true,
          },
        },
      },
    });

    if (!channel) {
      throw new Error('Channel not found');
    }

    const hasMembership = channel.membership.some((membership) => membership.userId === userId);
    if (!hasMembership) { throw new Error('Prohibited to send a message to channel not entered'); }

    const reply = await ctx.prisma.reply.create({
      data: {
        fileUrls: { set: message.fileUrls },
        imageUrls: { set: message.imageUrls },
        messageType: message.messageType,
        text: message.text,
        message: {
          connect: {
            id: messageId,
          },
        },
        sender: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (reply) {
      ctx.pubsub.publish(NEW_REPLY, {
        id: userId,
        reply,
      });

      return reply;
    } else {
      throw new Error('Failed to send a message');
    }
  },
});
