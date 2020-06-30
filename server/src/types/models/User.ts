import { NexusGenRootTypes } from '../../generated/nexus';
import { objectType } from '@nexus/schema';
import { prisma } from '../../context';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id();
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
    t.model.birthDay();
    t.model.gender();
    t.model.phone();
    t.model.statusMessage();
    t.model.verified();
    t.model.lastSignedIn();
    t.model.createdAt();
    t.model.updatedAt();
    t.list.field('notifications', { type: 'Notification', nullable: true });
    t.model.deletedAt();
    t.model.profile();
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
