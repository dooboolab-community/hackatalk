import { NexusGenRootTypes } from '../generated/nexus';
import { getUserId } from '../utils/auth';
import { objectType } from '@nexus/schema';
import { prisma } from '../context';
import { relayToPrismaPagination } from '../utils/pagination';

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
    t.list.field('notifications', { type: 'Notification', nullable: true });

    t.field('hasBlocked', {
      type: 'Boolean',
      nullable: true,
      description: 'Check if the user is blocked by the user who have signed in.',

      resolve: ({ id }, args, ctx) => {
        const userId = getUserId(ctx);

        const blockedUser = ctx.prisma.blockedUser.findFirst({
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
