import { intArg, mutationField, stringArg } from '@nexus/schema';

import { getUserId } from '../../../utils/auth';

export const createNotification = mutationField('createNotification', {
  type: 'Notification',
  args: {
    token: stringArg({ nullable: false }),
    device: stringArg(),
    os: stringArg(),
  },
  resolve: (parent, { token, device, os }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.notification.create({
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
  nullable: true,
  args: { id: intArg({ nullable: false }) },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.notification.delete({
      where: {
        id,
      },
    });
  },
});
