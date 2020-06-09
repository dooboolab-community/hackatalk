import * as Device from 'expo-device';

import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from '../theme';

import { AuthProvider } from './AuthProvider';
import { DeviceProvider } from './DeviceProvider';
import { ProfileModalProvider } from './ProfileModalProvider';
import React from 'react';
import { User } from '../types/graphql';

interface Props {
  initialDeviceType?: Device.DeviceType;
  initialThemeType?: ThemeType;
  initialAuthUser?: User;
  children?: React.ReactElement;
}

// hyochan => for testing
export const AllProviders = ({
  initialThemeType,
  initialAuthUser,
  initialDeviceType,
  children,
}: Props): React.ReactElement => {
  return (
    <DeviceProvider
      initialDeviceType={initialDeviceType}
    >
      <ThemeProvider
        initialThemeType={initialThemeType}
        customTheme={{ light, dark }}
      >
        <AuthProvider initialAuthUser={initialAuthUser}>
          <ProfileModalProvider>
            {children}
          </ProfileModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </DeviceProvider>
  );
};
