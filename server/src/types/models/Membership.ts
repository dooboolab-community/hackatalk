import { objectType } from '@nexus/schema';

export const Membership = objectType({
  name: 'Membership',
  definition(t) {
    t.model.alertMode();
    t.field('membershipType', { type: 'MembershipType', nullable: true });
    t.model.createdAt();
    t.model.updatedAt();

    t.field('user', { type: 'User', nullable: true });
    t.field('channel', { type: 'Channel', nullable: true });
  },
});
