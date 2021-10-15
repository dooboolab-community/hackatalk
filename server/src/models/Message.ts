import {objectType} from 'nexus';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.messageType('messageType');
    t.string('text');
    t.list.string('imageUrls');
    t.list.string('fileUrls');
    t.date('createdAt');
    t.date('updatedAt');
    t.date('deletedAt');
    t.nonNull.id('channelId');
    t.field('channel', {type: 'Channel'});
    t.field('sender', {type: 'User'});
    t.list.field('replies', {type: 'Reply'});
    t.list.field('reactions', {type: 'Reaction'});
  },
});
