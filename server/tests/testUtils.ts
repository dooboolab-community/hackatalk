import {ApolloClient, NormalizedCacheObject} from '@apollo/client/core';

import {Client} from 'graphql-ws';
import {GraphQLClient} from 'graphql-request';
import {PrismaClient} from '@prisma/client';
import {Server} from 'http';
import {assert} from '../src/utils/assert';

export class TestUtils {
  public apolloClient: ApolloClient<NormalizedCacheObject>;
  public server: Server;
  public prisma: PrismaClient;
  public graphqlClient: GraphQLClient;
  public networkInterface: Client;

  constructor(
    apolloClient: ApolloClient<NormalizedCacheObject>,
    server: Server,
    prisma: PrismaClient,
    graphqlClient: GraphQLClient,
    networkInterface: Client,
  ) {
    this.apolloClient = apolloClient;
    this.server = server;
    this.prisma = prisma;
    this.graphqlClient = graphqlClient;
    this.networkInterface = networkInterface;
  }

  setAuthToken = (token: string): void => {
    this.graphqlClient.setHeader('Authorization', `${token}`);
  };
}

let _testUtils: TestUtils | undefined;

export function getTestUtils(): TestUtils {
  assert(_testUtils, 'Test utilities are not initialized.');

  return _testUtils;
}

export function setTestUtils(value: TestUtils): void {
  _testUtils = value;
}
