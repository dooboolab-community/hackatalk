import {booleanArg, queryField, stringArg} from 'nexus';

import {User} from '@prisma/client';
import {assert} from '../../utils/assert';
import {relayToPrismaPagination} from '../../utils/pagination';

export const friends = queryField((t) => {
  t.connectionField('friends', {
    type: 'User',

    additionalArgs: {
      searchText: stringArg(),
      includeMe: booleanArg(),
    },

    async nodes(_, args, {prisma, userId}) {
      assert(userId, 'Not authorized.');

      const {after, before, first, last, searchText, includeMe} = args;

      const filter = searchText && {
        OR: [
          {name: {contains: searchText}},
          {nickname: {contains: searchText}},
          {email: {contains: searchText}},
        ],
      };

      const result = await prisma.user.findMany({
        ...relayToPrismaPagination({
          after,
          before,
          first,
          last,
        }),
        where: {
          ...filter,
          friends: {
            some: {
              userId,
            },
          },
        },
        orderBy: {id: 'desc'},
      });

      if (includeMe) {
        const myProfile = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        result.unshift(myProfile!);
      }

      return result;
    },
  });
});
