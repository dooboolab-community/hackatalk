import { Channel } from '@prisma/client';

import { prisma } from '../context';

export const findExistingChannel = async (channelId: string): Promise<Channel> => {
  const channels = await prisma.channel.findMany({
    where: { id: channelId, deletedAt: null },
    take: 1,
  });

  return channels[0];
};
