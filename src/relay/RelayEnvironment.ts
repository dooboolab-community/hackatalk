import {
  CacheConfig,
  Environment,
  GraphQLResponse,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime';

import AsyncStorage from '@react-native-community/async-storage';
import fetchGraphQL from './fetch';

function fetchFunction(
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
): Promise<GraphQLResponse> {
  const args = { request, variables, cacheConfig };
  return AsyncStorage.getItem('token').then((token) => {
    return fetchGraphQL({ ...args, token });
  });
}

export const relayEnvConfig = {
  network: Network.create(fetchFunction),
  store: new Store(new RecordSource()),
};

export default new Environment(relayEnvConfig);
