import { getUserId } from '../../utils/auth';
import { queryField } from '@nexus/schema';

export const blockedUsers = queryField('blockedUsers', {
  type: 'User',
  list: true,
  nullable: false,

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
