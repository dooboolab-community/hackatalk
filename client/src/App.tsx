import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import React, { FC, ReactElement, ReactNode, Suspense, useEffect, useState } from 'react';
import {
  RelayEnvironmentProvider,
  graphql,
  useLazyLoadQuery,
} from 'react-relay/hooks';
import { ThemeProvider, ThemeType } from '@dooboo-ui/theme';
import { dark, light } from './theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { AppLoading } from 'expo';
import type {
  AppUserQuery,
} from './__generated__/AppUserQuery.graphql';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-community/async-storage';
import ComponentWrapper from './utils/ComponentWrapper';
import Icons from './utils/Icons';
import { Image } from 'react-native';
import { LoadingIndicator } from 'dooboo-ui';
import RootNavigator from './components/navigation/RootStackNavigator';
import { registerForPushNotificationsAsync } from './utils/noti';
import relayEnvironment from './relay';
import { useMedia } from './utils/media';

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
        socialId
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

function App(): ReactElement {
  const [assetLoaded, setAssetLoaded] = useState<boolean>(false);
  const { setDeviceType } = useDeviceContext();
  const { setUser } = useAuthContext();

  const setDevice = async (): Promise<void> => {
    const deviceType = await Device.getDeviceTypeAsync();

    setDeviceType(deviceType);
  };

  const { me } = useLazyLoadQuery<AppUserQuery>(meQuery, {});

  useEffect(() => {
    if (me === null) {
      AsyncStorage.removeItem('token');
      setDevice();

      return;
    }

    // Update auth context.
    setUser(me);

    // Register notification token.
    registerForPushNotificationsAsync().then((pushToken) => {
      if (pushToken) {
        AsyncStorage.setItem('push_token', pushToken);
      }
    });
  }, [me]);

  if (!assetLoaded) {
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

const HackatalkThemeProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const mediaQuery = useMedia();

  return (
    <ThemeProvider
      customTheme={{
        light: {
          ...light,
          ...mediaQuery,
        },
        dark: {
          ...dark,
          ...mediaQuery,
        },
      }}
      initialThemeType={
        colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT
      }
    >
      {children}
    </ThemeProvider>
  );
};

function ActionSheetProviderWithChildren(props: { children: ReactNode }): ReactElement {
  return (
    <ActionSheetProvider>
      {props.children}
    </ActionSheetProvider>
  );
}

// Add all required providers for App.
const WrappedApp = new ComponentWrapper(App)
  .wrap(HackatalkThemeProvider, {})
  .wrap(ActionSheetProviderWithChildren, {})
  .wrap(Suspense, { fallback: <LoadingIndicator /> })
  .wrap(RelayEnvironmentProvider, { environment: relayEnvironment })
  .wrap(AuthProvider, {})
  .wrap(DeviceProvider, {})
  .wrap(AppearanceProvider, {})
  .build();

export default WrappedApp;
