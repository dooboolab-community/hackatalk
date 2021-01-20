import {PrismaClient} from '@prisma/client';
import {PubSub} from 'graphql-subscriptions';
import {assert} from './utils/assert';
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

export function createContext(request: {req: ReqI18n}): Context {
  const {JWT_SECRET, JWT_SECRET_ETC} = process.env;

  assert(JWT_SECRET, 'Missing JWT_SECRET environment variable.');
  assert(JWT_SECRET_ETC, 'Missing JWT_SECRET_ETC environment variable.');

  return {
    request,
    prisma,
    pubsub,
    appSecret: JWT_SECRET,
    appSecretEtc: JWT_SECRET_ETC,
    userId: getUserId(request),
  };
}
