import { objectType } from '@nexus/schema';

export const Channel = objectType({
  name: 'Channel',
  definition(t) {
    t.model.id();
    t.model.channelType();
    t.model.name();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
    t.list.field('messages', { type: 'Message', nullable: true });
    t.field('membership', { type: 'Membership', nullable: true });
  },
});
