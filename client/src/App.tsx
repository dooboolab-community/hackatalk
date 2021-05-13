import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import {Alert, Image, View} from 'react-native';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {AuthProvider, useAuthContext} from './providers/AuthProvider';
import {LoadingIndicator, ThemeProvider, ThemeType} from 'dooboo-ui';
import React, {
  FC,
  ReactElement,
  ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import {RelayEnvironmentProvider, graphql, useLazyLoadQuery} from 'react-relay';
import {dark, light} from './theme';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import type {AppUserQuery} from './__generated__/AppUserQuery.graphql';
import {Asset} from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ComponentWrapper from './utils/ComponentWrapper';
import {DeviceProvider} from './providers/DeviceProvider';
import Icons from './utils/Icons';
import RootNavigator from './components/navigations/RootStackNavigator';
import {User} from './types/graphql';
import {getString} from '../STRINGS';
import {registerForPushNotificationsAsync} from './utils/noti';
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
        socialId
        authType
      }
    }
  }
`;

function cacheImages(images: (number | string)[]): any[] {
  return images.map((image) => {
    if (typeof image === 'string') return Image.prefetch(image);
    else return Asset.fromModule(image as number).downloadAsync();
  });
}

const prepareAutoHide = async (): Promise<void> => {
  try {
    await SplashScreen.preventAutoHideAsync();
  } catch (e) {
    console.warn(e);
  }
};

function App(): ReactElement {
  const [assetLoaded, setAssetLoaded] = useState<boolean>(false);
  const authRef = useRef(useAuthContext());

  const loadAssetsAsync = async (): Promise<void> => {
    const imageAssets = cacheImages(Icons);

    await Promise.all([...imageAssets]);

    setAssetLoaded(true);
  };

  const {me} = useLazyLoadQuery<AppUserQuery>(meQuery, {});

  const hideSplashScreenThenRegisterNotification = async (): Promise<void> => {
    await SplashScreen.hideAsync();

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

  useEffect(() => {
    if (me === null) {
      AsyncStorage.removeItem('token');

      return;
    }

    authRef.current?.setUser(me as User);
  }, [me]);

  if (!assetLoaded) return <View />;

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
  .wrap(Suspense, {fallback: <LoadingIndicator />})
  .wrap(RelayEnvironmentProvider, {environment: relayEnvironment})
  .wrap(AuthProvider, {})
  .wrap(DeviceProvider, {})
  .wrap(HackatalkThemeProvider, {})
  .wrap(AppearanceProvider, {})
  .build();

export default WrappedApp;
