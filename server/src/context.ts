import Redis, {RedisOptions} from 'ioredis';

import {ApolloServer} from 'apollo-server-express';
import {Disposable} from 'graphql-ws';
import {PrismaClient} from '@prisma/client';
import {PubSub} from 'graphql-subscriptions';
import {RedisPubSub} from 'graphql-redis-subscriptions';
import {Server} from 'http';
import {WebSocketServer} from 'ws';
import {assert} from './utils/assert';
import express from 'express';
import {getUserId} from './utils/auth';
import {schemaWithMiddleware} from './server';
import {useServer} from 'graphql-ws/lib/use/ws';

// eslint-disable-next-line prettier/prettier
const {JWT_SECRET, JWT_SECRET_ETC, REDIS_HOSTNAME, REDIS_CACHEKEY, NODE_ENV} =
  process.env;

export interface Context {
  request: {req: express.Request};
  prisma: PrismaClient;
  pubsub: PubSub | RedisPubSub;
  appSecret: string;
  appSecretEtc: string;
  userId: string | null;
}

//? REDIS_HOSTNAME='redis-server' represents docker image for developers
const tls = REDIS_HOSTNAME !== 'redis-server' ? {tls: {}} : {};
const redisPort = REDIS_HOSTNAME !== 'redis-server' ? 6380 : 6379;

const prodRedisOption: RedisOptions = {
  host: REDIS_HOSTNAME,
  password: REDIS_CACHEKEY,
  port: redisPort,
  ...tls,
};

const pubsub =
  NODE_ENV !== 'production'
    ? new PubSub()
    : new RedisPubSub({
        // @ts-ignore
        publisher: new Redis(prodRedisOption),
        // @ts-ignore
        subscriber: new Redis(prodRedisOption),
      });

const createPrismaClient = (): PrismaClient => {
  const prisma = new PrismaClient();

  //! Specify soft deletion models here.
  prisma.$use(async (params, next) => {
    const softDeletionModels = ['User'];

    if (params.model && softDeletionModels.includes(params.model)) {
      if (params.action === 'delete') {
        params.action = 'update';
        params.args.data = {deletedAt: new Date().toISOString()};
      }

      if (params.action === 'deleteMany') {
        params.action = 'updateMany';

        if (params.args.data !== undefined) {
          params.args.data.deletedAt = new Date().toISOString();
        } else {
          params.args.data = {deletedAt: new Date().toISOString()};
        }
      }

      if (params.action === 'findUnique') {
        params.action = 'findFirst';
        if (!params.args) {
          params.args = {where: {}};
        }

        params.args.where.deletedAt = null;
      }

      if (params.action === 'findMany' || params.action === 'findFirst') {
        if (!params.args) {
          params.args = {where: {}};
        }

        if (params.args.where !== undefined) {
          if (params.args.where.deletedAt === undefined) {
            params.args.where.deletedAt = null;
          }
        } else {
          params.args.where = {deletedAt: null};
        }
      }
    }

    return next(params);
  });

  return prisma;
};

export const prisma = createPrismaClient();

type CreateContextParams = {
  req: express.Request;
  res: express.Response;
  connection?: unknown;
};

export function createContext(params: CreateContextParams): Context {
  const {req, connection} = params;

  const authorization =
    !req || !req.headers
      ? (connection as any)?.context?.connectionParams?.Authorization // for subscriptions.
      : req.get('Authorization'); // for queries & mutations.

  assert(JWT_SECRET, 'Missing JWT_SECRET environment variable.');
  assert(JWT_SECRET_ETC, 'Missing JWT_SECRET_ETC environment variable.');

  return {
    request: params,
    prisma,
    pubsub,
    appSecret: JWT_SECRET,
    appSecretEtc: JWT_SECRET_ETC,
    userId: getUserId(authorization),
  };
}

export const runSubscriptionServer = (
  httpServer: Server,
  apollo: ApolloServer,
): Disposable => {
  const subscriptionServer = new WebSocketServer({
    server: httpServer,
    path: apollo.graphqlPath,
  });

  const serverCleanup = useServer(
    {
      schema: schemaWithMiddleware,
      context: async (ctx) => {
        process.stdout.write('Connected to websocket\n');

        // Return connection parameters for context building.
        return {
          connectionParams: ctx.connectionParams,
          prisma,
          pubsub,
          appSecret: JWT_SECRET,
          userId: getUserId(
            // @ts-ignore
            ctx.connectionParams?.Authorization ||
              ctx.connectionParams?.authorization,
          ),
        };
      },
    },
    subscriptionServer,
  );

  if (NODE_ENV === 'production') {
    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.on(signal, () => subscriptionServer.close());
    });
  }

  return serverCleanup;
};
