import { queryField, stringArg } from '@nexus/schema';

import { getUserId } from '../../../utils/auth';

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

export const myChannels = queryField('myChannels', {
  type: 'Channel',
  description: 'Get all channels which auth user has joined',
  list: true,
  nullable: true,
  resolve: (parent, arg, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.channel.findMany({
      where: {
        membership: {
          some: {
            user: { id: userId },
            isVisible: true,
          },
        },
      },
    });
  },
});
