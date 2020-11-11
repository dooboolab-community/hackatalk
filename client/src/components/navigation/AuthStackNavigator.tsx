import React, { ReactElement } from 'react';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import { CompositeNavigationProp } from '@react-navigation/native';
import FindPw from '../screen/FindPw';
import LicenseAgreement from '../screen/LicenseAgreement';
import { RootStackNavigationProps } from './RootStackNavigator';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import VerifyEmail from '../screen/VerifyEmail';
import { fbt } from 'fbt';
import { useThemeContext } from '@dooboo-ui/theme';

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
  const { theme } = useThemeContext();

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: theme.fontColor,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{
        title: fbt('Sign Up', 'sign up'),
      }} />
      <Stack.Screen
        name="FindPw"
        component={FindPw}
        options={{
          title: fbt('Find Password', 'find password'),
        }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{
          title: fbt('Verify Email', 'verify email'),
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
