import * as Device from 'expo-device';

import React, {FC, useEffect, useState} from 'react';

import createCtx from '../utils/createCtx';

interface Context {
  deviceType: Device.DeviceType;
  setDeviceType: React.Dispatch<React.SetStateAction<Device.DeviceType>>;
}

const [useCtx, Provider] = createCtx<Context>();

const DeviceProvider: FC = ({children}) => {
  const [deviceType, setDeviceType] = useState<Device.DeviceType>(
    Device.DeviceType.PHONE,
  );

  useEffect(() => {
    let isMounted = true;

    Device.getDeviceTypeAsync().then((result) => {
      // Only change state if this component is still mounted.
      if (isMounted) setDeviceType(result);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Provider
      value={{
        deviceType,
        setDeviceType,
      }}>
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
