import * as Device from 'expo-device';

import React, { useState } from 'react';

import createCtx from '../utils/createCtx';

interface Context {
  deviceType: Device.DeviceType;
  setDeviceType: React.Dispatch<React.SetStateAction<Device.DeviceType>>;
}
const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
}

function DeviceProvider(props: Props): React.ReactElement {
  const { children } = props;
  const [deviceType, setDeviceType] = useState<Device.DeviceType >(Device.DeviceType.UNKNOWN);

  return (
    <Provider
      value={{
        deviceType,
        setDeviceType,
      }}
    >
      {children}
    </Provider>
  );
}

export { useCtx as useDeviceContext, DeviceProvider };
