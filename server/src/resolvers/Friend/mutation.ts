import { mutationField, nonNull, stringArg } from 'nexus';

export const addFriend = mutationField('addFriend', {
  type: 'Friend',

  args: {
    friendId: nonNull(stringArg()),
  },

  resolve: (_, { friendId }, { prisma, userId }) => {
    return prisma.friend.create({
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
  resolve: (_, { friendId }, { prisma, userId }) => {
    return prisma.friend.delete({
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
