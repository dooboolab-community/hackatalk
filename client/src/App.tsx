import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import React, {FC, ReactElement, ReactNode, Suspense, useEffect} from 'react';
import {ThemeProvider, ThemeType} from 'dooboo-ui';
import {dark, light} from './theme';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {Alert} from 'react-native';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './providers/AuthProvider';
import ComponentWrapper from './utils/ComponentWrapper';
import CustomLoadingIndicator from './components/uis/CustomLoadingIndicator';
import {DeviceProvider} from './providers/DeviceProvider';
import Icons from './utils/Icons';
import {ResettableRelayProvider} from './providers/ResettableProvider';
import RootNavigator from './components/navigations/RootStackNavigator';
import {createRelayEnvironment} from './relay';
import {getString} from '../STRINGS';
import {registerForPushNotificationsAsync} from './utils/noti';
import {useAssets} from 'expo-asset';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

const HackatalkThemeProvider: FC<{children: ReactElement}> = ({children}) => {
  const colorScheme = useColorScheme();

  const hideSplashScreenThenRegisterNotification = async (): Promise<void> => {
    try {
      await SplashScreen.hideAsync();
    } catch (err) {
      // console.log('hide splash', err);
    }

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

  useEffect(() => {
    if (assets) hideSplashScreenThenRegisterNotification();
  }, [assets]);

  if (!assets)
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
      initialThemeType={
        colorScheme === 'dark' ? ThemeType.DARK : ThemeType.LIGHT
      }>
      {children}
    </ThemeProvider>
  );
};

function ActionSheetProviderWithChildren(props: {
  children: ReactNode;
}): ReactElement {
  return <ActionSheetProvider>{props.children}</ActionSheetProvider>;
}

// Add all required providers for App.
const WrappedApp = new ComponentWrapper(RootNavigator)
  .wrap(ActionSheetProviderWithChildren, {})
  .wrap(AuthProvider, {})
  .wrap(Suspense, {fallback: <CustomLoadingIndicator />})
  .wrap(ResettableRelayProvider, {createRelayEnvironment})
  .wrap(DeviceProvider, {})
  .wrap(HackatalkThemeProvider, {})
  .wrap(AppearanceProvider, {})
  .build();

export default WrappedApp;
