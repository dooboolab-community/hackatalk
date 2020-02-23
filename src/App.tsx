import * as Device from 'expo-device';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import OneSignal, { DeviceInfo, OpenResult, ReceivedNotification } from 'react-native-onesignal';
import React, { ReactElement, useEffect } from 'react';
import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from './theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { QUERY_ME } from './graphql/queries';
import RootNavigator from './components/navigation/RootStackNavigator';
import SplashScreen from 'react-native-bootsplash';
import { User } from './types';
import client from './apollo/Client';
import { initializeEThree } from './utils/virgil';

let timer: number;
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
  const { setUser } = useAuthContext();
  const { setDeviceType } = useDeviceContext();

  const { loading, data } = useQuery<{ me: User}, {}>(QUERY_ME);

  const setDevice = async (): Promise<void> => {
    const deviceType = await Device.getDeviceTypeAsync();
    setDeviceType(deviceType);
  };

  useEffect(() => {
    return (): void => {
      if (timer) { clearTimeout(timer); }
    };
  }, []);

  useEffect(() => {
    if (data && data.me) {
      initializeEThree(data.me.id);
      setUser(data.me);
    } else if (data) {
      AsyncStorage.removeItem('token');
    }
    setDevice();

    timer = setTimeout(() => SplashScreen.hide(), 1000);
  }, [loading]);

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
      <AppWithTheme/>
    </ThemeProvider>
  );
}

function ProviderWrapper(): ReactElement {
  return (
    <AppearanceProvider>
      <DeviceProvider>
        <AuthProvider>
          <ApolloProvider client={client}>
            <ActionSheetProvider>
              <App />
            </ActionSheetProvider>
          </ApolloProvider>
        </AuthProvider>
      </DeviceProvider>
    </AppearanceProvider>
  );
}

export default ProviderWrapper;
