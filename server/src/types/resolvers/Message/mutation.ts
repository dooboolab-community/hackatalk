import { ExpoMessage, getReceiversPushTokens, sendPushNotification } from '../../../services/NotificationService';
import { arg, mutationField, stringArg } from '@nexus/schema';

import { getUserId } from '../../../utils/auth';

export const createMessage = mutationField('createMessage', {
  type: 'Message',

  args: {
    channelId: stringArg({ nullable: false }),
    message: arg({
      type: 'MessageCreateInput',
      nullable: false,
    }),
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

    const tokens = await getReceiversPushTokens(channelId, userId);

    tokens.forEach((token) => {
      const message: ExpoMessage = {
        to: token,
        sound: 'default',
        title: created.sender.name,
        body: created.messageType === 'photo'
          ? 'photo'
          : created.messageType === 'file'
            ? 'file'
            : created.text,
      };
      sendPushNotification(message);
    });

    return created;
  },
});

export const deleteMessage = mutationField('deleteMessage', {
  type: 'Message',
  nullable: true,
  args: { id: stringArg({ nullable: false }) },

  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.message.update({
      data: { deletedAt: new Date().toISOString() },
      where: { id },
    });
  },
});
