import {objectType} from 'nexus';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.model.id();
    t.model.messageType();
    t.model.text();
    t.model.imageUrls();
    t.list.field('imageUrls', {type: 'String'});
    t.list.field('fileUrls', {type: 'String'});
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();

    t.field('channel', {type: 'Channel'});
    t.field('sender', {type: 'User'});
    t.list.field('replies', {type: 'Reply'});
    t.list.field('reactions', {type: 'Reaction'});
  },
});
