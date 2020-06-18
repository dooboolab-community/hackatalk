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

const __DEV__ = process.env.NODE_ENV === 'development';

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

export type RelayEnvironmentProps = Environment;

class RelayEnvironment {
  config = {
    network: Network.create(fetchFunction),
    store: new Store(new RecordSource()),
  };

  environment: RelayEnvironmentProps = new Environment(this.config);

  constructor() {
    this.resetEnvironment();
  }

  getEnvironment(): RelayEnvironmentProps {
    return this.environment;
  }

  resetEnvironment(): RelayEnvironmentProps {
    if (__DEV__) console.log('relay env instance initialized');
    this.environment = new Environment(this.config);
    return this.environment;
  }
}

export default new RelayEnvironment();
