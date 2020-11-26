import { objectType } from '@nexus/schema';

export const AuthPayload = objectType({
  name: 'AuthPayload',

  definition(t) {
    t.nonNull.string('token');
    t.nonNull.field('user', { type: 'User' });
  },
});
