import { stringArg, subscriptionField } from '@nexus/schema';
import { withFilter } from 'apollo-server';

export const NEW_MESSAGE = 'NEW_MESSAGE';

export const newMessage = subscriptionField('newMessage', {
  type: 'Message',
  args: {
    userId: stringArg({ nullable: false }),
  },
  subscribe: withFilter(
    (_, args, ctx) => {
      const { pubsub } = ctx;
      return pubsub.asyncIterator(NEW_MESSAGE);
    },
    (payload, { userId }) => {
      return payload.ids.includes(userId);
    },
  ),
  resolve: (payload) => {
    return payload.message;
  },
});
