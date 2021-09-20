import {PrismaClient} from '@prisma/client';
import {PubSub} from 'graphql-subscriptions';
import Redis from 'ioredis';
import {RedisPubSub} from 'graphql-redis-subscriptions';
import {assert} from './utils/assert';
import express from 'express';
import {getUserId} from './utils/auth';

// eslint-disable-next-line prettier/prettier
const {JWT_SECRET, JWT_SECRET_ETC, REDIS_HOSTNAME, REDIS_CACHEKEY, NODE_ENV} =
  process.env;

export const prisma = new PrismaClient();

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

const prodRedisOption: Redis.RedisOptions = {
  host: REDIS_HOSTNAME,
  password: REDIS_CACHEKEY,
  port: redisPort,
  ...tls,
};

const pubsub =
  NODE_ENV !== 'production'
    ? new PubSub()
    : new RedisPubSub({
        publisher: new Redis(prodRedisOption),
        subscriber: new Redis(prodRedisOption),
      });

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
