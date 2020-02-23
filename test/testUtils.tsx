import * as Device from 'expo-device';

import React, { ReactElement } from 'react';

import { AllProviders } from '../src/providers';
import { ThemeType } from '@dooboo-ui/native-theme';
import { User } from '../src/types';

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
    {child}
  </AllProviders>
);

export const createTestProps = (obj: object = {}): object | unknown | any => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    setOptions: jest.fn(),
  },
  ...obj,
});
