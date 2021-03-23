import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import {__DEV__, relayTransactionLogger} from './util';

import fetchGraphQL from './fetch';
import {subscribe} from './subscription';

const storeObject = new Store(new RecordSource());

export default new Environment({
  network: Network.create(fetchGraphQL, subscribe),
  store: storeObject,
  log: __DEV__ ? relayTransactionLogger : null,
});
