import { queryField, stringArg } from '@nexus/schema';

import { getUserId } from '../../../utils/auth';
import { relayToPrismaPagination } from '../../../utils/pagination';

export const usersQueryField = queryField((t) => {
  t.connectionField('users', {
    type: 'User',
    additionalArgs: {
      email: stringArg(),
      name: stringArg(),
    },
    async nodes(_, args, ctx) {
      const { after, before, email, first, last, name } = args;
      return ctx.prisma.user.findMany({
        ...relayToPrismaPagination({
          after, before, first, last,
        }),
        where: { email, name },
        orderBy: { id: 'desc' },
      });
    },
  });
});

export const me = queryField('me', {
  type: 'User',
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
