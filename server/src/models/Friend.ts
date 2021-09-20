import {objectType} from 'nexus';

export const Friend = objectType({
  name: 'Friend',
  definition(t) {
    t.date('createdAt');
    t.date('updatedAt');
    t.date('deletedAt');
    t.field('user', {type: 'User'});
    t.field('friend', {type: 'User'});
  },
});
