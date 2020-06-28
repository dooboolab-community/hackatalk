import { intArg, mutationField, stringArg } from '@nexus/schema';
import { getUserId } from '../../../utils';

export const createDraft = mutationField('createDraft', {
  type: 'Post',
  args: {
    title: stringArg({ nullable: false }),
    content: stringArg(),
  },
  resolve: (parent, { title, content }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.post.create({
      data: {
        title,
        content,
        published: false,
        user: { connect: { id: userId } },
      },
    });
  },
});

export const deletePost = mutationField('deletePost', {
  type: 'Post',
  nullable: true,
  args: { id: intArg({ nullable: false }) },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.post.delete({
      where: {
        id,
      },
    });
  },
});

export const publish = mutationField('publish', {
  type: 'Post',
  nullable: true,
  args: { id: intArg() },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.post.update({
      where: { id },
      data: { published: true },
    });
  },
});
