import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';

import { ApolloServer } from 'apollo-server';
import resolvers from '../resolvers';
import typeDefs from '../typeDefs';

export default function testServer(dataSources: any): ApolloServerTestClient {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
  });
  return createTestClient(server);
}
