import { queryField, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';

export const blockedUsers = queryField('blockedUsers', {
  type: 'BlockedUser',
  list: true,
  nullable: true,

  description: 'Arguments are not needed. Only find blocked users of signed in user',

  resolve: (_, __, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.blockedUser.findMany({
      where: {
        userId,
      },
    });
  },
});
