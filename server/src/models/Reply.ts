import { objectType } from '@nexus/schema';

export const Reply = objectType({
  name: 'Reply',
  definition(t) {
    t.model.id();
    t.model.messageType();
    t.model.text();
    t.model.imageUrls();
    t.model.fileUrls();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.field('sender', { type: 'User', nullable: true });
    // t.list.field('replies', { type: 'Reply', nullable: true });
    // t.list.field('reactions', { type: 'Reaction', nullable: true });
  },
});
