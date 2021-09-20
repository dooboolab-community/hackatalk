import {objectType} from 'nexus';

export const BlockedUser = objectType({
  name: 'BlockedUser',
  definition(t) {
    t.date('createdAt');
    t.date('updatedAt');
    t.date('deletedAt');
    t.field('user', {type: 'User'});
    t.field('blockedUser', {type: 'User'});
  },
});
