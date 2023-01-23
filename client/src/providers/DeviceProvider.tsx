import * as Device from 'expo-device';

import React, {useEffect, useState} from 'react';
import type {ReactElement, ReactNode} from 'react';

import createCtx from '../utils/createCtx';
import {nanoid} from 'nanoid/non-secure';

interface Context {
  deviceType: Device.DeviceType;
  /** Key for identifying each device on GraphQL server. */
  deviceKey: string;
  setDeviceType: React.Dispatch<React.SetStateAction<Device.DeviceType>>;
}

const [useCtx, Provider] = createCtx<Context>();

type Props = {
  children: ReactNode;
};

const DeviceProvider = ({children}: Props): ReactElement => {
  const [deviceType, setDeviceType] = useState<Device.DeviceType>(
    Device.DeviceType.PHONE,
  );

  const deviceKey = nanoid();

  useEffect(() => {
    let isMounted = true;

    Device.getDeviceTypeAsync().then((result) => {
      // Only change state if this component is still mounted.
      if (isMounted) {
        setDeviceType(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Provider
      value={{
        deviceType,
        deviceKey,
        setDeviceType,
      }}
    >
      {children}
    </Provider>
  );
};

const DeviceContext = {
  useDeviceContext: useCtx,
  DeviceProvider,
};

export {useCtx as useDeviceContext, DeviceProvider};
export default DeviceContext;
