import { nonNull, stringArg, subscriptionField } from 'nexus';

import { withFilter } from 'apollo-server';

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_UPDATED = 'USER_UPDATED';

export const userSignedIn = subscriptionField('userSignedIn', {
  type: 'User',

  args: {
    userId: nonNull(stringArg()),
  },

  subscribe: withFilter(
    (_, args, ctx) => {
      const { pubsub } = ctx;

      return pubsub.asyncIterator(USER_SIGNED_IN);
    },
    (payload, { userId }) => {
      return payload.id === userId;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});

export const userUpdated = subscriptionField('userUpdated', {
  type: 'User',

  args: {
    userId: nonNull(stringArg()),
  },

  subscribe: withFilter(
    (_, args, ctx) => {
      const { pubsub } = ctx;

      return pubsub.asyncIterator(USER_UPDATED);
    },
    (payload, { userId }) => {
      return payload.id === userId;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});
