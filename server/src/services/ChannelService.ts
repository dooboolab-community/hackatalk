import {Channel, ChannelType, Membership, MembershipType} from '@prisma/client';
import {andThen, cond, pipe} from 'ramda';

import {assert} from '../utils/assert';
import {prisma} from '../context';

export const findExistingChannel = async (
  channelId: string,
): Promise<Channel> => {
  const channel = await prisma.channel.findFirst({
    where: {id: channelId, deletedAt: null},
  });

  assert(channel, 'Could not find the channel.');

  return channel;
};

export const findChannelWithUserIds = async (
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
  userIds: string[],
): Promise<Channel | undefined> => {
  const channelType =
    userIds.length === 1 ? ChannelType.self : ChannelType.private;

  console.log(userIds, channelType);

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
  userId: string,
  existingChannel: Channel,
): Promise<Membership> =>
  prisma.membership.update({
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

export const getChannelType = (
  userId: string,
  peerUserIds: string[],
): ChannelType => {
  if (peerUserIds.length === 1 && peerUserIds[0] === userId)
    return ChannelType.self;

  return ChannelType.private;
};

export const createNewChannel = async (
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
      cond([[(x) => x < 2, () => Promise.all(userIds.map(createMembership))]]),
    ),
  )();
};
