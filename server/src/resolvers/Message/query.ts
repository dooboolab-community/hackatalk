import { queryField, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';
import { relayToPrismaPagination } from '../../utils/pagination';

export const message = queryField('message', {
  type: 'Message',
  args: { id: stringArg() },
  description: 'Get single message',
  resolve: (_, { id }, ctx) => ctx.prisma.message.findOne({
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
      channelId: stringArg({ nullable: false }),
      searchText: stringArg({ nullable: true }),
    },

    async nodes(_, args, ctx) {
      const userId = getUserId(ctx);
      const { after, before, first, last, searchText, channelId } = args;

      const filter = searchText && {
        OR: [
          { text: { contains: searchText } },
        ],
      };

      const blockedUsers = await ctx.prisma.blockedUser.findMany({
        select: { blockedUserId: true },
        where: { userId },
      });

      const blockedUsersInArray = blockedUsers.map((user) => user.blockedUserId);

      return ctx.prisma.message.findMany({
        ...relayToPrismaPagination({
          after, before, first, last,
        }),

        where: {
          channelId,
          senderId: { notIn: blockedUsersInArray },
          ...filter,
          deletedAt: null,
        },

        include: { sender: true },
        orderBy: { createdAt: 'desc' },
      });
    },
  });
});
