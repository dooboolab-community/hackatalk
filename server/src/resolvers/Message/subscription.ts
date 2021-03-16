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
      assert(userId, 'Not Authorized!');

      const membership = await prisma.membership.findFirst({
        where: {
          channelId: payload.channelId,
          userId: userId,
        },
      });

      const correctChannel = !!membership; // Message is sent to the auth user's channel.
      const fromSelf = payload.senderId === userId; // Message is sent by the auth user.

      return correctChannel && !fromSelf;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});
