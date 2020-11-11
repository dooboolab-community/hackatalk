import { objectType } from '@nexus/schema';

export const Report = objectType({
  name: 'Report',
  definition(t) {
    t.model.report();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();

    t.field('user', { type: 'User', nullable: true });
    t.field('reportedUser', { type: 'User', nullable: true });
  },
});
