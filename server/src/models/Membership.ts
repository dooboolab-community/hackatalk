import { objectType } from 'nexus';

export const Membership = objectType({
  name: 'Membership',
  definition(t) {
    t.model.alertMode();
    t.field('membershipType', { type: 'MembershipType' });
    t.model.isVisible();
    t.model.createdAt();
    t.model.updatedAt();

    t.field('user', { type: 'User' });
    t.field('channel', { type: 'Channel' });
  },
});
