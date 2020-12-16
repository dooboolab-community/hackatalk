import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { getUserId } from './utils/auth';

export const prisma = new PrismaClient();
const { JWT_SECRET, JWT_SECRET_ETC } = process.env;

export interface Context {
  request: { req: ReqI18n };
  prisma: PrismaClient;
  pubsub: PubSub;
  appSecret: string;
  appSecretEtc: string;
  userId: string;
}

const pubsub = new PubSub();

export const createContext = (prisma: PrismaClient) => {
  return (request: { req: ReqI18n }): Context => ({
    request,
    prisma,
    pubsub,
    appSecret: JWT_SECRET,
    appSecretEtc: JWT_SECRET_ETC,
    userId: getUserId(request),
  });
};
