import { queryField, stringArg } from 'nexus';

import { relayToPrismaPagination } from '../../utils/pagination';

export const friends = queryField((t) => {
  t.connectionField('friends', {
    type: 'User',

    additionalArgs: {
      searchText: stringArg(),
    },

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
