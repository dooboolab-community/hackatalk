import * as Device from 'expo-device';

import type {
  AppUserQuery,
  AppUserQueryResponse,
} from './__generated__/AppUserQuery.graphql';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import React, { ReactElement, ReactNode, Suspense, useEffect, useState } from 'react';
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
import ComponentWrapper from './utils/ComponentWrapper';
import Icons from './utils/Icons';
import { Image } from 'react-native';
import { LoadingIndicator } from 'dooboo-ui';
import RootNavigator from './components/navigation/RootStackNavigator';
import { User } from 'types/graphql';
import relayEnvironment from './relay';

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

function App(): ReactElement {
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
      error: (error: any) => {
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

  // if (loading) return <LoadingIndicator />;

  return <RootNavigator />;
}

function HackatalkThemeProvider(props: { children: ReactElement }): ReactElement {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider
      customTheme={{ light, dark }}
      initialThemeType={
        colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT
      }
    >
      {props.children}
    </ThemeProvider>
  );
}

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
