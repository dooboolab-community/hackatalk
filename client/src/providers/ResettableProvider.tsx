import React, {FC, useState} from 'react';

import {IEnvironment} from 'relay-runtime';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import createCtx from '../utils/createCtx';

interface Context {
  /**
   * Current Relay environment.
   */
  environment: IEnvironment;

  /**
   * Discard the current Relay environment and
   * create a new one.
   */
  resetRelayEnvironment: () => void;
}

interface Props {
  /**
   * Factory function for generating Relay environments.
   */
  createRelayEnvironment: () => IEnvironment;
}

const [useResettableRelayContext, Provider] = createCtx<Context>();

const ResettableRelayProvider: FC<Props> = ({
  children,
  createRelayEnvironment,
}) => {
  const [environment, setEnvironment] = useState<IEnvironment>(
    createRelayEnvironment(),
  );

  const resetRelayEnvironment = (): void => {
    setEnvironment(createRelayEnvironment());
  };

  return (
    <Provider value={{environment, resetRelayEnvironment}}>
      <RelayEnvironmentProvider environment={environment}>
        {children}
      </RelayEnvironmentProvider>
    </Provider>
  );
};

export {useResettableRelayContext, ResettableRelayProvider};
