import {objectType} from 'nexus';

export const Membership = objectType({
  name: 'Membership',
  definition(t) {
    t.alertMode('alertMode');
    t.field('membershipType', {type: 'MembershipType'});
    t.boolean('isVisible');
    t.date('createdAt');
    t.date('updatedAt');

    t.field('user', {type: 'User'});
    t.field('channel', {type: 'Channel'});
  },
});
