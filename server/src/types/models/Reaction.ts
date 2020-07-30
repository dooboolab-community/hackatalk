import { objectType } from '@nexus/schema';

export const Reaction = objectType({
  name: 'Reaction',
  definition(t) {
    t.model.id();
    t.model.value();
  },
});
