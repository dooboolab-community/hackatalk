import { arg, mutationField, stringArg } from '@nexus/schema';

import { getUserId } from '../../../utils/auth';

export const createMessage = mutationField('createMessage', {
  type: 'Message',

  args: {
    channelId: stringArg({ nullable: false }),
    message: arg({
      type: 'MessageCreateInput',
      nullable: false,
    }),
  },

  resolve: (parent, { channelId, message }, ctx) => {
    const userId = getUserId(ctx);

    const { imageUrls, fileUrls, ...rest } = message;

    return ctx.prisma.message.create({
      data: {
        ...rest,
        imageUrls: { set: imageUrls ?? [] },
        fileUrls: { set: fileUrls ?? [] },
        sender: {
          connect: {
            id: userId,
          },
        },
        channel: { connect: { id: channelId } },
      },
    });
  },
});

export const deleteMessage = mutationField('deleteMessage', {
  type: 'Message',
  nullable: true,
  args: { id: stringArg({ nullable: false }) },

  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.message.update({
      data: { deletedAt: new Date() },
      where: { id },
    });
  },
});
