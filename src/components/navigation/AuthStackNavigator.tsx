import React, { ReactElement, useEffect } from 'react';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import { CompositeNavigationProp } from '@react-navigation/native';
import FindPw from '../screen/FindPw';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import VerifyEmail from '../screen/VerifyEmail';
import { getString } from '../../../STRINGS';
import { useThemeContext } from '@dooboo-ui/native-theme';

export type AuthStackParamList = {
  default: undefined;
  SignIn: undefined;
  SignUp: undefined;
  FindPw: undefined;
  VerifyEmail: {
    email: string;
  };
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
        title: getString('SIGN_UP'),
      }} />
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
    </Stack.Navigator>
  );
}

export default AuthNavigator;
