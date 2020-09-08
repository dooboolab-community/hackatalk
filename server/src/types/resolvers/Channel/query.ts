import { queryField, stringArg } from '@nexus/schema';

import { getUserId } from '../../../utils/auth';
import { relayToPrismaPagination } from '../../../utils/pagination';

export const channel = queryField('channel', {
  type: 'Channel',
  args: {
    channelId: stringArg(),
  },
  description: 'Get single channel',
  resolve: (parent, { channelId }, ctx) => ctx.prisma.channel.findOne({
    where: {
      id: channelId,
    },
  }),
});

export const channels = queryField((t) => {
  t.connectionField('channels', {
    type: 'Channel',

    async nodes(_, args, ctx) {
      const userId = getUserId(ctx);
      const { after, before, first, last } = args;

      return ctx.prisma.channel.findMany({
        ...relayToPrismaPagination({
          after, before, first, last,
        }),
        where: {
          membership: {
            some: {
              userId,
              isVisible: true,
            },
          },
        },
        orderBy: { id: 'desc' },
      });
    },
  });
});
