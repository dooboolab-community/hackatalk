import { getUserId } from '../../../utils/auth';
import { queryField } from '@nexus/schema';

export const me = queryField('me', {
  type: 'User',
  resolve: (parent, args, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.user.findOne({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
  },
});
