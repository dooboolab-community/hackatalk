import {TestUtils, getTestUtils, setTestUtils} from './testUtils';

import ApolloClient from 'apollo-client';
import {GraphQLClient} from 'graphql-request';
import {Headers} from 'cross-fetch';
import {InMemoryCache} from 'apollo-cache-inmemory';
import NodeWebSocket from 'ws';
import {PrismaClient} from '@prisma/client';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {WebSocketLink} from 'apollo-link-ws';
import {assert} from '../src/utils/assert';
import {createApp} from '../src/app';
import {execSync} from 'child_process';
import express from 'express';
import {startServer} from '../src/server';

// @ts-ignore
global.Headers = global.Headers || Headers;

const prisma = new PrismaClient();
const {PORT = 5566, DATABASE_URL} = process.env;

export const testSubscriptionHost = `ws://localhost:${PORT}/graphql`;
export const testHost = `http://localhost:${PORT}/graphql`;

assert(DATABASE_URL, 'Missing DATABASE_URL test environment varialbe.');

beforeAll(async () => {
  // Migrate test database.
  execSync('yarn db-push:test --accept-data-loss', {env: process.env});

  // Start server.
  const app: express.Application = createApp();
  const server = await startServer(app, PORT as number);

  // Instantiate graphql client.
  const graphqlClient = new GraphQLClient(testHost);

  const networkInterface = new SubscriptionClient(
    testSubscriptionHost,
    {reconnect: true},
    NodeWebSocket,
  );

  const apolloClient = new ApolloClient({
    link: new WebSocketLink(networkInterface),
    cache: new InMemoryCache(),
  });

  setTestUtils(
    new TestUtils(
      apolloClient,
      server,
      prisma,
      graphqlClient,
      networkInterface,
    ),
  );
});

afterAll(async () => {
  const {server, networkInterface} = getTestUtils();

  // Disconnect prisma client.
  await prisma.$disconnect();

  networkInterface.close();
  server.close();
});
