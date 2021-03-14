import React, {ReactElement} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import {CompositeNavigationProp} from '@react-navigation/native';
import FindPw from '../pages/FindPw';
import LicenseAgreement from '../pages/LicenseAgreement';
import {RootStackNavigationProps} from './RootStackNavigator';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import VerifyEmail from '../pages/VerifyEmail';
import {fbt} from 'fbt';
import {useTheme} from 'dooboo-ui';

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

type NavigationProps<
  T extends keyof AuthStackParamList = 'default'
> = StackNavigationProp<AuthStackParamList, T>;

export type AuthStackNavigationProps<
  T extends keyof AuthStackParamList = 'default'
> = CompositeNavigationProp<
  NavigationProps<T>,
  RootStackNavigationProps<'AuthStack'>
>;

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigator(): ReactElement {
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: theme.text,
      }}>
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
          title: fbt('회원가입', 'sign up').toString(),
        }}
      />
      <Stack.Screen
        name="FindPw"
        component={FindPw}
        options={{
          title: fbt('비밀번호 찾기', 'find password').toString(),
        }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{
          title: fbt('이메일 인증', 'verify email').toString(),
        }}
      />
      <Stack.Screen
        name="LicenseAgreement"
        component={LicenseAgreement}
        options={{
          title: fbt('라이센스 계약', 'license agreement').toString(),
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
