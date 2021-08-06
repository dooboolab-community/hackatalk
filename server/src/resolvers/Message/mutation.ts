import {
  ExpoMessage,
  getReceiversPushTokens,
  sendPushNotification,
} from '../../services/NotificationService';
import {arg, mutationField, nonNull, stringArg} from 'nexus';

import {ON_MESSAGE} from './subscription';
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

    const tokens = await getReceiversPushTokens(channelId, userId);

    tokens.forEach((token) => {
      const expoMessage: ExpoMessage = {
        to: token,
        sound: 'default',
        title: created.sender.name ?? 'Anonymous',
        body:
          created.messageType === 'photo'
            ? request.req.t('PHOTO')
            : created.messageType === 'file'
            ? request.req.t('FILE')
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

  resolve: (parent, {id}, ctx) => {
    return ctx.prisma.message.update({
      data: {deletedAt: new Date().toISOString()},
      where: {id},
      include: {sender: true},
    });
  },
});
