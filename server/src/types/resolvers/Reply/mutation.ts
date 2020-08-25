import { mutationField, stringArg } from '@nexus/schema';
import { MessageCreateInput } from '../Channel/mutation';
import { NEW_REPLY } from './subscription';
import { getUserId } from '../../../utils/auth';

export const sendReply = mutationField('sendReply', {
  type: 'Reply',
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
