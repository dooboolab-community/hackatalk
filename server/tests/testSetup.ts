import ApolloClient from 'apollo-client';
import {Headers} from 'cross-fetch';
import {InMemoryCache} from 'apollo-cache-inmemory';
import NodeWebSocket from 'ws';
import {PrismaClient} from '@prisma/client';
import {Server} from 'http';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {WebSocketLink} from 'apollo-link-ws';
import {createApp} from '../src/app';
import {execSync} from 'child_process';
import express from 'express';
import {startServer} from '../src/server';

// @ts-ignore
global.Headers = global.Headers || Headers;

const prisma = new PrismaClient();
const port = 4000;
let server: Server;
let networkInterface;
export let apolloClient;
export const testHost = `http://localhost:${port}/graphql`;
const testSubscriptionHost = `ws://localhost:${port}/graphql`;

beforeAll(async () => {
  // Create test schema.
  await prisma.$executeRaw('DROP SCHEMA IF EXISTS public CASCADE');
  await prisma.$executeRaw('CREATE SCHEMA public');

  execSync('yarn db-push:test', {env: process.env});

  const app: express.Application = createApp();

  server = await startServer(app);

  networkInterface = new SubscriptionClient(
    testSubscriptionHost,
    {reconnect: true},
    NodeWebSocket,
  );

  apolloClient = new ApolloClient({
    link: new WebSocketLink(networkInterface),
    cache: new InMemoryCache(),
  });
});

afterAll(async () => {
  await prisma.$executeRaw('DROP schema public CASCADE');
  networkInterface.close();
  server.close();
});
