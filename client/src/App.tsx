import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';

import {Alert, Platform} from 'react-native';
import type {FC, ReactElement, ReactNode} from 'react';
import FallbackComponent, {handleError} from './utils/error';
import React, {useEffect} from 'react';
import {dark, light} from './theme';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from './providers/AuthProvider';
import ComponentWrapper from './utils/ComponentWrapper';
import {DeviceProvider} from './providers/DeviceProvider';
import ErrorBoundary from 'react-native-error-boundary';
import Icons from './utils/Icons';
import {RelayEnvironmentProvider} from 'react-relay';
import RootNavigator from './components/navigations/RootStackNavigator';
import {SnackbarProvider} from './providers/SnackbarProvider';
import {ThemeProvider} from 'dooboo-ui';
import {createRelayEnvironment} from './relay';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
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

if (!__DEV__) {
  SplashScreen.preventAutoHideAsync();
}

const HackaTalkThemeProvider: FC<{children: ReactElement}> = ({children}) => {
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

  const checkUpdate = async (): Promise<void> => {
    if (Platform.OS !== 'web') {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();

        Alert.alert(getString('APP_UPDATE'), getString('APP_UPDATE_DESC'), [
          {
            text: getString('NO'),
            style: 'cancel',
          },
          {text: getString('YES'), onPress: () => Updates.reloadAsync()},
        ]);
      }
    }
  };

  const [assets] = useAssets(Icons);

  const [dooboouiAssets] = useFonts({
    IcoMoon: require('dooboo-ui/components/Icon/doobooui.ttf'),
  });

  useEffect(() => {
    if (assets && dooboouiAssets) {
      registerNotification();
      if (!__DEV__) {
        checkUpdate();
      }

      SplashScreen.hideAsync();
    }
  }, [assets, dooboouiAssets]);

  if (!assets || !dooboouiAssets) {
    return null;
  }

  return (
    <ThemeProvider
      customTheme={{
        light,
        dark,
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
  // @ts-ignore
  .wrap(ErrorBoundary, {
    onError: handleError,
    FallbackComponent,
  })
  .wrap(DeviceProvider, {})
  .wrap(SnackbarProvider, {})
  .wrap(HackaTalkThemeProvider, {})
  .build();

export default gestureHandlerRootHOC(WrappedApp);
