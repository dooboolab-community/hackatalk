import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStackNavigator';
import MainStack from './MainStackNavigator';
import { NavigationNativeContainer } from '@react-navigation/native';
import NotFound from '../screen/NotFound';
import React from 'react';
import WebView from '../screen/WebView';
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
  return (
    <NavigationNativeContainer>
      <Stack.Navigator
        initialRouteName="AuthStack"
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
