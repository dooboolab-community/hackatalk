import { queryField, stringArg } from '@nexus/schema';

import { relayToPrismaPagination } from '../../utils/pagination';

export const user = queryField('user', {
  type: 'User',
  args: { id: stringArg() },
  description: 'Fetch user profile',

  resolve: (parent, args, ctx) => {
    const { id } = args;

    return ctx.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });
  },
});

export const userConnection = queryField((t) => {
  t.connectionField('users', {
    type: 'User',

    additionalArgs: {
      searchText: stringArg(),
    },

    description:
      'Query users with relay pagination. This is filterable but it will not return user itself and the blocked users.',

    async nodes(_, args, { prisma, userId }) {
      const { after, before, first, last, searchText } = args;

      const filter = searchText && {
        OR: [
          { name: { contains: searchText } },
          { nickname: { contains: searchText } },
          { email: { contains: searchText } },
        ],
      };

      return prisma.user.findMany({
        ...relayToPrismaPagination({
          after, before, first, last,
        }),
        where: {
          ...filter,
          AND: [
            { id: { not: userId } },
          ],
          verified: true,
          deletedAt: null,
        },
        orderBy: { id: 'desc' },
      });
    },
  });
});

export const me = queryField('me', {
  type: 'User',
  description: 'Fetch current user profile when authenticated.',

  resolve: (parent, args, { prisma, userId }) => {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
  },
});
