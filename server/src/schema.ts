import * as path from 'path';
import * as types from './types';

import { connectionPlugin, makeSchema } from '@nexus/schema';

import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';

export const schema = makeSchema({
  types,
  plugins: [
    nexusSchemaPrisma({ outputs: { typegen: __dirname + '/generated/typegen-nexus-plugin-prisma.d.ts' } }),
    connectionPlugin({
      cursorFromNode(node) {
        return node.id;
      },
    }),
  ],
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
});
