import { objectType } from '@nexus/schema';

export const BlockedUser = objectType({
  name: 'BlockedUser',
  definition(t) {
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.field('user', { type: 'User', nullable: true });
    t.field('blockedUser', { type: 'User', nullable: true });
  },
});
