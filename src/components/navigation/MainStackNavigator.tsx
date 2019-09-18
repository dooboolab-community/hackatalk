import { Image, TouchableOpacity, View } from 'react-native';
import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { SvgNoProfile, SvgPlus } from '../../utils/Icons';

import Chat from '../screen/Chat';
import { ProfileModalProvider } from '../../providers/ProfileModalProvider';
import ProfileUpdate from '../screen/ProfileUpdate';
import React from 'react';
import { ScreenProps } from './SwitchNavigator';
import SearchUser from '../screen/SearchUser';
import StatusBar from '../shared/StatusBar';
import { createStackNavigator } from 'react-navigation-stack';
import { getString } from '../../../STRINGS';
import { withTheme } from 'styled-components';

const routeConfig = {
  Main: {
    screen: MainTabNavigator,
    navigationOptions: MainTabNavigationOptions,
  },
  ProfileUpdate: {
    screen: ProfileUpdate,
    navigationOptions: ({
      screenProps,
      navigation,
    }: {
      screenProps: ScreenProps;
      navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    }) => {
      const { theme } = screenProps;
      return {
        title: getString('MY_PROFILE'),
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.btnPrimary,
        },
        headerTitleStyle: {
          color: theme.fontColor,
        },
        headerRight: (
          <View
            style={{
              marginRight: 16,
            }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
              <SvgPlus width={20} />
            </TouchableOpacity>
          </View>
        ),
      };
    },
  },
  SearchUser: {
    screen: SearchUser,
    navigationOptions: ({ screenProps }: { screenProps: ScreenProps }) => {
      const { theme } = screenProps;
      return {
        title: 'Search User',
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.btnPrimary,
        },
        headerTitleStyle: {
          color: theme.fontColor,
        },
      };
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ screenProps }: { screenProps: ScreenProps }) => {
      const { theme } = screenProps;
      return {
        title: getString('CHAT'),
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.btnPrimary,
        },
        headerTitleStyle: {
          color: theme.fontColor,
        },
      };
    },
  },
};

const navigatorConfig = {
  initialRouteName: 'Main',
  gesturesEnabled: true,
  // transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
};

const MainStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

class RootNavigator extends React.Component<any, any> {
  private static router = MainStackNavigator.router;

  public render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <StatusBar />
        <ProfileModalProvider navigation={this.props.navigation}>
          <MainStackNavigator
            navigation={this.props.navigation}
            screenProps={{ theme: this.props.theme }}
          />
        </ProfileModalProvider>
      </View>
    );
  }
}

export default withTheme(RootNavigator);
