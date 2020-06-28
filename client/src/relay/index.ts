import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { __DEV__, relayTransactionLogger } from '../utils/relay';

import { EnvironmentConfig } from 'relay-runtime/lib/store/RelayModernEnvironment';
import fetchGraphQL from './fetch';

const getRelayConfig = (): EnvironmentConfig => {
  return {
    configName: new Date().getSeconds().toString(), // temp value for testing
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
    log: __DEV__ ? relayTransactionLogger : null,
  };
};
class Relay {
  environment: Environment = new Environment(getRelayConfig());

  constructor() {
    this.init();
  }

  init(): void {
    if (__DEV__) console.log('relay env instance initialized');
    this.environment = new Environment(getRelayConfig());
  }
}

export default new Relay();
