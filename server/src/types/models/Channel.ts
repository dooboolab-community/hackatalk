import { booleanArg, objectType } from '@nexus/schema';

import { getUserId } from '../../utils/auth';
import { relayToPrismaPagination } from '../../utils/pagination';

export const Channel = objectType({
  name: 'Channel',
  definition(t) {
    t.model.id();
    t.model.channelType();
    t.model.name();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();

    t.field('lastMessage', {
      type: 'Message',
      nullable: true,
      description: 'Get latest message sent to the channel.',

      resolve: async ({ id }, args, ctx) => {
        const messages = await ctx.prisma.message.findMany({
          where: {
            channel: { id },
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        });

        return messages[0];
      },
    });

    t.connectionField('messages', {
      type: 'Message',

      nodes: async ({ id }, args, ctx) => {
        const { after, before, first, last } = args;

        return ctx.prisma.message.findMany({
          ...relayToPrismaPagination({
            after, before, first, last,
          }),
          where: { channel: { id } },
        });
      },
    });

    t.field('memberships', {
      type: 'Membership',
      list: true,
      nullable: true,
      description: 'Get memberships assigned to channel. If excludeMe is set, it will not return authenticated user.',
      args: { excludeMe: booleanArg() },

      resolve: ({ id }, { excludeMe }, ctx) => {
        const userId = getUserId(ctx);

        if (excludeMe) {
          return ctx.prisma.membership.findMany({
            where: {
              channel: { id },
              user: {
                id: { not: userId },
              },
            },
            include: { user: true },
          });
        }

        return ctx.prisma.membership.findMany({
          where: { channel: { id } },
          include: { user: true },
        });
      },
    });
  },
});
