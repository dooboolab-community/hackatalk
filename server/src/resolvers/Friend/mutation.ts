import { mutationField, nonNull, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';

export const addFriend = mutationField('addFriend', {
  type: 'Friend',

  args: {
    friendId: nonNull(stringArg()),
  },

  resolve: (_, { friendId }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.friend.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        friend: {
          connect: {
            id: friendId,
          },
        },
      },
      include: {
        user: true,
        friend: true,
      },
    });
  },
});

export const deleteFriend = mutationField('deleteFriend', {
  type: 'Friend',
  args: {
    friendId: nonNull(stringArg()),
  },
  resolve: (_, { friendId }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.friend.delete({
      where: {
        userId_friendId: {
          userId,
          friendId,
        },
      },
      include: {
        user: true,
        friend: true,
      },
    });
  },
});
