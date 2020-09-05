import { Channel, Membership, MembershipType } from '@prisma/client';

import { prisma } from '../context';

export const findExistingChannel = async (channelId: string): Promise<Channel> => {
  const channels = await prisma.channel.findMany({
    where: { id: channelId, deletedAt: null },
    take: 1,
  });

  return channels[0];
};

export const findChannelWithUserIds = async (
  userIds: string[],
): Promise<Channel> => {
  const channels = await prisma.channel.findMany({
    include: {
      membership: {
        select: {
          userId: true,
          membershipType: true,
        },
      },
    },
    where: {
      membership: {
        every: {
          userId: { in: userIds },
        },
      },
    },
  });

  const totalUsers = userIds.length;

  return channels.find((channel) => channel.membership.length === totalUsers);
};

export const findPrivateChannelWithUserIds = async (
  userIds: string[],
): Promise<Channel> => {
  const channels = await prisma.channel.findMany({
    include: {
      membership: {
        select: {
          userId: true,
          membershipType: true,
        },
      },
    },
    where: {
      channelType: 'private',
      membership: {
        every: {
          userId: { in: userIds },
        },
      },
    },
  });

  const totalUsers = userIds.length;

  return channels.find((channel) => channel.membership.length === totalUsers);
};

export const changeVisibilityWhenInvisible = (
  userId: string, existingChannel: Channel,
): Promise<Membership> => prisma.membership.update({
  data: {
    isVisible: true,
  },
  where: {
    userId_channelId: {
      userId,
      channelId: existingChannel.id,
    },
  },
});

export const createNewChannel = async (
  isPrivate: boolean,
  userId: string,
  name?: string,
): Promise<Channel> => prisma.channel.create({
  data: {
    channelType: isPrivate ? 'private' : 'public',
    name,
    membership: {
      create: {
        membershipType: !isPrivate
          ? MembershipType.owner
          : MembershipType.member,
        user: { connect: { id: userId } },
      },
    },
  },
});

export const createMemberships = async (
  channelId: string,
  userIds: readonly string[],
): Promise<void> => {
  const promises: Promise<Membership>[] = userIds.map((userId) => prisma.membership.create({
    data: {
      user: {
        connect: { id: userId },
      },
      channel: {
        connect: { id: channelId },
      },
    },
  }));

  await Promise.all(promises);
};
