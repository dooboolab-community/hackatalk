import {NexusGenRootTypes} from '../generated/nexus';
import {PrismaClient} from '@prisma/client';
import {assert} from '../utils/assert';
import {objectType} from 'nexus';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.string('socialId');
    t.authType('authType');
    t.field('user', {type: 'User'});
    t.string('organization');
    t.string('about');
    t.string('projects');
    t.string('positions');
    t.string('speakings');
    t.string('contributions');
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.string('email');
    t.string('name');
    t.string('nickname');
    t.string('thumbURL');
    t.string('photoURL');
    t.date('birthday');
    t.gender('gender');
    t.string('phone');
    t.string('statusMessage');
    t.boolean('verified');
    t.date('lastSignedIn');
    t.boolean('isOnline');
    t.date('createdAt');
    t.date('updatedAt');
    t.date('deletedAt');

    t.field('profile', {
      type: 'Profile',
      description: 'User profile',

      resolve: async ({id}, args, {prisma}) => {
        return prisma.profile.findUnique({
          where: {userId: id},
        });
      },
    });

    t.list.field('notifications', {type: 'Notification'});

    t.boolean('hasBlocked', {
      description:
        'Check if the user is blocked by the user who have signed in.',

      resolve: async ({id}, args, {userId, prisma}) => {
        assert(userId, 'Not authorized.');

        const blockedUser = await prisma.blockedUser.findFirst({
          where: {userId, blockedUserId: id},
        });

        return !!blockedUser;
      },
    });

    t.boolean('isFriend', {
      description: 'This user is a friend of the authenticated user.',
      resolve: async ({id}, _args, {userId, prisma}) => {
        assert(userId, 'Not authorized.');

        const friendQueryResult = await prisma.friend.findUnique({
          where: {
            userId_friendId: {
              userId,
              friendId: id,
            },
          },
        });

        return !!friendQueryResult;
      },
    });
  },
});

export const resetPassword = (
  prisma: PrismaClient,
  email: string,
  password: string,
): Promise<NexusGenRootTypes['User']> => {
  return prisma.user.update({
    where: {email},
    data: {password},
  });
};

export const verifyEmail = (
  prisma: PrismaClient,
  email: string,
): Promise<NexusGenRootTypes['User']> => {
  return prisma.user.update({
    where: {email},
    data: {
      verified: true,
    },
  });
};
