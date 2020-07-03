import { rule, shield } from 'graphql-shield';

import { getUserId } from '../utils/auth';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isNotificationUser: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const author = await context.prisma.notification
      .findOne({
        where: {
          id: Number(id),
        },
      })
      .notification();
    return userId === author.id;
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
  Mutation: {
    changeEmailPassword: rules.isAuthenticatedUser,
  },
});
