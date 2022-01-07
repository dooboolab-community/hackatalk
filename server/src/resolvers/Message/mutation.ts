import {
  ExpoMessage,
  getReceiversPushTokens,
  sendPushNotification,
} from '../../services/NotificationService';
import {MESSAGE_DELETED, ON_MESSAGE} from './subscription';
import {arg, mutationField, nonNull, stringArg} from 'nexus';

import {assert} from '../../utils/assert';

export const createMessage = mutationField('createMessage', {
  type: 'Message',

  args: {
    channelId: nonNull(stringArg()),
    message: nonNull(
      arg({
        type: 'MessageCreateInput',
      }),
    ),
    deviceKey: nonNull(stringArg()),
  },

  resolve: async (
    parent,
    {channelId, message, deviceKey},
    {prisma, request, userId, pubsub},
  ) => {
    assert(userId, 'Not authorized.');

    const {imageUrls, fileUrls, ...rest} = message;

    const created = await prisma.message.create({
      data: {
        ...rest,
        imageUrls: {set: imageUrls ?? []},
        fileUrls: {set: fileUrls ?? []},
        sender: {
          connect: {
            id: userId,
          },
        },
        channel: {connect: {id: channelId}},
      },
      include: {
        sender: true,
        channel: true,
      },
    });

    pubsub.publish(ON_MESSAGE, {
      message: created,
      deviceKey,
    });

    await prisma.channel.update({
      data: {
        lastMessageId: created.id,
        membership: {
          update: {
            data: {
              updatedAt: created.createdAt,
            },
            where: {
              userId_channelId: {
                userId,
                channelId,
              },
            },
          },
        },
      },
      where: {
        id: channelId,
      },
    });

    const tokens = await getReceiversPushTokens(prisma, channelId, userId);

    tokens.forEach((token) => {
      const expoMessage: ExpoMessage = {
        to: token,
        sound: 'default',
        title: created.sender.name ?? 'Anonymous',
        body:
          created.messageType === 'photo'
            ? request.req.t('PHOTO')
            : created.messageType === 'file'
            ? request.req.t('VIDEO')
            : created.text ?? undefined,
        data: {
          data: JSON.stringify({
            messageId: created.id,
            channelId,
          }),
        },
      };

      sendPushNotification(expoMessage);
    });

    return created;
  },
});

export const deleteMessage = mutationField('deleteMessage', {
  type: 'Message',
  args: {id: nonNull(stringArg())},

  resolve: async (parent, {id}, ctx) => {
    const deleted = await ctx.prisma.message.delete({
      // @ts-ignore
      data: {deletedAt: new Date().toISOString()},
      where: {id},
      include: {sender: true},
    });

    ctx.pubsub.publish(MESSAGE_DELETED, {
      message: deleted,
      channelId: deleted.channelId,
    });

    return deleted;
  },
});
