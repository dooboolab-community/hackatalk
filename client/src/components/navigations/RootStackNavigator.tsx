import * as SplashScreen from 'expo-splash-screen';

import AuthStack, {AuthStackParamList} from './AuthStackNavigator';
import MainStack, {MainStackParamList} from './MainStackNavigator';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {Platform, View} from 'react-native';
import {PreloadedQuery, usePreloadedQuery} from 'react-relay';
import React, {FC, Suspense, useEffect} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {meQuery, useAuthContext} from '../../providers/AuthProvider';

import {AuthProviderMeQuery} from '../../__generated__/AuthProviderMeQuery.graphql';
import CustomLoadingIndicator from '../uis/CustomLoadingIndicator';
import ImageSlider from '../pages/ImageSlider';
import NotFound from '../pages/NotFound';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SnackbarProvider} from '@dooboo-ui/snackbar';
import WebView from '../pages/WebView';
import {useTheme} from 'dooboo-ui';

export type RootStackParamList = {
  default: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
  WebView: {
    uri: string;
  };
  ImageSlider: {
    images: {uri: string | null; sender?: string | null}[];
    initialIndex?: number;
  };
  NotFound: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default',
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  queryReference: PreloadedQuery<AuthProviderMeQuery, Record<string, unknown>>;
};

function RootNavigator({queryReference}: Props): React.ReactElement {
  const {theme} = useTheme();

  const linking = {
    prefixes: ['https://hackatalk.dev', 'hackatalk://'],
    enabled: true,
  };

  const {me} = usePreloadedQuery<AuthProviderMeQuery>(meQuery, queryReference);

  const {user, setUser} = useAuthContext();

  const hideSplash = async (): Promise<void> => {
    try {
      await SplashScreen.hideAsync();
    } catch (err) {
      // err
    }
  };

  useEffect(() => {
    if (!me) {
      hideSplash();
      setUser(null);

      return;
    }

    hideSplash();

    setUser(me);
  }, [me, setUser]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={Platform.select({
          web: linking,
        })}
        theme={{
          colors: {
            background: theme.background,
            border: theme.disabled,
            card: theme.itemBackground,
            primary: theme.primary,
            notification: theme.tintColor,
            text: theme.text,
          },
          dark: true,
        }}>
        <Stack.Navigator
          initialRouteName="AuthStack"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTitleStyle: {color: theme.text},
            headerTintColor: theme.tintColor,
            headerShown: false,
          }}>
          {!user || !user.verified ? (
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{
                gestureDirection: Platform.select({
                  ios: !user ? 'horizontal-inverted' : 'horizontal',
                  default: !user ? 'vertical-inverted' : 'vertical',
                }),
              }}
            />
          ) : (
            <Stack.Screen
              name="MainStack"
              component={MainStack}
              options={{
                gestureDirection: Platform.select({
                  ios: !user ? 'horizontal-inverted' : 'horizontal',
                  default: !user ? 'vertical-inverted' : 'vertical',
                }),
              }}
            />
          )}
          <Stack.Screen
            name="WebView"
            component={WebView}
            options={{
              headerShown: true,
              headerTitle: '',
              headerBackTitle: '',
            }}
          />
          <Stack.Screen
            name="ImageSlider"
            component={ImageSlider}
            options={({
              route: {
                params: {images, initialIndex = 0},
              },
            }) => ({
              headerShown: true,
              headerBackTitle: images[initialIndex]?.sender || '',
              headerTitle: '',
              headerTransparent: true,
            })}
          />
          <Stack.Screen name="NotFound" component={NotFound} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function AuthNavigatorOnly(): React.ReactElement {
  const {theme} = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          colors: {
            background: theme.background,
            border: theme.background,
            card: theme.background,
            primary: theme.primary,
            notification: theme.primary,
            text: theme.primary,
          },
          dark: true,
        }}>
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const RootNavigatorWrapper: FC = () => {
  const {user, loadMeQuery, meQueryReference} = useAuthContext();
  const {theme} = useTheme();

  useEffect(() => {
    if (!user) loadMeQuery({});
  }, [loadMeQuery, user]);

  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: theme.background,
      }}>
      <Suspense fallback={<CustomLoadingIndicator />}>
        {meQueryReference ? (
          <SnackbarProvider>
            <RootNavigator queryReference={meQueryReference} />
          </SnackbarProvider>
        ) : (
          <AuthNavigatorOnly />
        )}
      </Suspense>
    </View>
  );
};

export default RootNavigatorWrapper;
