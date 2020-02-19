import * as Device from 'expo-device';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import React, { useEffect } from 'react';
import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from './theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from './utils/Icons';
import { QUERY_ME } from './graphql/queries';
import RootNavigator from './components/navigation/RootStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { User } from './types';
import { View } from 'react-native';
import client from './apollo/Client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cacheImages(images: any[]): any[] {
  return images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
}

const loadAssetsAsync = async (
  setDeviceType: (val: Device.DeviceType) => void):
Promise<void> => {
  const imageAssets = cacheImages(Icons);
  await Promise.all([
    ...imageAssets,
  ]);

  const deviceType = await Device.getDeviceTypeAsync();
  setDeviceType(deviceType);
};

function App(): React.ReactElement {
  const colorScheme = useColorScheme();

  const { setUser } = useAuthContext();
  const { setDeviceType } = useDeviceContext();

  const { loading, data, error } = useQuery<{ me: User}, {}>(QUERY_ME);

  if (error) {
    AsyncStorage.removeItem('token');
  }

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    }
  }, [loading]);

  if (!loading) {
    SplashScreen.hide();
  }

  return (
    <ThemeProvider
      customTheme={{ light, dark }}
      initialThemeType={
        colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT
      }
    >
      <RootNavigator />
    </ThemeProvider>
  );
}

function ProviderWrapper(): React.ReactElement {
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
