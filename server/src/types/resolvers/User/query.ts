import { getUserId } from '../../../utils';
import { queryField } from '@nexus/schema';

export const me = queryField('me', {
  type: 'User',
  nullable: true,
  resolve: (parent, args, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.user.findOne({
      where: {
        id: userId,
      },
    });
  },
});
