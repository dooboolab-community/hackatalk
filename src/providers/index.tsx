import * as Device from 'expo-device';

import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from '../theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthProvider } from './AuthProvider';
import { DeviceProvider } from './DeviceProvider';
import { FriendProvider } from './FriendProvider';
import { ProfileModalProvider } from './ProfileModalProvider';
import React from 'react';
import { User } from '../types';
import testClient from '../apollo/testClient';

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
  children,
}: Props): React.ReactElement => {
  return (
    <DeviceProvider>
      <ThemeProvider
        initialThemeType={initialThemeType}
        customTheme={{ light, dark }}
      >
        <ApolloProvider client={testClient}>
          <FriendProvider>
            <AuthProvider initialAuthUser={initialAuthUser}>
              <ProfileModalProvider>
                {children}
              </ProfileModalProvider>
            </AuthProvider>
          </FriendProvider>
        </ApolloProvider>
      </ThemeProvider>
    </DeviceProvider>
  );
};

export default ({ initialThemeType, children }: Props): React.ReactElement => {
  return (
    <ThemeProvider
      initialThemeType={initialThemeType}
    >
      <AuthProvider>
        <ActionSheetProvider>{children}</ActionSheetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
