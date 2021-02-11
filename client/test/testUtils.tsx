import * as Device from 'expo-device';

import React, {FC, ReactElement} from 'react';

import {AllProviders} from '../src/providers';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeType} from 'dooboo-ui';
import {User} from '../src/types/graphql';

export const TestSafeAreaProvider: FC = ({children}) => {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: {x: 0, y: 0, width: 0, height: 0},
        insets: {top: 0, left: 0, right: 0, bottom: 0},
      }}>
      {children}
    </SafeAreaProvider>
  );
};

export const createTestElement = (
  child: ReactElement,
  themeType?: ThemeType,
  deviceType?: Device.DeviceType,
  user?: User,
): ReactElement => (
  <AllProviders
    initialDeviceType={deviceType}
    initialThemeType={themeType}
    initialAuthUser={user}>
    <TestSafeAreaProvider>{child}</TestSafeAreaProvider>
  </AllProviders>
);

export const createTestProps = (
  obj: Record<string, unknown> = {},
): Record<string, unknown> | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    setOptions: jest.fn(),
  },
  ...obj,
});
