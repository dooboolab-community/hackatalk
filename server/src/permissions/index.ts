import { rule, shield } from 'graphql-shield';

const rules = {
  isAuthenticatedUser: rule()((_, args, { userId }) => {
    return Boolean(userId);
  }),

  isNotificationUser: rule()(async (_, { token }, { prisma, userId }) => {
    const notification = await prisma.notification.findUnique({
      where: { token },
    });

    return userId === notification.userId;
  }),
};

export const permissions = shield(
  {
    Query: {
      me: rules.isAuthenticatedUser,
    },
    Mutation: {
      singleUpload: rules.isAuthenticatedUser,
      changeEmailPassword: rules.isAuthenticatedUser,
    },
  },
  {
    allowExternalErrors: process.env.NODE_ENV !== 'production',
  },
);
