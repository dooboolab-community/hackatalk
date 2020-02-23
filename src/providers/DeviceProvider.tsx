import * as Device from 'expo-device';

import React, { useState } from 'react';

import createCtx from '../utils/createCtx';

interface Context {
  deviceType: Device.DeviceType;
  setDeviceType: React.Dispatch<React.SetStateAction<Device.DeviceType>>;
}
const [useCtx, Provider] = createCtx<Context>();

interface Props {
  initialDeviceType?: Device.DeviceType;
  children?: React.ReactElement;
}

function DeviceProvider(props: Props): React.ReactElement {
  const { initialDeviceType = Device.DeviceType.PHONE, children } = props;
  const [deviceType, setDeviceType] = useState<Device.DeviceType >(initialDeviceType);

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

const DeviceContext = {
  useDeviceContext: useCtx,
  DeviceProvider,
};

export { useCtx as useDeviceContext, DeviceProvider };
export default DeviceContext;
