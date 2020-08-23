import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import type {
  AppUserQuery,
  AppUserQueryResponse,
} from './__generated__/AppUserQuery.graphql';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import React, { FC, ReactElement, Suspense, useEffect, useState } from 'react';
import {
  RelayEnvironmentProvider,
  fetchQuery,
  graphql,
  useRelayEnvironment,
} from 'react-relay/hooks';
import { ThemeProvider, ThemeType } from '@dooboo-ui/theme';
import { dark, light } from './theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from './utils/Icons';
import { Image } from 'react-native';
import { LoadingIndicator } from 'dooboo-ui';
import RootNavigator from './components/navigation/RootStackNavigator';
import { User } from 'types/graphql';
import { registerForPushNotificationsAsync } from './utils/noti';
import relayEnvironment from './relay';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const meQuery = graphql`
  query AppUserQuery {
    me {
      id
      email
      verified
      profile {
        authType
      }
    }
  }
`;

function cacheImages(images: (number | string)[]): any[] {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image as number).downloadAsync();
    }
  });
}

const loadAssetsAsync = async (): Promise<void> => {
  const imageAssets = cacheImages(Icons);
  await Promise.all([...imageAssets]);
};

function AppWithTheme(): ReactElement {
  const environment = useRelayEnvironment();

  const [loading, setLoading] = useState<boolean>(false);
  const [assetLoaded, setAssetLoaded] = useState<boolean>(false);
  const { setDeviceType } = useDeviceContext();
  const { setUser } = useAuthContext();

  const setDevice = async (): Promise<void> => {
    const deviceType = await Device.getDeviceTypeAsync();
    setDeviceType(deviceType);
  };

  const initUser = async (me: AppUserQueryResponse['me']): Promise<void> => {
    if (!me) return;
    setUser(me as User);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuery<AppUserQuery>(environment, meQuery, {}).subscribe({
      start: () => {
        setLoading(true);
      },
      error: (error: Error) => {
        console.log('error', error);
        setLoading(false);
      },
      next: (data) => {
        if (data.me) {
          initUser(data.me);
          return;
        }
        AsyncStorage.removeItem('token');
        setDevice();
      },
    });

    registerForPushNotificationsAsync().then((token) => {
      if (token) { AsyncStorage.setItem('push_token', token); }
    });
  }, []);

  if (loading || !assetLoaded) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={(): void => setAssetLoaded(true)}
      // onError={console.warn}
      />
    );
  }

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

const RelayProviderWrapper: FC = ({ children }) => {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Suspense fallback={<LoadingIndicator />}>
        <ActionSheetProvider>{children}</ActionSheetProvider>
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

function ProviderWrapper(): ReactElement {
  return (
    <AppearanceProvider>
      <DeviceProvider>
        <AuthProvider>
          <RelayProviderWrapper>
            <App />
          </RelayProviderWrapper>
        </AuthProvider>
      </DeviceProvider>
    </AppearanceProvider>
  );
}

export default ProviderWrapper;
