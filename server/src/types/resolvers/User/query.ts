import { queryField, stringArg } from '@nexus/schema';

import { connectionFromArray } from 'graphql-relay';
import { getUserId } from '../../../utils/auth';

export const usersQueryField = queryField((t) => {
  t.connectionField('users', {
    type: 'User',
    additionalArgs: {
      email: stringArg(),
      name: stringArg(),
    },
    async resolve(_, args, ctx) {
      const users = await ctx.prisma.user.findMany({
        where: {
          email: args.email,
          name: args.name,
        },
      });
      return connectionFromArray(
        users,
        args,
      );
    },
  });
});

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
