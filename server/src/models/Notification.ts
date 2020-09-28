import { objectType } from '@nexus/schema';

export const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.model.id();
    t.model.token();
    t.model.device();
    t.model.os();
    t.model.user();
    t.model.createdAt();
  },
});
