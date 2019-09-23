import { Image, TouchableOpacity, View } from 'react-native';
import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import Chat from '../screen/Chat';
import { Ionicons } from '@expo/vector-icons';
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
    }: {
      screenProps: ScreenProps;
      navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    }): object => {
      const { theme } = screenProps;
      return {
        title: getString('MY_PROFILE'),
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.primaryLight,
        },
        headerTitleStyle: {
          color: theme.fontColor,
        },
      };
    },
  },
  SearchUser: {
    screen: SearchUser,
    navigationOptions: ({
      screenProps,
    }: {
      screenProps: ScreenProps;
    }): object => {
      const { theme } = screenProps;
      return {
        title: 'Search User',
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.primaryLight,
        },
        headerTitleStyle: {
          color: theme.fontColor,
        },
      };
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({
      screenProps,
    }: {
      screenProps: ScreenProps;
    }): object => {
      const { theme } = screenProps;
      return {
        title: getString('CHAT'),
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.primaryLight,
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

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  screenProps: ScreenProps;
}

class RootNavigator extends React.Component<Props> {
  private static router = MainStackNavigator.router;

  public render(): React.ReactElement {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <StatusBar />
        <ProfileModalProvider navigation={this.props.navigation}>
          <MainStackNavigator
            navigation={this.props.navigation}
            screenProps={{
              theme: this.props.screenProps.theme,
              changeTheme: this.props.screenProps.changeTheme,
            }}
          />
        </ProfileModalProvider>
      </View>
    );
  }
}

export default RootNavigator;
