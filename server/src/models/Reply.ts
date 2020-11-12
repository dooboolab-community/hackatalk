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
    t.field('sender', { type: 'User', nullable: false });
    // t.list.field('reactions', { type: 'Reaction', nullable: true });
  },
});
