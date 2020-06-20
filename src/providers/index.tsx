import * as Device from 'expo-device';

import { AuthProvider, useAuthContext } from './AuthProvider';
import React, { ReactElement } from 'react';
import RelayEnvironment, {
  RelayEnvironmentProps,
} from '../relay/RelayEnvironment';
import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from '../theme';

import { DeviceProvider } from './DeviceProvider';
import { ProfileModalProvider } from './ProfileModalProvider';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { User } from '../types/graphql';

interface AllProvidersProps {
  initialDeviceType?: Device.DeviceType;
  initialThemeType?: ThemeType;
  initialAuthUser?: User;
  children?: React.ReactElement;
}
interface RelayProvidersProps {
  children?: React.ReactElement;
}

const RelayProviderWrapper = ({
  children,
}: RelayProvidersProps): ReactElement => {
  const relay: RelayEnvironmentProps = RelayEnvironment.environment;

  return (
    <RelayEnvironmentProvider environment={relay}>
      <ProfileModalProvider>{children}</ProfileModalProvider>
    </RelayEnvironmentProvider>
  );
};

// hyochan => for testing
export const AllProviders = ({
  initialThemeType,
  initialAuthUser,
  initialDeviceType,
  children,
}: AllProvidersProps): React.ReactElement => {
  return (
    <DeviceProvider initialDeviceType={initialDeviceType}>
      <ThemeProvider
        initialThemeType={initialThemeType}
        customTheme={{ light, dark }}
      >
        <AuthProvider initialAuthUser={initialAuthUser}>
          <RelayProviderWrapper>{children}</RelayProviderWrapper>
        </AuthProvider>
      </ThemeProvider>
    </DeviceProvider>
  );
};
