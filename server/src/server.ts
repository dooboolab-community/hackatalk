import { ApolloServer } from 'apollo-server-express';
import { Http2Server } from 'http2';
import { PrismaClient } from '@prisma/client';
import SendGridMail from '@sendgrid/mail';
import { applyMiddleware } from 'graphql-middleware';
import { createApp } from './app';
import { createContext } from './context';
import { createServer as createHttpServer } from 'http';
import express from 'express';
import { permissions } from './permissions';
import { schema } from './schema';

const { PORT, NODE_ENV, SENDGRID_API_KEY } = process.env;
const prisma = new PrismaClient();

const schemaWithMiddleware = NODE_ENV === 'test'
  ? schema
  : applyMiddleware(
    schema,
    permissions,
  );

SendGridMail.setApiKey(SENDGRID_API_KEY);

export const createApolloServer = (
  prismaClient: PrismaClient,
): ApolloServer => new ApolloServer({
  schema: schemaWithMiddleware,
  context: createContext(prismaClient),
  // introspection: process.env.NODE_ENV !== 'production',
  // playground: process.env.NODE_ENV !== 'production',
  subscriptions: {
    onConnect: (): void => {
      process.stdout.write('Connected to websocket\n');
    },
  },
});

const initializeApolloServer = (apollo: ApolloServer, app: express.Application): () => void => {
  apollo.applyMiddleware({ app });

  return (): void => {
    process.stdout.write(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
    );
  };
};

export const startServer = async (
  app: express.Application,
  apollo: ApolloServer,
  port: string | number = 4000,
): Promise<Http2Server> => {
  const httpServer = createHttpServer(app);

  apollo.installSubscriptionHandlers(httpServer);

  const handleApolloServerInitilized = initializeApolloServer(apollo, app);

  return httpServer.listen({ port }, () => {
    handleApolloServerInitilized();
  });
};

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  const apollo = createApolloServer(prisma);

  startServer(app, apollo, PORT);
}
