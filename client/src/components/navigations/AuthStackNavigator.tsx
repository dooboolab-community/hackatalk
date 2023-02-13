import * as SplashScreen from 'expo-splash-screen';

import React, {useCallback, useEffect} from 'react';

import type {CompositeNavigationProp} from '@react-navigation/native';
import FindPw from '../pages/FindPw';
import LicenseAgreement from '../pages/LicenseAgreement';
import type {ReactElement} from 'react';
import type {RootStackNavigationProps} from './RootStackNavigator';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import type {StackNavigationProp} from '@react-navigation/stack';
import VerifyEmail from '../pages/VerifyEmail';
import {createStackNavigator} from '@react-navigation/stack';
import {getString} from '../../../STRINGS';
import {useDooboo} from 'dooboo-ui';

export type AuthStackParamList = {
  default: undefined;
  SignIn: undefined;
  SignUp: undefined;
  FindPw: undefined;
  VerifyEmail: {
    email: string;
  };
  LicenseAgreement: undefined;
};

type NavigationProps<T extends keyof AuthStackParamList = 'default'> =
  StackNavigationProp<AuthStackParamList, T>;

export type AuthStackNavigationProps<
  T extends keyof AuthStackParamList = 'default',
> = CompositeNavigationProp<
  NavigationProps<T>,
  RootStackNavigationProps<'AuthStack'>
>;

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigator(): ReactElement {
  const {theme} = useDooboo();

  const hideSplashScreenAsync = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    hideSplashScreenAsync();
  }, [hideSplashScreenAsync]);

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.bg.basic,
          borderBottomWidth: 0,
          elevation: 0,
        },
        cardStyle: {
          backgroundColor: theme.bg.basic,
        },
        headerTintColor: theme.text.basic,
        headerBackTitle: getString('BACK'),
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: getString('SIGN_UP'),
        }}
      />
      <Stack.Screen
        name="FindPw"
        component={FindPw}
        options={{
          title: getString('FIND_PW'),
        }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{
          title: getString('VERIFY_EMAIL'),
        }}
      />
      <Stack.Screen
        name="LicenseAgreement"
        component={LicenseAgreement}
        options={{
          title: getString('LICENSE_AGREEMENT'),
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
