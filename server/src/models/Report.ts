import { objectType } from 'nexus';

export const Report = objectType({
  name: 'Report',
  definition(t) {
    t.model.report();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();

    t.field('user', { type: 'User' });
    t.field('reportedUser', { type: 'User' });
  },
});
