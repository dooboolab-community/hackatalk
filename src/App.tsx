import * as Device from 'expo-device';

import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import OneSignal, { DeviceInfo, OpenResult, ReceivedNotification } from 'react-native-onesignal';
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
import type { AppUserQuery } from './__generated__/AppUserQuery.graphql';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import RootNavigator from './components/navigation/RootStackNavigator';
import { Text } from 'react-native';
import relayEnvironment from './relay/RelayEnvironment';

// import { initializeEThree } from './utils/virgil';

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

function AppWithTheme(): ReactElement {
  const { setDeviceType } = useDeviceContext();

  // const { loading, data } = useQuery<{ me: User }>(QUERY_ME);

  const setDevice = async (): Promise<void> => {
    const deviceType = await Device.getDeviceTypeAsync();
    setDeviceType(deviceType);
  };

  // useEffect(() => {
  //   if (data && data.me) {
  //     initializeEThree(data.me.id);
  //     setUser(data.me);
  //   } else if (data) {
  //     AsyncStorage.removeItem('token');
  //   }
  //   setDevice();
  // }, [loading]);

  return <RootNavigator />;
}

const UserQuery = graphql`
  query AppUserQuery {
    me {
      id
      email
      verified
    }
  }
`;

function App(): ReactElement {
  const { setUser } = useAuthContext();
  const environment = useRelayEnvironment();
  const result = preloadQuery<AppUserQuery>(environment, UserQuery, {}, { fetchPolicy: 'store-and-network' });
  const data = usePreloadedQuery<AppUserQuery>(UserQuery, result);
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

  useEffect(() => {
    if (data.me) {
      setUser({
        ...data.me,
      });
    } else {
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('password');
    }
  }, [data.me]);

  return (
    <ThemeProvider
      customTheme={{ light, dark }}
      initialThemeType={colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT}
    >
      <AppWithTheme />
    </ThemeProvider>
  );
}

function ProviderWrapper(): ReactElement {
  return (
    <AppearanceProvider>
      <DeviceProvider>
        <RelayEnvironmentProvider environment={relayEnvironment}>
          <Suspense fallback={<Text>loading app...</Text>}>
            <AuthProvider>
              <ActionSheetProvider>
                <App />
              </ActionSheetProvider>
            </AuthProvider>
          </Suspense>
        </RelayEnvironmentProvider>
      </DeviceProvider>
    </AppearanceProvider>
  );
}

export default ProviderWrapper;
