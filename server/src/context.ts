import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { Request } from 'apollo-server';

export const prisma = new PrismaClient();
const { JWT_SECRET, JWT_SECRET_ETC } = process.env;

export interface Context {
  request: Request & any;
  prisma: PrismaClient;
  pubsub: PubSub;
  appSecret: string;
  appSecretEtc: string;
}

const pubsub = new PubSub();

export function createContext(request: Request): Context {
  return {
    request,
    prisma,
    pubsub,
    appSecret: JWT_SECRET,
    appSecretEtc: JWT_SECRET_ETC,
  };
}
