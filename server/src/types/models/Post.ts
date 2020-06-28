import { objectType } from '@nexus/schema';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.published();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
