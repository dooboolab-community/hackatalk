import { objectType } from 'nexus';

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
    t.nonNull.field('sender', { type: 'User' });
    // t.list.field('reactions', { type: 'Reaction' });
  },
});
