import { objectType } from '@nexus/schema';

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.model.id();
    t.model.messageType();
    t.model.text();
    t.model.imageUrls();
    t.list.field('imageUrls', { type: 'String', nullable: true });
    t.list.field('fileUrls', { type: 'String', nullable: true });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();

    t.field('channel', { type: 'Channel', nullable: true });
    t.field('sender', { type: 'User', nullable: false });
    t.list.field('replies', { type: 'Reply', nullable: true });
    t.list.field('reactions', { type: 'Reaction', nullable: true });
  },
});
