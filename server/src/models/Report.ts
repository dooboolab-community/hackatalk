import {objectType} from 'nexus';

export const Report = objectType({
  name: 'Report',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('report');
    t.date('createdAt');
    t.date('updatedAt');
    t.date('deletedAt');

    t.field('user', {type: 'User'});
    t.field('reportedUser', {type: 'User'});
  },
});
