import { objectType } from '@nexus/schema';

export const AuthPayload = objectType({
  name: 'AuthPayload',

  definition(t) {
    t.string('token', { nullable: false });
    t.field('user', { type: 'User', nullable: false });
  },
});
