import * as Notifications from 'expo-notifications';

import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import React, {ReactElement, useEffect, useMemo} from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {StatusBarBrightness, useTheme} from 'dooboo-ui';
import TabNavigator, {MainTabNavigationOptions} from '../MainTabNavigator';
import {graphql, useSubscription} from 'react-relay';

import BlockedUser from '../../pages/BlockedUser';
import ChangePw from '../../pages/ChangePw';
import ChannelCreate from '../../pages/ChannelCreate';
import {Theme as DefaultTheme} from '@emotion/react';
import {GraphQLSubscriptionConfig} from 'relay-runtime';
import {IC_SETTING_W} from '../../../utils/Icons';
import {MainStackNavigatorOnMessageSubscription} from '../../../__generated__/MainStackNavigatorOnMessageSubscription.graphql';
import Message from '../../pages/Message';
import ProfileModal from './ProfileModal';
import {ProfileModalProvider} from '../../../providers/ProfileModalProvider';
import ProfileUpdate from '../../pages/ProfileUpdate';
import Report from '../../pages/Report';
import {RootStackNavigationProps} from '../RootStackNavigator';
import SearchUser from '../../pages/SearchUser';
import Settings from '../../pages/Settings';
import {getString} from '../../../../STRINGS';
import {onMessageUpdater} from '../../../relay/updaters';
import {requestPermissionsAsync} from 'expo-ads-admob';
import {useDeviceContext} from '../../../providers';

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
    channelId: string;
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

export type MainStackNavigationProps<T extends keyof MainStackParamList> =
  CompositeNavigationProp<
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
      backgroundColor: theme.header,
      borderBottomWidth: 0,
      elevation: 0,
      shadowColor: 'transparent',
    },
  };
}

const onMessageSubscription = graphql`
  subscription MainStackNavigatorOnMessageSubscription($deviceKey: String!) {
    onMessage(deviceKey: $deviceKey) {
      id
      imageUrls
      channel {
        id
        lastMessage {
          id
          messageType
          text
          imageUrls
          fileUrls
          createdAt
        }
        memberships(excludeMe: true) {
          user {
            name
            nickname
            thumbURL
            photoURL
          }
        }
      }
      sender {
        id
        name
        nickname
      }
      createdAt
      ...MessageListItem_message
    }
  }
`;

function MainStackNavigator(): ReactElement {
  const {theme} = useTheme();
  const navigation = useNavigation<MainStackNavigationProps<'MainTab'>>();

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios')
      requestPermissionsAsync(); // expo-ads-admob
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        await Notifications.setBadgeCountAsync(0);

        const {data: jsonString} = response.notification.request.content.data;

        if (typeof jsonString === 'string') {
          const {channelId} = JSON.parse(jsonString);

          if (typeof channelId === 'string')
            navigation.navigate('Message', {channelId});
        }
      },
    );

    return () => subscription.remove();
  }, [navigation]);

  const {deviceKey} = useDeviceContext();

  const subscriptionConfig = useMemo<
    GraphQLSubscriptionConfig<MainStackNavigatorOnMessageSubscription>
  >(
    () => ({
      variables: {deviceKey},
      subscription: onMessageSubscription,
      updater: (store) => {
        onMessageUpdater(store);
      },
    }),
    [deviceKey],
  );

  useSubscription(subscriptionConfig);

  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerBackTitle: '',
        cardStyle: {
          backgroundColor: theme.background,
        },
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
        options={getSimpleHeader('', theme)}
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

function MainNavigator(): ReactElement {
  const {theme} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.background,
      }}>
      <StatusBarBrightness />
      <MainStackNavigator />
      <ProfileModal testID="modal" />
    </View>
  );
}

export default function MainNavigatorWrapper(): ReactElement {
  return (
    <ProfileModalProvider>
      <MainNavigator />
    </ProfileModalProvider>
  );
}
