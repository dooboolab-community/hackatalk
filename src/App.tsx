import * as Device from 'expo-device';

import type { AppUserQuery, AppUserQueryResponse } from './__generated__/AppUserQuery.graphql';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import OneSignal, {
  DeviceInfo,
  OpenResult,
  ReceivedNotification,
} from 'react-native-onesignal';
import React, { ReactElement, Suspense, useEffect } from 'react';
import {
  RelayEnvironmentProvider,
  graphql,
  preloadQuery,
  usePreloadedQuery,
  useRelayEnvironment,
} from 'react-relay/hooks';
import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from './theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import RootNavigator from './components/navigation/RootStackNavigator';
import { Text } from 'react-native';
import { initializeEThree } from './utils/virgil';

const onReceived = (notification: ReceivedNotification): void => {
  console.log('Notification received: ', notification);
};

const onOpened = (openResult: OpenResult): void => {
  console.log('Notification Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
};

const onIds = (device: DeviceInfo): void => {
  console.log('Device info: ', device);
};

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

  useEffect(() => {
    OneSignal.init(Config.ONESIGNAL_APP_ID, { kOSSettingsKeyAutoPrompt: true });

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return (): void => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

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
  const {
    state: { relay },
  } = useAuthContext();
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
