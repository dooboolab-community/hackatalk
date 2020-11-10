import * as Notifications from 'expo-notifications';

import { Channel, User } from '../../types/graphql';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { Image, TouchableOpacity, View } from 'react-native';
import type {
  MainStackNavigatorChannelQuery,
  MainStackNavigatorChannelQueryResponse,
} from '../../__generated__/MainStackNavigatorChannelQuery.graphql';
import React, { ReactElement, useEffect } from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import TabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import { fetchQuery, graphql, useMutation, useRelayEnvironment } from 'react-relay/hooks';

import BlockedUser from '../screen/BlockedUser';
import ChangePw from '../screen/ChangePw';
import ChannelCreate from '../screen/ChannelCreate';
import { DefaultTheme } from 'styled-components';
import { IC_SETTING_W } from '../../utils/Icons';
import Message from '../screen/Message';
import ProfileModal from '../shared/ProfileModal';
import {
  ProfileModalProvider,
} from '../../providers/ProfileModalProvider';
import ProfileUpdate from '../screen/ProfileUpdate';
import Report from '../screen/Report';
import { RootStackNavigationProps } from './RootStackNavigator';
import SearchUser from '../screen/SearchUser';
import Settings from '../screen/Settings';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';
import useAppState from '../../hooks/useAppState';
import { useThemeContext } from '@dooboo-ui/theme';

export type MainStackParamList = {
  default: undefined;
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

type NavigationProps<
  T extends keyof MainStackParamList = 'default'
> = StackNavigationProp<MainStackParamList, T>;

export type MainStackNavigationProps<
  T extends keyof MainStackParamList = 'default'
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
  query MainStackNavigatorChannelQuery(
    $channelId: String!
  ) {
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
  const { theme } = useThemeContext();
  const currentAppState = useAppState();
  const navigation = useNavigation();
  const environment = useRelayEnvironment();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const channelId = JSON.parse(response.notification.request.content.data.data as string).channelId;

      fetchQuery<MainStackNavigatorChannelQuery>(environment, channelQuery, { channelId }).subscribe({
        next: (data) => {
          if (data.channel) {
            navigation.navigate('Message', {
              channel: data.channel,
              users: data.channel?.memberships?.map((membership) => membership?.user),
            });
          }
        },
      });
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    console.log('currentAppState', currentAppState);
  }, [currentAppState]);

  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      headerMode="screen"
      screenOptions={{
        headerBackTitle: '',
      }}
    >
      <Stack.Screen
        name="MainTab"
        component={TabNavigator}
        options={MainTabNavigationOptions}
      />
      <Stack.Screen
        name="ProfileUpdate"
        component={ProfileUpdate}
        options={(props): StackNavigationOptions => {
          const { navigation } = props;

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
                }}
              >
                <Image style={{ height: 24, width: 24 }} source={IC_SETTING_W} />
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
      }}
    >
      <StatusBar />
      <MainStackNavigator />
      <ProfileModal testID="modal"/>
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
