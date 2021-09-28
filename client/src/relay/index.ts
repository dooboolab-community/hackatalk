import {
  Environment,
  IEnvironment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import fetchGraphQL from './fetch';
import {relayTransactionLogger} from './util';
import {subscribe} from './subscription';

export function createRelayEnvironment(): IEnvironment {
  return new Environment({
    network: Network.create(fetchGraphQL, subscribe),
    store: new Store(new RecordSource()),
    log: __DEV__ ? relayTransactionLogger : null,
  });
}

export const relayEnvironment = createRelayEnvironment();
