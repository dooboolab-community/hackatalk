import { stringArg, subscriptionField } from '@nexus/schema';
import { withFilter } from 'apollo-server';

export const NEW_REPLY = 'NEW_REPLY';

export const newReply = subscriptionField('newReply', {
  type: 'Reply',
  args: {
    userId: stringArg({ nullable: false }),
  },
  subscribe: withFilter(
    (_, args, ctx) => {
      const { pubsub } = ctx;
      return pubsub.asyncIterator(NEW_REPLY);
    },
    (payload, { userId }) => {
      return payload.id === userId;
    },
  ),
  resolve: (payload) => {
    return payload.reply;
  },
});
