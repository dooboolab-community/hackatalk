import * as Device from 'expo-device';

import React, {ReactElement} from 'react';

import {AllProviders} from '../src/providers';
import {ThemeType} from 'dooboo-ui';
import {User} from '../src/types/graphql';

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
