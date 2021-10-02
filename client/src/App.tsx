import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import React, {FC, ReactElement, ReactNode, useEffect} from 'react';
import {dark, light} from './theme';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {Alert} from 'react-native';
import AppLoading from 'expo-app-loading';
import {AppearanceProvider} from 'react-native-appearance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './providers/AuthProvider';
import ComponentWrapper from './utils/ComponentWrapper';
import {DeviceProvider} from './providers/DeviceProvider';
import Icons from './utils/Icons';
import {RelayEnvironmentProvider} from 'react-relay';
import RootNavigator from './components/navigations/RootStackNavigator';
import {SnackbarProvider} from './providers/SnackbarProvider';
import {ThemeProvider} from 'dooboo-ui';
import {createRelayEnvironment} from './relay';
import {getString} from '../STRINGS';
import {registerForPushNotificationsAsync} from './utils/noti';
import {useAssets} from 'expo-asset';
import {useFonts} from 'expo-font';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

const HackatalkThemeProvider: FC<{children: ReactElement}> = ({children}) => {
  const registerNotification = async (): Promise<void> => {
    registerForPushNotificationsAsync()
      .then((pushToken) => {
        if (pushToken) {
          AsyncStorage.setItem('push_token', pushToken);

          return;
        }

        Alert.alert(
          getString('WARNING'),
          getString('NOTIFICATION_TOKEN_NOT_VALID'),
        );
      })
      .catch((): void => {
        Alert.alert(
          getString('ERROR'),
          getString('NOTIFICATION_TOKEN_NOT_VALID'),
        );
      });
  };

  const [assets] = useAssets(Icons);

  const [dooboouiAssets] = useFonts({
    IcoMoon: require('dooboo-ui/Icon/doobooui.ttf'),
  });

  useEffect(() => {
    if (assets && dooboouiAssets) registerNotification();
  }, [assets, dooboouiAssets]);

  if (!assets || !dooboouiAssets)
    return <AppLoading autoHideSplash={false} onError={console.warn} />;

  return (
    <ThemeProvider
      customTheme={{
        light: {
          ...light,
        },
        dark: {
          ...dark,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

function ActionSheetProviderWithChildren(props: {
  children: ReactNode;
}): ReactElement {
  return <ActionSheetProvider>{props.children}</ActionSheetProvider>;
}

const environment = createRelayEnvironment();

// Add all required providers for App.
const WrappedApp = new ComponentWrapper(RootNavigator)
  .wrap(ActionSheetProviderWithChildren, {})
  .wrap(AuthProvider, {})
  .wrap(RelayEnvironmentProvider, {environment})
  .wrap(DeviceProvider, {})
  .wrap(SnackbarProvider, {})
  .wrap(HackatalkThemeProvider, {})
  .wrap(AppearanceProvider, {})
  .build();

export default WrappedApp;
