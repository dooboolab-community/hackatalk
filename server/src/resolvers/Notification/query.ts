import { queryField, stringArg } from '@nexus/schema';

export const notifications = queryField('notifications', {
  type: 'Notification',
  nullable: false,
  list: true,

  args: {
    userId: stringArg({ nullable: true }),
  },

  resolve: (parent, { userId }, ctx) => {
    return ctx.prisma.notification.findMany({
      where: {
        userId,
      },
    });
  },
});
