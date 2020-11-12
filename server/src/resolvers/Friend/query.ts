import { queryField, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';
import { relayToPrismaPagination } from '../../utils/pagination';

export const friends = queryField((t) => {
  t.connectionField('friends', {
    type: 'User',
    nullable: false,

    additionalArgs: {
      searchText: stringArg(),
    },

    async nodes(_, args, ctx) {
      const userId = getUserId(ctx);
      const { after, before, first, last, searchText } = args;

      const filter = searchText && {
        OR: [
          { name: { contains: searchText } },
          { nickname: { contains: searchText } },
          { email: { contains: searchText } },
        ],
      };

      return ctx.prisma.user.findMany({
        ...relayToPrismaPagination({
          after, before, first, last,
        }),
        where: {
          ...filter,
          friends: {
            some: {
              userId,
            },
          },
        },
        orderBy: { id: 'desc' },
      });
    },
  });
});
