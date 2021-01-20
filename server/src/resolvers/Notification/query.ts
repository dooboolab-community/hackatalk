import {list, nonNull, queryField, stringArg} from 'nexus';

export const notifications = queryField('notifications', {
  type: list('Notification'),
  args: {userId: nonNull(stringArg())},

  resolve: (parent, {userId}, ctx) => {
    return ctx.prisma.notification.findMany({
      where: {
        userId,
      },
    });
  },
});
