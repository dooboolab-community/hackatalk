import * as Device from 'expo-device';

import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { AuthProvider, useAuthContext } from './providers/AuthProvider';
import { DeviceProvider, useDeviceContext } from './providers/DeviceProvider';
import React, { useEffect } from 'react';
import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from './theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-community/async-storage';
import { QUERY_ME } from './graphql/queries';
import RootNavigator from './components/navigation/RootStackNavigator';
import SplashScreen from 'react-native-splash-screen';
import { User } from './types';
import client from './apollo/Client';
import styled from 'styled-components/native';

const ErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.Text`
  color: ${({ theme }): string => theme.error};
  font-size: 16px;
`;

function App(): React.ReactElement {
  const colorScheme = useColorScheme();

  const { setUser } = useAuthContext();
  const { setDeviceType } = useDeviceContext();

  const { loading, data, error } = useQuery<{ me: User}, {}>(QUERY_ME);

  const setDevice = async (): Promise<void> => {
    const deviceType = await Device.getDeviceTypeAsync();
    setDeviceType(deviceType);
  };

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    } else if (data) {
      AsyncStorage.removeItem('token');
    }
    setDevice();

    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  if (error) {
    return <ErrorContainer>
      <ErrorText>{error.graphQLErrors && error.graphQLErrors[0]?.message}</ErrorText>
    </ErrorContainer>;
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
