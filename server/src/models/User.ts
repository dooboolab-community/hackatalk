import { NexusGenRootTypes } from '../generated/nexus';
import { objectType } from 'nexus';
import { prisma } from '../context';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.socialId();
    t.model.authType();
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.nickname();
    t.model.thumbURL();
    t.model.photoURL();
    t.model.birthday();
    t.model.gender();
    t.model.phone();
    t.model.statusMessage();
    t.model.verified();
    t.model.lastSignedIn();
    t.model.isOnline();
    t.model.profile();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.list.field('notifications', { type: 'Notification' });

    t.boolean('hasBlocked', {
      description: 'Check if the user is blocked by the user who have signed in.',

      resolve: async ({ id }, args, { prisma, userId }) => {
        const blockedUser = await prisma.blockedUser.findFirst({
          where: { userId, blockedUserId: id },
        });

        return !!blockedUser;
      },
    });
  },
});

export const resetPassword = (email: string, password: string)
: Promise<NexusGenRootTypes['User']> => {
  return prisma.user.update({
    where: { email },
    data: { password },
  });
};

export const verifyEmail = (email: string)
: Promise<NexusGenRootTypes['User']> => {
  return prisma.user.update({
    where: { email },
    data: {
      verified: true,
    },
  });
};
