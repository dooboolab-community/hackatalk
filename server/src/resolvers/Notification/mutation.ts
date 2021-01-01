import { mutationField, nonNull, stringArg } from 'nexus';

import { assert } from '../../utils/assert';

export const createNotification = mutationField('createNotification', {
  type: 'Notification',

  args: {
    token: nonNull(stringArg()),
    device: stringArg(),
    os: stringArg(),
  },

  resolve: (parent, { token, device, os }, { prisma, userId }) => {
    assert(userId, 'Not authorized.');

    return prisma.notification.create({
      data: {
        token,
        device,
        os,
        user: { connect: { id: userId } },
      },
    });
  },
});

export const deleteNotification = mutationField('deleteNotification', {
  type: 'Notification',
  args: { token: nonNull(stringArg()) },

  resolve: (parent, { token }, { prisma }) => {
    return prisma.notification.delete({
      where: {
        token,
      },
    });
  },
});
