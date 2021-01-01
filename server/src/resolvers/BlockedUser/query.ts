import { list, queryField } from 'nexus';

import { assert } from '../../utils/assert';

export const blockedUsers = queryField('blockedUsers', {
  type: list('User'),
  description: 'Arguments are not needed. Only find blocked users of signed in user',

  resolve: async (_, __, { prisma, userId }) => {
    assert(userId, 'Not authorized.');

    const blockedUsers = await prisma.blockedUser.findMany({
      select: { blockedUser: true },
      where: { userId },
    });

    return blockedUsers.map((user) => user.blockedUser);
  },
});
