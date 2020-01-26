import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStackNavigator';
import { LoadingIndicator } from '@dooboo-ui/native';
import MainStack from './MainStackNavigator';
import { NavigationNativeContainer } from '@react-navigation/native';
import NotFound from '../screen/NotFound';
import { QUERY_ME } from '../../graphql/queries';
import React from 'react';
import { User } from '../../types';
import WebView from '../screen/WebView';
import { useQuery } from '@apollo/react-hooks';
import { useThemeContext } from '@dooboo-ui/native-theme';

export type RootStackParamList = {
  default: undefined;
  AuthStack: undefined;
  MainStack: undefined;
  WebView: {
    uri: string;
  };
  NotFound: undefined;
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList = 'default'
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const { theme } = useThemeContext();
  const { loading, error, data } = useQuery<Partial<User>, {}>(QUERY_ME);

  if (loading) {
    return (
      <LoadingIndicator containerStyle={{
        backgroundColor: theme.background,
      }}/>
    );
  }

  return (
    <NavigationNativeContainer>
      <Stack.Navigator
        initialRouteName={!data || error ? 'AuthStack' : 'MainStack'}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: { color: theme.fontColor },
          headerTintColor: theme.tintColor,
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
        <Stack.Screen name="WebView" component={WebView}
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

export default RootNavigator;
