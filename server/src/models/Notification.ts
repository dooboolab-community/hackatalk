import {objectType} from 'nexus';

export const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('token');
    t.string('device');
    t.string('os');

    t.date('createdAt');
  },
});
