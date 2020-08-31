import { queryField, stringArg } from '@nexus/schema';

import { getUserId } from '../../../utils/auth';
import { relayToPrismaPagination } from '../../../utils/pagination';

export const usersQueryField = queryField((t) => {
  t.connectionField('users', {
    type: 'User',

    additionalArgs: {
      searchText: stringArg(),
    },

    async nodes(_, args, ctx) {
      const { after, before, first, last, searchText } = args;
      return ctx.prisma.user.findMany({
        ...relayToPrismaPagination({
          after, before, first, last,
        }),
        where: {
          name: { contains: searchText },
          email: { contains: searchText },
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

  resolve: (parent, args, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.user.findOne({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
  },
});
