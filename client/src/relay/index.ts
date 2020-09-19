import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { __DEV__, relayTransactionLogger } from '../utils/relay';

import fetchGraphQL from './fetch';

const storeObject = new Store(new RecordSource());

export default new Environment({
  network: Network.create(fetchGraphQL),
  store: storeObject,
  log: __DEV__ ? relayTransactionLogger : null,
});
