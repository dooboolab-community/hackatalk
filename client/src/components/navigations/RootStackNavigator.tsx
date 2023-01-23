import * as Linking from 'expo-linking';

import {Platform, View} from 'react-native';
import React, {Suspense, useEffect} from 'react';
import {meQuery, useAuthContext} from '../../providers/AuthProvider';

import type {AuthProviderMeQuery} from '../../__generated__/AuthProviderMeQuery.graphql';
import AuthStack from './AuthStackNavigator';
import type {AuthStackParamList} from './AuthStackNavigator';
import CustomLoadingIndicator from '../uis/CustomLoadingIndicator';
import type {FC} from 'react';
import ImageSlider from '../pages/ImageSlider';
import MainStack from './MainStackNavigator';
import type {MainStackParamList} from './MainStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import type {NavigatorScreenParams} from '@react-navigation/native';
import NotFound from '../pages/NotFound';
import type {PreloadedQuery} from 'react-relay';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import type {StackNavigationProp} from '@react-navigation/stack';
import WebView from '../pages/WebView';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import linking from './linking';
import {usePreloadedQuery} from 'react-relay';
import {useTheme} from 'dooboo-ui';

export type RootStackParamList = {
  default: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
  WebView: {uri: string};
  ImageSlider: {
    images: {uri: string | null; sender?: string | null}[];
    initialIndex?: number;
  };
  NotFound: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default',
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createSharedElementStackNavigator<RootStackParamList>();

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
            background: theme.bg.basic,
            border: theme.text.disabled,
            card: theme.bg.paper,
            primary: theme.role.primary,
            notification: theme.role.primary,
            text: theme.text.basic,
          },
          dark: true,
        }}
      >
        <Stack.Navigator
          initialRouteName="AuthStack"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.bg.basic,
            },
            headerTitleStyle: {color: theme.text.basic},
            headerTintColor: theme.role.primary,
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
            sharedElements={(route) => {
              const {images, initialIndex = 0} = route.params;

              return [
                {
                  id: `${images[initialIndex]?.uri}`,
                  animation: 'move',
                  resize: 'clip',
                  align: 'center-center',
                },
              ];
            }}
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
        backgroundColor: theme.bg.basic,
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
