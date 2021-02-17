import React, {ReactElement} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import {CompositeNavigationProp} from '@react-navigation/native';
import FindPwContainer from '../pages/FindPwContainer';
import LicenseAgreementContainer from '../pages/LicenseAgreementContainer';
import {RootStackNavigationProps} from './RootStackNavigator';
import SignInContainer from '../pages/SignInContainer';
import SignUp from '../pages/SignUp';
import VerifyEmail from '../pages/VerifyEmail';
import {getString} from '../../../STRINGS';
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
        component={SignInContainer}
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
        component={FindPwContainer}
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
        component={LicenseAgreementContainer}
        options={{
          title: getString('LICENSE_AGREEMENT'),
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
