import {
  Channel,
  ChannelType,
  Membership,
  MembershipType,
  PrismaClient,
} from '@prisma/client';
import {andThen, cond, pipe} from 'ramda';

import {assert} from '../utils/assert';

export const findExistingChannel = async (
  prisma: PrismaClient,
  channelId: string,
): Promise<Channel> => {
  const channel = await prisma.channel.findFirst({
    where: {id: channelId},
  });

  assert(channel, 'Could not find the channel.');

  return channel;
};

export const findChannelWithUserIds = async (
  prisma: PrismaClient,
  userIds: string[],
): Promise<Channel | undefined> => {
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
        every: {userId: {in: userIds}},
      },
    },
  });

  const totalUsers = userIds.length;

  return channels.find((channel) => channel.membership.length === totalUsers);
};

export const findPrivateChannelWithUserIds = async (
  prisma: PrismaClient,
  userIds: string[],
): Promise<Channel | undefined> => {
  const channelType =
    userIds.length === 1 ? ChannelType.self : ChannelType.private;

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
      channelType,
      membership: {
        every: {
          userId: {in: userIds},
        },
      },
    },
  });

  const totalUsers = userIds.length;

  return channels.find((channel) => channel.membership.length === totalUsers);
};

export const changeVisibilityWhenInvisible = (
  prisma: PrismaClient,
  userId: string,
  channelId: string,
): Promise<Membership> =>
  prisma.membership.update({
    where: {
      userId_channelId: {
        channelId,
        userId,
      },
    },
    data: {
      isVisible: true,
    },
  });

export const getChannelType = (
  userId: string,
  peerUserIds: string[],
): ChannelType => {
  if (peerUserIds.length === 1 && peerUserIds[0] === userId) {
    return ChannelType.self;
  }

  return ChannelType.private;
};

export const createNewChannel = async (
  prisma: PrismaClient,
  channelType: ChannelType,
  userId: string,
  name?: string,
): Promise<Channel> =>
  prisma.channel.create({
    data: {
      channelType,
      name,
      membership: {
        create: {
          membershipType:
            channelType === ChannelType.public
              ? MembershipType.owner
              : MembershipType.member,
          user: {connect: {id: userId}},
        },
      },
    },
  });

export const createMemberships = async (
  prisma: PrismaClient,
  channelId: string,
  userIds: readonly string[],
): Promise<void> => {
  const countMemberships = (): Promise<number> =>
    prisma.membership.count({
      where: {channelId},
    });

  const createMembership = (userId: string): Promise<Membership> =>
    prisma.membership.create({
      data: {
        user: {
          connect: {id: userId},
        },
        channel: {
          connect: {id: channelId},
        },
      },
    });

  await pipe(
    countMemberships,
    andThen(
      // @ts-ignore
      cond([[(x) => x < 2, () => Promise.all(userIds.map(createMembership))]]),
    ),
  )();
};
