import React from 'react';
import { createStackNavigator } from 'react-navigation';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import FindPw from '../screen/FindPw';
import Setting from '../screen/Setting';
import { getString } from '../../../STRINGS';

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ screenProps }) => {
        const { theme } = screenProps;
        return {
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 0,
          },
        };
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: ({ screenProps }) => {
        const { theme } = screenProps;
        return {
          title: getString('SIGNUP'),
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: theme.colors.title,
          },
        };
      },
    },
    FindPw: {
      screen: FindPw,
      navigationOptions: ({ screenProps }) => {
        const { theme } = screenProps;
        return {
          title: getString('FIND_PW'),
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: theme.colors.title,
          },
        };
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: ({ screenProps }) => {
        const { theme } = screenProps;
        return {
          title: getString('SETTING'),
          headerStyle: {
            backgroundColor: theme.colors.background,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: theme.colors.title,
          },
        };
      },
    },
  },
  {
    initialRouteName: 'Login',
    // transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
  },
);

export default StackNavigator;
