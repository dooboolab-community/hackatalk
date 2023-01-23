import {Environment, Network, RecordSource, Store} from 'relay-runtime';

import type {IEnvironment} from 'relay-runtime';
import fetchGraphQL from './fetch';
import {fetchOrSubscribe} from './subscription';
import {relayTransactionLogger} from './util';

export function createRelayEnvironment(): IEnvironment {
  return new Environment({
    network: Network.create(fetchGraphQL, fetchOrSubscribe),
    store: new Store(new RecordSource()),
    log: __DEV__ ? relayTransactionLogger : null,
  });
}
