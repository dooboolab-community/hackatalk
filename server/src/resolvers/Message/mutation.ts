import { ExpoMessage, getReceiversPushTokens, sendPushNotification } from '../../services/NotificationService';
import { arg, mutationField, nonNull, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';

export const createMessage = mutationField('createMessage', {
  type: 'Message',

  args: {
    channelId: nonNull(stringArg()),
    message: nonNull(arg({
      type: 'MessageCreateInput',
    })),
  },

  resolve: async (parent, { channelId, message }, ctx) => {
    const userId = getUserId(ctx);

    const { imageUrls, fileUrls, ...rest } = message;

    const created = await ctx.prisma.message.create({
      data: {
        ...rest,
        imageUrls: { set: imageUrls ?? [] },
        fileUrls: { set: fileUrls ?? [] },
        sender: {
          connect: {
            id: userId,
          },
        },
        channel: { connect: { id: channelId } },
      },
      include: {
        sender: true,
        channel: true,
      },
    });

    await ctx.prisma.channel.update({
      data: {
        lastMessageId: created.id,
      },
      where: {
        id: channelId,
      },
    });

    const tokens = await getReceiversPushTokens(channelId, userId);

    tokens.forEach((token) => {
      const message: ExpoMessage = {
        to: token,
        sound: 'default',
        title: created.sender.name,
        body: created.messageType === 'photo'
          ? ctx.request.req.t('PHOTO')
          : created.messageType === 'file'
            ? ctx.request.req.t('FILE')
            : created.text,
        data: {
          data: JSON.stringify({
            messageId: created.id,
            channelId,
          }),
        },
      };

      sendPushNotification(message);
    });

    return created;
  },
});

export const deleteMessage = mutationField('deleteMessage', {
  type: 'Message',
  args: { id: nonNull(stringArg()) },

  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.message.update({
      data: { deletedAt: new Date().toISOString() },
      where: { id },
      include: { sender: true },
    });
  },
});
