import { objectType } from '@nexus/schema';

export const Friend = objectType({
  name: 'Friend',
  definition(t) {
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.field('user', { type: 'User', nullable: true });
    t.field('friend', { type: 'User', nullable: true });
  },
});
