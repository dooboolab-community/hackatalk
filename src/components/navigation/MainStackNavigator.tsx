import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { PureComponent, ReactElement } from 'react';

import Chat from '../screen/Chat';
import ProfileModal from '../shared/ProfileModal';
import ProfileUpdate from '../screen/ProfileUpdate';
import { ScreenProps } from './SwitchNavigator';
import SearchUser from '../screen/SearchUser';
import { StateContext } from '../../contexts';
import StatusBar from '../shared/StatusBar';
import { createStackNavigator } from 'react-navigation-stack';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

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
        headerTintColor: theme.fontColor,
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
        title: getString('SEARCH_USER'),
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.primaryLight,
        },
        headerTitleStyle: {
          color: theme.fontColor,
        },
        headerTintColor: theme.fontColor,
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
        headerTintColor: theme.fontColor,
      };
    },
  },
};

const navigatorConfig = {
  initialRouteName: 'Main',
  gesturesEnabled: true,
  // transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
};

const MainStackNavigator = createStackNavigator(
  routeConfig as any,
  navigatorConfig,
);

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  screenProps: ScreenProps;
}

const MainWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

export default class RootNavigator extends PureComponent<Props> {
  private static router = MainStackNavigator.router;
  public static contextType = StateContext;

  public render(): ReactElement {
    const { navigation, screenProps } = this.props;
    const [
      {
        profileModal: { modal },
      },
    ] = this.context;
    return (
      <MainWrapper>
        <StatusBar />
        <MainStackNavigator navigation={navigation} screenProps={screenProps} />
        <ProfileModal
          testID="modal"
          ref={modal}
          onChatPressed={(): void => {
            if (modal && modal.current) {
              modal.current.close();
            }
            navigation.navigate('Chat');
          }}
        />
      </MainWrapper>
    );
  }
}
