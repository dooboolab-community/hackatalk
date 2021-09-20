import {objectType} from 'nexus';

export const Reaction = objectType({
  name: 'Reaction',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('value');
  },
});
