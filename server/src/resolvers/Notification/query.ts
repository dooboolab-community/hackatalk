import { list, queryField, stringArg } from '@nexus/schema';

export const notifications = queryField('notifications', {
  type: list('Notification'),
  args: { userId: stringArg() },

  resolve: (parent, { userId }, ctx) => {
    return ctx.prisma.notification.findMany({
      where: {
        userId,
      },
    });
  },
});
