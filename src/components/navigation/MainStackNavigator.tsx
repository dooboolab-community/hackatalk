import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity, View } from 'react-native';
import { ProfileModalProvider, useProfileContext } from '../../providers/ProfileModalProvider';
import React, { ReactElement, useEffect, useRef } from 'react';
import { StackNavigationOptions, StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import TabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';

import ChangePw from '../screen/ChangePw';
import ChannelCreate from '../screen/ChannelCreate';
import { DefaultTheme } from 'styled-components';
import { FriendProvider } from '../../providers/FriendProvider';
import { IC_SETTING_W } from '../../utils/Icons';
import Message from '../screen/Message';
import PinchZoomViewPager from '../screen/PinchZoomViewPager';
import ProfileModal from '../shared/ProfileModal';
import ProfileUpdate from '../screen/ProfileUpdate';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import SearchUser from '../screen/SearchUser';
import Settings from '../screen/Settings';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';
import useAppState from '../../hooks/useAppState';
import { useThemeContext } from '@dooboo-ui/native-theme';

export type MainStackParamList = {
  default: undefined;
  MainTab: undefined;
  ProfileUpdate: undefined;
  SearchUser: undefined;
  Message: { channelId: string };
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

interface SettingButtonProps {
  tintColor?: string;
}

function getSimpleHeader(title: string, theme: DefaultTheme): StackNavigationOptions {
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

function MainStackNavigator(): ReactElement {
  const { theme } = useThemeContext();
  const currentAppState = useAppState();

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
        options={(props: Props): StackNavigationOptions => {
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
                {/* <Ionicons name="md-settings" size={24} color={tintColor} /> */}
                <Image width={24} height={24} source={IC_SETTING_W}/>
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
        options={getSimpleHeader(getString('SEARCH_USER'), theme)} />
      <Stack.Screen
        name="Message"
        component={Message}
        options={getSimpleHeader(getString('MESSAGE'), theme)}
      />
      <Stack.Screen name="Settings" component={Settings} options={getSimpleHeader(getString('SETTINGS'), theme)} />
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
      <Stack.Screen
        name="PinchZoomViewPager"
        component={PinchZoomViewPager}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

interface Props {
  navigation: MainStackNavigationProps;
}

function RootNavigator(): ReactElement {
  const navigation = useNavigation();
  const { state } = useProfileContext();
  const modalEl = useRef(null);
  state.modal = modalEl;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <StatusBar />
      <MainStackNavigator />
      <ProfileModal
        testID="modal"
        ref={state.modal}
        onChatPressed={(): void => {
          if (state.modal && state.modal.current) {
            state.modal.current.close();
          }
          navigation.navigate('Message');
        }}
      />
    </View>
  );
}

export default function RootNavigatorWrapper(): ReactElement {
  return (
    <ProfileModalProvider>
      <FriendProvider>
        <RootNavigator />
      </FriendProvider>
    </ProfileModalProvider>
  );
}
