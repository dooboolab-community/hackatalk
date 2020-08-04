import { getUserId } from '../../../utils/auth';
import { queryField } from '@nexus/schema';

export const friends = queryField('friends', {
  type: 'Friend',
  resolve: (parent, args, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.friend.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  },
});
