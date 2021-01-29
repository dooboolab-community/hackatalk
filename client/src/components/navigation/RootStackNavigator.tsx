import './GestureHandler';

import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import Intro from '../screen/Intro';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Temp from '../screen/Temp';
import {useTheme} from '../../providers/ThemeProvider';

export type RootStackParamList = {
  Intro: undefined;
  Temp: {param: string};
};

export type RootStackNavigationProps<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.ReactElement {
  const {theme} = useTheme();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: theme.background,
          border: theme.disabled,
          card: theme.paper,
          primary: theme.link,
          notification: theme.disabled,
          text: theme.text,
        },
        dark: true,
      }}>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: {color: theme.text},
          headerTintColor: theme.heading,
        }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Temp" component={Temp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
