import * as Linking from 'expo-linking';

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
import WebView from '../pages/WebView';
import linking from './linking';
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

const prefix = Linking.createURL('/');

function RootNavigator({queryReference}: Props): React.ReactElement {
  const {theme} = useTheme();

  const {me} = usePreloadedQuery<AuthProviderMeQuery>(meQuery, queryReference);

  const {user, setUser} = useAuthContext();

  useEffect(() => (!me ? setUser(null) : setUser(me)), [me, setUser]);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={Platform.select({
          web: linking,
          ios: {prefixes: [prefix]},
          android: {prefixes: [prefix]},
        })}
        theme={{
          colors: {
            background: theme.background,
            border: theme.disabled,
            card: theme.paper,
            primary: theme.primary,
            notification: theme.primary,
            text: theme.text,
          },
          dark: true,
        }}
      >
        <Stack.Navigator
          initialRouteName="AuthStack"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTitleStyle: {color: theme.text},
            headerTintColor: theme.primary,
            headerShown: false,
          }}
        >
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

const RootNavigatorWrapper: FC = () => {
  const {user, loadMeQuery, meQueryReference} = useAuthContext();
  const {theme} = useTheme();

  useEffect(() => {
    if (!user) {
      loadMeQuery({});
    }
  }, [loadMeQuery, user]);

  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: theme.background,
      }}
    >
      <Suspense fallback={<CustomLoadingIndicator />}>
        {meQueryReference && (
          <RootNavigator queryReference={meQueryReference} />
        )}
      </Suspense>
    </View>
  );
};

export default RootNavigatorWrapper;
