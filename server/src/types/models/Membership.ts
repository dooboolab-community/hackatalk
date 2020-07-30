import { objectType } from '@nexus/schema';

export const Membership = objectType({
  name: 'Membership',
  definition(t) {
    t.model.alertMode();
    t.model.membershipType();
    t.model.createdAt();
    t.model.updatedAt();

    t.list.field('user', { type: 'User', nullable: true });
    t.list.field('channel', { type: 'Channel', nullable: true });
  },
});
