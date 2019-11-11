import AuthStack from './AuthStackNavigator';
import MainStack from './MainStackNavigator';
import { NavigationNativeContainer } from '@react-navigation/native';
import NotFound from '../screen/NotFound';
import { ProfileModalProvider } from '../../providers/ProfileModalProvider';
import React from 'react';
import { ScreenProps } from '../../types';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function RootNavigator({
  screenProps,
}: {
  screenProps: ScreenProps;
}): React.ReactElement {
  const { theme } = screenProps;
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
          header: null,
        }}
      >
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

export default RootNavigator;
