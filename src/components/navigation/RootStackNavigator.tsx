import { NavigationComponent, NavigationRouteConfig } from 'react-navigation';
import Intro from '../screen/Intro';
import React from 'react';

import { ScreenProps } from './SwitchNavigator';
import Temp from '../screen/Temp';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { getString } from '../../../STRINGS';

const routeConfig: NavigationRouteConfig = {
  Intro: {
    screen: Intro,
    navigationOptions: ({
      navigation,
      screenProps,
    }: {
      navigation: NavigationComponent;
      screenProps: ScreenProps;
    }) => {
      const { theme } = screenProps;
      return {
        title: getString(navigation.state.routeName.toUpperCase()),
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: { color: theme.fontColor },
        headerTintColor: theme.tintColor,
      };
    },
    path: 'intro',
  },
  Temp: {
    screen: Temp,
    navigationOptions: ({
      navigation,
      screenProps,
    }: {
      navigation: any;
      screenProps: any;
    }) => {
      const { theme } = screenProps;
      return {
        headerTitle: (
          <Text
            style={{
              fontSize: 18,
              color: theme.fontColor,
            }}
          >
            {getString(navigation.state.routeName.toUpperCase())}
          </Text>
        ),
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: { color: theme.fontColor },
        headerTintColor: theme.tintColor,
      };
    },
    path: 'temp',
  },
};

const navigatorConfig = {
  initialRouteName: 'Intro',
  // mode: 'card',
  // headerMode: 'screen',
  // headerMode: 'none',
};

const RootStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

export default RootStackNavigator;
