import {assert} from '../../utils/assert';
import {subscriptionField} from 'nexus';
import {withFilter} from 'graphql-subscriptions';

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_UPDATED = 'USER_UPDATED';

export const userSignedIn = subscriptionField('userSignedIn', {
  type: 'User',

  subscribe: withFilter(
    (_, args, ctx) => {
      const {pubsub} = ctx;

      return pubsub.asyncIterator(USER_SIGNED_IN);
    },
    (payload, _, {userId}) => {
      assert(userId, 'Not Authorized!');

      return payload.id === userId;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});

export const userUpdated = subscriptionField('userUpdated', {
  type: 'User',

  subscribe: withFilter(
    (_, args, ctx) => {
      const {pubsub} = ctx;

      return pubsub.asyncIterator(USER_UPDATED);
    },
    (payload, _, {userId}) => {
      assert(userId, 'Not Authorized!');

      return payload.id !== userId;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});
