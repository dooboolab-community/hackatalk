import {objectType} from 'nexus';

export const Reply = objectType({
  name: 'Reply',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.messageType('messageType');
    t.string('text');
    t.list.string('imageUrls');
    t.list.string('fileUrls');
    t.date('createdAt');
    t.date('updatedAt');
    t.date('deletedAt');
    t.nonNull.field('sender', {type: 'User'});
    // t.list.field('reactions', { type: 'Reaction' });
  },
});
