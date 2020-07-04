import * as Device from 'expo-device';

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
import AsyncStorage from '@react-native-community/async-storage';
import { LoadingIndicator } from 'dooboo-ui';
import RootNavigator from './components/navigation/RootStackNavigator';
import SplashModule from './utils/splash';
import { User } from 'types/graphql';
import { initializeEThree } from './utils/virgil';
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

function AppWithTheme(): ReactElement {
  const environment = useRelayEnvironment();

  const [loading, setLoading] = useState<boolean>(false);
  const { setDeviceType } = useDeviceContext();
  const { setUser } = useAuthContext();

  const setDevice = async (): Promise<void> => {
    const deviceType = await Device.getDeviceTypeAsync();
    setDeviceType(deviceType);
  };

  const initUser = async (me: AppUserQueryResponse['me']): Promise<void> => {
    if (!me) return;
    await initializeEThree(me.id);
    setUser(me as User);
    setLoading(false);
    SplashModule.hide(300);
  };

  useEffect(() => {
    fetchQuery<AppUserQuery>(environment, meQuery, {}).subscribe({
      start: () => {
        setLoading(true);
      },
      error: (error: any) => {
        console.log('error', error);
        setLoading(false);
        SplashModule.hide(300);
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

  if (loading) return <LoadingIndicator />;

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
