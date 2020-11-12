import { mutationField, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';

export const createBlockedUser = mutationField('createBlockedUser', {
  type: 'BlockedUser',
  nullable: false,

  args: {
    blockedUserId: stringArg({ required: true }),
  },

  resolve: (_, { blockedUserId }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.blockedUser.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        blockedUser: {
          connect: {
            id: blockedUserId,
          },
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
    blockedUserId: stringArg({ required: true }),
  },

  nullable: false,

  resolve: (_, { blockedUserId }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.blockedUser.delete({
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
