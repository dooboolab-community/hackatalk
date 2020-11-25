import { nonNull, queryField, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';
import { relayToPrismaPagination } from '../../utils/pagination';

export const message = queryField('message', {
  type: 'Message',
  args: { id: stringArg() },
  description: 'Get single message',
  resolve: (_, { id }, ctx) => ctx.prisma.message.findUnique({
    where: { id },
    include: {
      sender: true,
      channel: true,
    },
  }),
});

export const messages = queryField((t) => {
  t.connectionField('messages', {
    type: 'Message',

    additionalArgs: {
      channelId: nonNull(stringArg()),
      searchText: stringArg(),
    },

    async nodes(_, args, ctx) {
      const userId = getUserId(ctx);
      const { after, before, first, last, searchText, channelId } = args;

      const filter = searchText && {
        OR: [
          { text: { contains: searchText } },
        ],
      };

      const blockedUsersIds = (await ctx.prisma.blockedUser.findMany({
        select: { blockedUserId: true },
        where: { userId },
      })).map((user) => user.blockedUserId);

      return ctx.prisma.message.findMany({
        ...relayToPrismaPagination({
          after, before, first, last,
        }),

        where: {
          channelId,
          senderId: { notIn: blockedUsersIds },
          ...filter,
          deletedAt: null,
        },

        include: { sender: true },
        orderBy: { createdAt: 'desc' },
      });
    },
  });
});
