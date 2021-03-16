import {Context} from '../../context';
import {Message} from '@prisma/client';
import {assert} from '../../utils/assert';
import {subscriptionField} from 'nexus';
import {withFilter} from 'apollo-server';

export const ON_MESSAGE = 'ON_MESSAGE';

export const onMessage = subscriptionField('onMessage', {
  type: 'Message',

  subscribe: withFilter(
    (_, _args, ctx: Context) => {
      const {pubsub} = ctx;

      return pubsub.asyncIterator(ON_MESSAGE);
    },
    async (payload: Message, _args, {userId, prisma}: Context) => {
      // Only send messages which is sent to
      // the authorized user's channels.
      assert(userId, 'Not Authorized!');

      const membership = await prisma.membership.findFirst({
        where: {
          channelId: payload.channelId,
          userId: userId,
        },
      });

      return !!membership;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});
