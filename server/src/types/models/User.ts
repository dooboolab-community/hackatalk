import { NexusGenRootTypes } from '../../generated/nexus';
import { objectType } from '@nexus/schema';
import { prisma } from '../../context';
import { relayToPrismaPagination } from '../../utils/pagination';

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

    t.connectionField('channels', {
      type: 'Channel',

      async nodes(_, args, ctx) {
        const { after, before, first, last } = args;

        return ctx.prisma.channel.findMany({
          ...relayToPrismaPagination({
            after, before, first, last,
          }),
          where: {
            membership: {
              some: {
                userId: _.id,
              },
            },
          },
          orderBy: { id: 'desc' },
        });
      },
    });

    t.connectionField('friends', {
      type: 'User',

      async nodes(_, args, ctx) {
        const { after, before, first, last } = args;

        return ctx.prisma.user.findMany({
          ...relayToPrismaPagination({
            after, before, first, last,
          }),
          where: {
            friends: {
              some: {
                userId: _.id,
              },
            },
          },
          orderBy: { id: 'desc' },
        });
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
