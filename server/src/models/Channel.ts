import {booleanArg, objectType} from 'nexus';

import {assert} from '../utils/assert';
import {relayToPrismaPagination} from '../utils/pagination';

export const Channel = objectType({
  name: 'Channel',
  definition(t) {
    t.model.id();
    t.model.channelType();
    t.model.name();
    t.model.lastMessageId();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();

    t.field('lastMessage', {
      type: 'Message',
      description: 'Get latest message sent to the channel.',

      resolve: async ({id}, args, ctx) => {
        const message = await ctx.prisma.message.findFirst({
          where: {
            channel: {id},
          },
          include: {
            sender: true,
          },
          orderBy: {id: 'desc'},
        });

        return message;
      },
    });

    t.connectionField('messages', {
      type: 'Message',

      nodes: async ({id}, args, {prisma, userId}) => {
        assert(userId, 'Not authorized.');

        const {after, before, first, last} = args;

        const blockedUsers = await prisma.blockedUser.findMany({
          select: {blockedUserId: true},
          where: {userId},
        });

        const blockedUsersInArray = blockedUsers.map(
          (user) => user.blockedUserId,
        );

        return prisma.message.findMany({
          ...relayToPrismaPagination({
            after,
            before,
            first,
            last,
          }),
          where: {
            channel: {id},
            senderId: {
              notIn: blockedUsersInArray,
            },
          },
          include: {sender: true},
        });
      },
    });

    t.list.nonNull.field('memberships', {
      type: 'Membership',
      description:
        'Get memberships assigned to channel. If excludeMe is set, it will not return authenticated user.',
      args: {excludeMe: booleanArg()},

      resolve: ({id}, {excludeMe}, {prisma, userId}) => {
        if (excludeMe)
          return prisma.membership.findMany({
            where: {
              channel: {id},
              user: {
                id: {not: userId ?? undefined},
              },
            },
            include: {user: true},
            orderBy: [
              {
                updatedAt: 'desc',
              },
            ],
          });

        return prisma.membership.findMany({
          where: {channel: {id}},
          include: {user: true},
          orderBy: [
            {
              updatedAt: 'desc',
            },
          ],
        });
      },
    });
  },
});
