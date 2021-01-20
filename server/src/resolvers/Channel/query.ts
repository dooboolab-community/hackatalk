import {booleanArg, nonNull, queryField, stringArg} from 'nexus';

import {assert} from '../../utils/assert';
import {relayToPrismaPagination} from '../../utils/pagination';

export const channel = queryField('channel', {
  type: 'Channel',
  args: {channelId: nonNull(stringArg())},
  description: 'Get single channel',

  resolve: (parent, {channelId}, ctx) =>
    ctx.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    }),
});

export const channels = queryField((t) => {
  t.connectionField('channels', {
    type: 'Channel',

    additionalArgs: {
      withMessage: booleanArg(),
    },

    async nodes(_, args, {prisma, userId}) {
      assert(userId, 'Not authorized.');

      const {after, before, first, last, withMessage} = args;

      const checkMessage = withMessage && {
        messages: {
          some: {
            deletedAt: null,
          },
        },
      };

      return prisma.channel.findMany({
        ...relayToPrismaPagination({
          after,
          before,
          first,
          last,
        }),

        where: {
          membership: {
            some: {
              userId,
              isVisible: true,
            },
          },
          ...checkMessage,
        },

        orderBy: {updatedAt: 'desc'},
      });
    },
  });
});
