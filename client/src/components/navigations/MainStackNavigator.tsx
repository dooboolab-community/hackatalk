import * as Notifications from 'expo-notifications';

import {Channel, User} from '../../types/graphql';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {Image, TouchableOpacity, View} from 'react-native';
import React, {ReactElement, useEffect, useRef} from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import TabNavigator, {MainTabNavigationOptions} from './MainTabNavigator';
import {fetchQuery, graphql, useRelayEnvironment} from 'react-relay/hooks';

import BlockedUser from '../pages/BlockedUser';
import ChangePw from '../pages/ChangePw';
import ChannelCreate from '../pages/ChannelCreate';
import {DefaultTheme} from 'styled-components';
import {IC_SETTING_W} from '../../utils/Icons';
import type {MainStackNavigatorChannelQuery} from '../../__generated__/MainStackNavigatorChannelQuery.graphql';
import Message from '../pages/Message';
import ProfileModal from '../templates/ProfileModal';
import {ProfileModalProvider} from '../../providers/ProfileModalProvider';
import ProfileUpdate from '../pages/ProfileUpdate';
import Report from '../pages/Report';
import {RootStackNavigationProps} from './RootStackNavigator';
import SearchUser from '../pages/SearchUser';
import Settings from '../pages/Settings';
import StatusBar from '../UI/atoms/StatusBar';
import {getString} from '../../../STRINGS';
// import useAppState from '../../hooks/useAppState';
import {useThemeContext} from '@dooboo-ui/theme';

export type MainStackParamList = {
  MainTab: undefined;
  ProfileUpdate: undefined;
  SearchUser: undefined;
  BlockedUser: undefined;
  Report: {
    name: string;
    userId: string;
  };
  Message: {
    channel: Channel;
    users?: User[];
  };
  Settings: undefined;
  ChangePw: undefined;
  ChannelCreate: undefined;
  PinchZoomViewPager: undefined;
};

type NavigationProps<T extends keyof MainStackParamList> = StackNavigationProp<
  MainStackParamList,
  T
>;

export type MainStackNavigationProps<
  T extends keyof MainStackParamList
> = CompositeNavigationProp<
  NavigationProps<T>,
  RootStackNavigationProps<'MainStack'>
>;

const Stack = createStackNavigator<MainStackParamList>();

function getSimpleHeader(
  title: string,
  theme: DefaultTheme,
): StackNavigationOptions {
  return {
    headerTitle: title,
    headerTintColor: theme.headerFont,
    headerStyle: {
      backgroundColor: theme.primary,
      borderBottomWidth: 0,
      elevation: 0,
      shadowColor: 'transparent',
    },
  };
}

const channelQuery = graphql`
  query MainStackNavigatorChannelQuery($channelId: String!) {
    channel(channelId: $channelId) {
      id
      channelType
      name
      memberships(excludeMe: true) {
        user {
          name
          nickname
          thumbURL
          photoURL
        }
      }
    }
  }
`;

function MainStackNavigator(): ReactElement {
  const {theme} = useThemeContext();
  // const currentAppState = useAppState();
  const navigation = useNavigation<MainStackNavigationProps<'MainTab'>>();
  const environment = useRelayEnvironment();

  const latestNavigation = useRef(navigation);
  const latestEnvironment = useRef(environment);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        Notifications.setBadgeCountAsync(0);

        const channelId = JSON.parse(
          response.notification.request.content.data.data as string,
        ).channelId;

        fetchQuery<MainStackNavigatorChannelQuery>(
          latestEnvironment.current,
          channelQuery,
          {
            channelId,
          },
        ).subscribe({
          next: (data) => {
            if (data.channel)
              latestNavigation.current.navigate('Message', {
                channel: data.channel as Channel,
                users: data.channel?.memberships?.map(
                  (membership) => membership?.user as User,
                ),
              });
          },
        });
      },
    );

    return () => subscription.remove();
  }, []);

  // useEffect(() => {
  //   console.log('currentAppState', currentAppState);
  // }, [currentAppState]);

  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      headerMode="screen"
      screenOptions={{
        headerBackTitle: '',
      }}>
      <Stack.Screen
        name="MainTab"
        component={TabNavigator}
        options={MainTabNavigationOptions}
      />
      <Stack.Screen
        name="ProfileUpdate"
        component={ProfileUpdate}
        options={(): StackNavigationOptions => {
          const settingButton = (): ReactElement => {
            return (
              <TouchableOpacity
                style={{
                  height: '100%',
                  minWidth: 20,
                  justifyContent: 'center',
                  marginRight: 15,
                }}
                onPress={(): void => {
                  navigation.navigate('Settings');
                }}>
                <Image style={{height: 24, width: 24}} source={IC_SETTING_W} />
              </TouchableOpacity>
            );
          };

          return {
            ...getSimpleHeader(getString('MY_PROFILE'), theme),
            headerRight: settingButton,
          };
        }}
      />
      <Stack.Screen
        name="SearchUser"
        component={SearchUser}
        options={getSimpleHeader(getString('SEARCH_USER'), theme)}
      />
      <Stack.Screen
        name="BlockedUser"
        component={BlockedUser}
        options={getSimpleHeader(getString('BLOCKED_USER'), theme)}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={getSimpleHeader(getString('REPORT'), theme)}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={getSimpleHeader(getString('MESSAGE'), theme)}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={getSimpleHeader(getString('SETTINGS'), theme)}
      />
      <Stack.Screen
        name="ChangePw"
        component={ChangePw}
        options={getSimpleHeader(getString('PASSWORD_CHANGE'), theme)}
      />
      <Stack.Screen
        name="ChannelCreate"
        component={ChannelCreate}
        options={getSimpleHeader(getString('NEW_CHAT'), theme)}
      />
    </Stack.Navigator>
  );
}

function RootNavigator(): ReactElement {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <StatusBar />
      <MainStackNavigator />
      <ProfileModal testID="modal" />
    </View>
  );
}

export default function RootNavigatorWrapper(): ReactElement {
  return (
    <ProfileModalProvider>
      <RootNavigator />
    </ProfileModalProvider>
  );
}
