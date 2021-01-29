import * as Device from 'expo-device';

import React, {ReactElement, Suspense} from 'react';
import {RelayMockEnvironment, createMockEnvironment} from 'relay-test-utils';
import {ThemeProvider, ThemeType} from '@dooboo-ui/theme';
import {dark, light} from '../theme';

import {AuthProvider} from './AuthProvider';
import {DeviceProvider} from './DeviceProvider';
import {LoadingIndicator} from 'dooboo-ui';
import {ProfileModalProvider} from './ProfileModalProvider';
import {RelayEnvironmentProvider} from 'react-relay/hooks';
import {User} from '../types/graphql';

interface AllProvidersProps {
  initialDeviceType?: Device.DeviceType;
  initialThemeType?: ThemeType;
  initialAuthUser?: User;
  children?: React.ReactElement;
}
interface RelayProvidersProps {
  children?: React.ReactElement;
}

// hyochan => for testing
export const environment: RelayMockEnvironment = createMockEnvironment();

const RelayProviderWrapper = ({
  children,
}: RelayProvidersProps): ReactElement => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<LoadingIndicator />}>
        <ProfileModalProvider>{children}</ProfileModalProvider>
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

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
        customTheme={{light, dark}}>
        <AuthProvider initialAuthUser={initialAuthUser}>
          <RelayProviderWrapper>{children}</RelayProviderWrapper>
        </AuthProvider>
      </ThemeProvider>
    </DeviceProvider>
  );
};
