import { stringArg, subscriptionField } from '@nexus/schema';

import { User } from '../models/User';
import { getUserId } from '../../utils';
import { withFilter } from 'apollo-server';

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_UPDATED = 'USER_UPDATED';

interface User {
  id: string;
  email: string;
  name: string;
  nickname: string;
  thumbURL: string;
  photoURL: string;
  birthDay: string;
  gender: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const UserSignedIn = subscriptionField('userSignedIn', {
  type: 'User',
  args: {
    userId: stringArg({ nullable: false }),
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

export const UserUpdated = subscriptionField('userUpdated', {
  type: 'User',
  args: {
    userId: stringArg({ nullable: false }),
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
