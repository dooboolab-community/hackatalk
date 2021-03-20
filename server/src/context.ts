import {PrismaClient} from '@prisma/client';
import {PubSub} from 'graphql-subscriptions';
import {assert} from './utils/assert';
import express from 'express';
import {getUserId} from './utils/auth';

export const prisma = new PrismaClient();

export interface Context {
  request: {req: ReqI18n};
  prisma: PrismaClient;
  pubsub: PubSub;
  appSecret: string;
  appSecretEtc: string;
  userId: string | null;
}

const pubsub = new PubSub();

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

  const {JWT_SECRET, JWT_SECRET_ETC} = process.env;

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
