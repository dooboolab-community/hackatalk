import * as path from 'path';
import * as types from './types';

import {connectionPlugin, makeSchema} from 'nexus';

export const schema = makeSchema({
  types,
  plugins: [
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
  contextType: {
    module: path.join(__dirname, './context.ts'),
    export: 'Context',
  },
});
