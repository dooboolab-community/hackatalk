import { queryField, stringArg } from '@nexus/schema';

import { relayToPrismaPagination } from '../../utils/pagination';

export const message = queryField('message', {
  type: 'Message',
  args: { id: stringArg() },
  description: 'Get single message',
  resolve: (_, { id }, ctx) => ctx.prisma.message.findOne({
    where: { id },
    include: { sender: true },
  }),
});

export const messages = queryField((t) => {
  t.connectionField('messages', {
    type: 'Message',

    additionalArgs: {
      searchText: stringArg({ nullable: true }),
    },

    async nodes(_, args, ctx) {
      const { after, before, first, last, searchText } = args;

      return ctx.prisma.message.findMany({
        ...relayToPrismaPagination({
          after, before, first, last,
        }),

        where: {
          OR: [
            { text: { contains: searchText } },
          ],
          deletedAt: null,
        },

        include: { sender: true },

        orderBy: { createdAt: 'desc' },
      });
    },
  });
});
