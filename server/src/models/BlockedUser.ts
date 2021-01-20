import {objectType} from 'nexus';

export const BlockedUser = objectType({
  name: 'BlockedUser',
  definition(t) {
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.field('user', {type: 'User'});
    t.field('blockedUser', {type: 'User'});
  },
});
