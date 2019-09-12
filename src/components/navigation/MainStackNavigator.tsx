import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import { TouchableOpacity, View } from 'react-native';

import Chat from '../screen/Chat';
import Icon5 from '@expo/vector-icons/FontAwesome5';
import { ProfileModalProvider } from '../../providers/ProfileModalProvider';
import ProfileUpdate from '../screen/ProfileUpdate';
import React from 'react';
import SearchUser from '../screen/SearchUser';
import StatusBar from '../shared/StatusBar';
import { createStackNavigator } from 'react-navigation-stack';
import { getString } from '../../../STRINGS';
// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { withTheme } from 'styled-components';

const routeConfig = {
  Main: {
    screen: MainTabNavigator,
    navigationOptions: MainTabNavigationOptions,
  },
  ProfileUpdate: {
    screen: ProfileUpdate,
    navigationOptions: ({ navigation, screenProps }) => {
      const { theme } = screenProps;
      return {
        title: getString('MY_PROFILE'),
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        headerTitleStyle: {
          color: theme.colors.title,
        },
        headerRight: (
          <View
            style={{
              marginRight: 16,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Setting')}
            >
              <Icon5
                name='cog'
                size={20}
                color={theme.colors.dodgerBlue}
                light={true}
              />
            </TouchableOpacity>
          </View>
        ),
      };
    },
  },
  SearchUser: {
    screen: SearchUser,
    navigationOptions: ({ screenProps }) => {
      const { theme } = screenProps;
      return {
        title: 'Search User',
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        headerTitleStyle: {
          color: theme.colors.title,
        },
      };
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ screenProps }) => {
      const { theme } = screenProps;
      return {
        title: getString('CHAT'),
        headerStyle: {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.border,
        },
        headerTitleStyle: {
          color: theme.colors.title,
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
        <StatusBar isDarkContent={true} />
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
