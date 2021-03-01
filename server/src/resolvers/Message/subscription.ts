import {nonNull, stringArg, subscriptionField} from 'nexus';

import {Context} from 'vm';
import {Message} from '@prisma/client';
import {withFilter} from 'apollo-server';

export const ON_MESSAGE = 'ON_MESSAGE';

export const onMessage = subscriptionField('onMessage', {
  args: {channelId: nonNull(stringArg())},
  type: 'Message',

  subscribe: withFilter(
    (_, args, ctx: Context) => {
      const {pubsub} = ctx;

      return pubsub.asyncIterator(ON_MESSAGE);
    },
    (payload: Message, {channelId}) => {
      return payload.channelId === channelId;
    },
  ),
  resolve: (payload) => {
    return payload;
  },
});
