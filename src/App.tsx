import * as Device from 'expo-device';

import type { AppUserQuery, AppUserQueryResponse } from './__generated__/AppUserQuery.graphql';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import React, { ReactElement, Suspense, useEffect } from 'react';
import RelayEnvironment, {
  RelayEnvironmentProps,
} from './relay/RelayEnvironment';
import {
  RelayEnvironmentProvider,
  graphql,
  preloadQuery,
  usePreloadedQuery,
  useRelayEnvironment,
} from 'react-relay/hooks';
import { ThemeProvider, ThemeType } from '@dooboo-ui/theme';
import { dark, light } from './theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-community/async-storage';
import RootNavigator from './components/navigation/RootStackNavigator';
import { Text } from 'react-native';
import { initializeEThree } from './utils/virgil';

const userQuery = graphql`
  query AppUserQuery {
    me {
      id
      email
      verified
    }
  }
`;

function AppWithTheme(): ReactElement {
  const environment = useRelayEnvironment();
  const result = preloadQuery<AppUserQuery>(
    environment,
    userQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  );
  const { setDeviceType } = useDeviceContext();
  const { setUser } = useAuthContext();
  const data = usePreloadedQuery<AppUserQuery>(userQuery, result);

  const setDevice = async (): Promise<void> => {
    const deviceType = await Device.getDeviceTypeAsync();
    setDeviceType(deviceType);
  };

  const initUser = async (me: AppUserQueryResponse['me']): Promise<void> => {
    if (!me) return;
    await initializeEThree(me.id);
    setUser(me);
  };

  useEffect(() => {
    if (data.me) {
      initUser(data.me);
      return;
    }

    AsyncStorage.removeItem('token');
    setDevice();
  }, [data.me]);

  return <RootNavigator />;
}

function App(): ReactElement {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      customTheme={{ light, dark }}
      initialThemeType={
        colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT
      }
    >
      <AppWithTheme />
    </ThemeProvider>
  );
}

function RelayProviderWrapper(): ReactElement {
  const relay: RelayEnvironmentProps = RelayEnvironment.environment;

  return (
    <RelayEnvironmentProvider environment={relay}>
      <Suspense fallback={<Text>loading app...</Text>}>
        <ActionSheetProvider>
          <App />
        </ActionSheetProvider>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

function ProviderWrapper(): ReactElement {
  return (
    <AppearanceProvider>
      <DeviceProvider>
        <AuthProvider>
          <RelayProviderWrapper />
        </AuthProvider>
      </DeviceProvider>
    </AppearanceProvider>
  );
}

export default ProviderWrapper;
