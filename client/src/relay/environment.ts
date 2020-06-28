import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { __DEV__, relayTransactionLogger } from '../utils/relay';

import fetchGraphQL from './fetch';

export default new Environment({
  configName: new Date().getSeconds().toString(), // temp value for testing
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
  log: __DEV__ ? relayTransactionLogger : null,
});
