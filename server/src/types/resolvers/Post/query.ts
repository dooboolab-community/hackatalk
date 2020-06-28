import { intArg, queryField, stringArg } from '@nexus/schema';

export const feed = queryField('feed', {
  type: 'Post',
  list: true,
  resolve: (parent, args, ctx) => {
    return ctx.prisma.post.findMany({
      where: { published: true },
    });
  },
});

export const filterPosts = queryField('filterPosts', {
  type: 'Post',
  list: true,
  args: {
    searchString: stringArg({ nullable: true }),
  },
  resolve: (parent, { searchString }, ctx) => {
    return ctx.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchString,
            },
          },
          {
            content: {
              contains: searchString,
            },
          },
        ],
      },
    });
  },
});

export const post = queryField('post', {
  type: 'Post',
  nullable: true,
  args: { id: intArg() },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.post.findOne({
      where: {
        id: Number(id),
      },
    });
  },
});
