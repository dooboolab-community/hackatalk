import {nonNull, stringArg, subscriptionField} from 'nexus';

import type {Context} from '../../context';
import {Message} from '@prisma/client';
import {assert} from '../../utils/assert';
import {withFilter} from 'graphql-subscriptions';

export const ON_MESSAGE = 'ON_MESSAGE';
export const MESSAGE_DELETED = 'MESSAGE_DELETED';
interface Payload {
  message: Message;
  deviceKey: string;
}

export const onMessage = subscriptionField('onMessage', {
  type: 'Message',

  args: {
    deviceKey: nonNull(stringArg()),
  },

  subscribe: withFilter(
    (_, _args, ctx: Context) => {
      const {pubsub} = ctx;

      return pubsub.asyncIterator(ON_MESSAGE);
    },
    async (payload: Payload, args, {userId, prisma}: Context) => {
      assert(userId, 'Not Authorized!');

      const isMessageForAuthUser = !!(await prisma.membership.findFirst({
        where: {
          channelId: payload.message.channelId,
          userId: userId,
        },
      }));

      const isMessageFromSameDevice = args.deviceKey === payload.deviceKey;

      return !isMessageFromSameDevice && isMessageForAuthUser;
    },
  ),
  resolve: (payload: Payload) => {
    return payload.message;
  },
});

export const messageDeleted = subscriptionField('deleteMessage', {
  type: 'Message',

  args: {
    channelId: nonNull(stringArg()),
  },

  subscribe: withFilter(
    (_, args, ctx) => {
      const {pubsub} = ctx;

      return pubsub.asyncIterator(MESSAGE_DELETED);
    },
    (payload, _, {userId}) => {
      // assert(userId, 'Not Authorized!');

      // return payload.id !== userId;
      return true;
    },
  ),
  resolve: (payload) => {
    return payload.message;
  },
});
