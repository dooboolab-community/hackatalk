import * as path from 'path';

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';

import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';

// import { resolvers } from './resolvers';

const regExp = new RegExp('scalar Upload', 'gm');
const typeDefs = importSchema(path.join(__dirname, '../../../src/generated/schema.graphql')).replace(regExp, '').trim();

export default function testServer(
  dataSources: any,
  resolvers: any): ApolloServerTestClient {
  return createTestClient(
    new ApolloServer({
      typeDefs,
      resolvers,
      dataSources,
    }),
  );
}
