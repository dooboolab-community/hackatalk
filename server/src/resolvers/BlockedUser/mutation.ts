import { mutationField, nonNull, stringArg } from 'nexus';

import { assert } from '../../utils/assert';

export const createBlockedUser = mutationField('createBlockedUser', {
  type: 'BlockedUser',

  args: {
    blockedUserId: nonNull(stringArg()),
  },

  resolve: (_, { blockedUserId }, { prisma, userId }) => {
    assert(userId, 'Not authorized.');

    return prisma.blockedUser.create({
      data: {
        user: {
          connect: { id: userId },
        },
        blockedUser: {
          connect: { id: blockedUserId },
        },
      },
      include: {
        user: true,
        blockedUser: true,
      },
    });
  },
});

export const deleteBlockedUser = mutationField('deleteBlockedUser', {
  type: 'BlockedUser',

  args: {
    blockedUserId: nonNull(stringArg()),
  },

  resolve: (_, { blockedUserId }, { prisma, userId }) => {
    assert(userId, 'Not authorized.');

    return prisma.blockedUser.delete({
      where: {
        userId_blockedUserId: {
          userId,
          blockedUserId,
        },
      },
      include: {
        user: true,
        blockedUser: true,
      },
    });
  },
});
