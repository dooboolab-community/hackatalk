import {Server, createServer as createHttpServer} from 'http';
import {execute, subscribe} from 'graphql';

import {ApolloServer} from 'apollo-server-express';
import SendGridMail from '@sendgrid/mail';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {applyMiddleware} from 'graphql-middleware';
import {assert} from './utils/assert';
import {createApp} from './app';
import {createContext} from './context';
import express from 'express';
import {permissions} from './permissions';
import {schema} from './schema';

const {PORT = 4000, NODE_ENV, SENDGRID_API_KEY} = process.env;

const schemaWithMiddleware =
  NODE_ENV === 'test' ? schema : applyMiddleware(schema, permissions);

assert(SENDGRID_API_KEY, 'Missing SENDGRID_API_KEY environment variable.');
SendGridMail.setApiKey(SENDGRID_API_KEY);

const createApolloServer = (): ApolloServer =>
  new ApolloServer({
    schema: schemaWithMiddleware,
    context: createContext,
    introspection: process.env.NODE_ENV !== 'production',
  });

const initializeApolloServer = (
  httpServer: Server,
  apollo: ApolloServer,
  app: express.Application,
): (() => void) => {
  apollo.applyMiddleware({app});

  const subscriptionServer = SubscriptionServer.create(
    {
      schema: schemaWithMiddleware,
      execute,
      subscribe,
    },
    {
      server: httpServer,
    },
  );

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => subscriptionServer.close());
  });

  return (): void => {
    process.stdout.write(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}\n`,
    );
  };
};

export const startServer = async (
  app: express.Application,
  port: number,
): Promise<Server> => {
  const httpServer = createHttpServer(app);
  const apollo = createApolloServer();

  await apollo.start();

  const handleApolloServerInit = initializeApolloServer(
    httpServer,
    apollo,
    app,
  );

  return httpServer.listen({port}, () => {
    handleApolloServerInit();
  });
};

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();

  startServer(app, PORT as number);
}
