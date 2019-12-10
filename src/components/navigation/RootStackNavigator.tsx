import AuthStack from './AuthStackNavigator';
import ChangePW from '../screen/ChangePW';
import MainStack from './MainStackNavigator';
import { NavigationNativeContainer } from '@react-navigation/native';
import NotFound from '../screen/NotFound';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Stack = createStackNavigator();

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
        <Stack.Screen name="ChangePW" component={ChangePW} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

export default RootNavigator;
