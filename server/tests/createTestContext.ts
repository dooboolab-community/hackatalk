import { createApolloServer, startServer } from '../src/server';
import getPort, { makeRange } from 'get-port';

import { Context } from '../src/context';
import { GraphQLClient } from 'graphql-request';
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'apollo-server';
import { createApp } from '../src/app';

type MockPrisma = {
  [P in keyof PrismaClient]: PrismaClient[P] & {
    [Q in keyof PrismaClient[P]]: jest.Mock
  }
}

interface TestContext extends Context {
  prisma: MockPrisma & PrismaClient,
  client: GraphQLClient,
}

/**
 * Create prisma client with all methods mocked.
 */
const createMockPrisma = () => {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !                  IMPORTANT ISSUE                       !
  // ! Because `PrismaClient` class is dynamically generated, !
  // ! `PrismaClient.prototype` does not have model getters   !
  // ! such as `prisma.user`.                                 !
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const ret = Object.create(PrismaClient.prototype);

  for (const k in ret) {
    ret[k] = jest.fn();
  }

  return ret;
};

/**
 * Create pubsub with all methods mocked..
 */
const createPubSub = () => {
  const ret = Object.create(PubSub.prototype);

  for (const k in ret) {
    ret[k] = jest.fn();
  }

  return ret;
};

export const createTestContext = async (): Promise<TestContext> => {
  const mockPrisma = createMockPrisma();
  const mockPubSub = createPubSub();
  const app = createApp();

  const apollo = createApolloServer(mockPrisma);
  const port = await getPort({ port: makeRange(4000, 6000) });

  await startServer(app, apollo, port);

  const graphqlClient = new GraphQLClient(`http://localhost:${port}`);

  return {
    request: { req: undefined },
    userId: 'abcd123',
    appSecret: 'very-secure',
    appSecretEtc: 'another-secure',
    pubsub: mockPubSub,
    prisma: mockPrisma,
    client: graphqlClient,
  };
};
