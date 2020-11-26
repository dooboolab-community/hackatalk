import { list, queryField } from '@nexus/schema';

import { getUserId } from '../../utils/auth';

export const blockedUsers = queryField('blockedUsers', {
  type: list('User'),
  description: 'Arguments are not needed. Only find blocked users of signed in user',

  resolve: async (_, __, ctx) => {
    const userId = getUserId(ctx);

    const blockedUsers = await ctx.prisma.blockedUser.findMany({
      select: {
        blockedUser: true,
      },
      where: {
        userId,
      },
    });

    return blockedUsers.map((user) => user.blockedUser);
  },
});
