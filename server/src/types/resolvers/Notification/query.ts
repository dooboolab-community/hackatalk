import { intArg, queryField, stringArg } from '@nexus/schema';

export const notifications = queryField('notifications', {
  type: 'Notification',
  list: true,
  args: {
    userId: stringArg({ nullable: true }),
  },
  nullable: true,
  resolve: (parent, { userId }, ctx) => {
    return ctx.prisma.notification.findMany({
      where: {
        userId,
      },
    });
  },
});
