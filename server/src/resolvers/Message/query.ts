import {nonNull, queryField, stringArg} from 'nexus';

import {assert} from '../../utils/assert';
import {relayToPrismaPagination} from '../../utils/pagination';

export const message = queryField('message', {
  type: 'Message',
  args: {id: nonNull(stringArg())},
  description: 'Get single message',

  resolve: (_, {id}, ctx) =>
    ctx.prisma.message.findUnique({
      where: {id},
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

    async nodes(_, args, {prisma, userId}) {
      assert(userId, 'Not authorized.');

      const {after, before, first, last, searchText, channelId} = args;

      const filter = searchText && {
        OR: [{text: {contains: searchText}}],
      };

      const blockedUsersIds = (
        await prisma.blockedUser.findMany({
          select: {blockedUserId: true},
          where: {userId},
        })
      ).map((user) => user.blockedUserId);

      return prisma.message.findMany({
        ...relayToPrismaPagination({
          after,
          before,
          first,
          last,
        }),

        where: {
          channelId,
          senderId: {notIn: blockedUsersIds},
          ...filter,
          deletedAt: null,
        },

        include: {sender: true},
        orderBy: {createdAt: 'desc'},
      });
    },
  });
});
