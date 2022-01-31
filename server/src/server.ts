import {Server, createServer as createHttpServer} from 'http';
import {createContext, runSubscriptionServer} from './context';

import {ApolloServer} from 'apollo-server-express';
import SendGridMail from '@sendgrid/mail';
import {SubscriptionServer} from 'subscriptions-transport-ws';
import {applyMiddleware} from 'graphql-middleware';
import {assert} from './utils/assert';
import {createApp} from './app';
import express from 'express';
import {permissions} from './permissions';
import {schema} from './schema';

const {PORT = 4000, NODE_ENV, SENDGRID_API_KEY} = process.env;

export const schemaWithMiddleware =
  NODE_ENV === 'test' ? schema : applyMiddleware(schema, permissions);

assert(SENDGRID_API_KEY, 'Missing SENDGRID_API_KEY environment variable.');
SendGridMail.setApiKey(SENDGRID_API_KEY);

let subscriptionServer: SubscriptionServer;

const createApolloServer = (): ApolloServer =>
  new ApolloServer({
    schema: schemaWithMiddleware,
    context: createContext,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              if (subscriptionServer) {
                subscriptionServer.close();
              }
            },
          };
        },
      },
    ],
  });

const initializeApolloServer = (
  httpServer: Server,
  apollo: ApolloServer,
  app: express.Application,
): (() => void) => {
  apollo.applyMiddleware({app});

  subscriptionServer = runSubscriptionServer(httpServer, apollo);

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
