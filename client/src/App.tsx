import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import {Alert, Image} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {LoadingIndicator, ThemeProvider, ThemeType} from 'dooboo-ui';
import React, {
  FC,
  ReactElement,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from 'react';
import {dark, light} from './theme';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import AppLoading from 'expo-app-loading';
import {Asset} from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './providers/AuthProvider';
import ComponentWrapper from './utils/ComponentWrapper';
import {DeviceProvider} from './providers/DeviceProvider';
import Icons from './utils/Icons';
import {ResettableRelayProvider} from './providers/ResettableProvider';
import RootNavigator from './components/navigations/RootStackNavigator';
import {createRelayEnvironment} from './relay';
import {getString} from '../STRINGS';
import {registerForPushNotificationsAsync} from './utils/noti';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function cacheImages(images: (number | string)[]): any[] {
  return images.map((image) => {
    if (typeof image === 'string') return Image.prefetch(image);
    else return Asset.fromModule(image as number).downloadAsync();
  });
}

const prepareAutoHide = async (): Promise<void> => {
  await SplashScreen.preventAutoHideAsync();
};

function App(): ReactElement {
  const [assetLoaded, setAssetLoaded] = useState<boolean>(false);

  const loadAssetsAsync = async (): Promise<void> => {
    const imageAssets = cacheImages(Icons);

    await Promise.all([...imageAssets]);

    setAssetLoaded(true);
  };

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

  useEffect(() => {
    if (!assetLoaded) {
      SplashScreen.preventAutoHideAsync();
      loadAssetsAsync();
    } else hideSplashScreenThenRegisterNotification();
  }, [assetLoaded]);

  if (!assetLoaded)
    return <AppLoading autoHideSplash={false} onError={console.warn} />;

  return <RootNavigator />;
}

const HackatalkThemeProvider: FC<{children: ReactElement}> = ({children}) => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    prepareAutoHide();
  }, []);

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
const WrappedApp = new ComponentWrapper(App)
  .wrap(ActionSheetProviderWithChildren, {})
  .wrap(AuthProvider, {})
  .wrap(Suspense, {fallback: <LoadingIndicator />})
  .wrap(ResettableRelayProvider, {createRelayEnvironment})
  .wrap(DeviceProvider, {})
  .wrap(HackatalkThemeProvider, {})
  .wrap(AppearanceProvider, {})
  .build();

export default WrappedApp;
