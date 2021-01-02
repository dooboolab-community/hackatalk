import { ApolloServer } from 'apollo-server-express';
import { Http2Server } from 'http2';
import SendGridMail from '@sendgrid/mail';
import { applyMiddleware } from 'graphql-middleware';
import { assert } from './utils/assert';
import { createApp } from './app';
import { createContext } from './context';
import { createServer as createHttpServer } from 'http';
import express from 'express';
import { permissions } from './permissions';
import { schema } from './schema';

const { PORT = 4000, NODE_ENV, SENDGRID_API_KEY } = process.env;

const schemaWithMiddleware =
  NODE_ENV === 'test' ? schema : applyMiddleware(schema, permissions);

assert(SENDGRID_API_KEY, 'Missing SENDGRID_API_KEY environment variable.');
SendGridMail.setApiKey(SENDGRID_API_KEY);

const createApolloServer = (): ApolloServer =>
  new ApolloServer({
    schema: schemaWithMiddleware,
    context: createContext,
    // introspection: process.env.NODE_ENV !== 'production',
    // playground: process.env.NODE_ENV !== 'production',
    subscriptions: {
      onConnect: (): void => {
        process.stdout.write('Connected to websocket\n');
      },
    },
  });

const initializeApolloServer = (
  apollo: ApolloServer,
  app: express.Application,
): (() => void) => {
  apollo.applyMiddleware({ app });

  return (): void => {
    process.stdout.write(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
    );
  };
};

export const startServer = async (
  app: express.Application,
): Promise<Http2Server> => {
  const httpServer = createHttpServer(app);
  const apollo = createApolloServer();

  apollo.installSubscriptionHandlers(httpServer);

  const handleApolloServerInitilized = initializeApolloServer(apollo, app);

  return httpServer.listen({ port: PORT }, () => {
    handleApolloServerInitilized();
  });
};

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();

  startServer(app);
}
