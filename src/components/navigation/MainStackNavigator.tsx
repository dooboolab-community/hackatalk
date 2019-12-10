import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import {
  ProfileModalProvider,
  useProfileContext,
} from '../../providers/ProfileModalProvider';
import React, { ReactElement, useRef } from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';
import Chat from '../screen/Chat';
import { DefaultNavigationProps } from '../../types';
import { FriendProvider } from '../../providers/FriendProvider';
import { Ionicons } from '@expo/vector-icons';
import ProfileModal from '../shared/ProfileModal';
import ProfileUpdate from '../screen/ProfileUpdate';
import SearchUser from '../screen/SearchUser';
import Setting from '../screen/Setting';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';
import { useNavigation } from '@react-navigation/core';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Stack = createStackNavigator();

interface SettingButtonProps {
  navigation: DefaultNavigationProps;
}

function MainStackNavigator(): ReactElement {
  const { theme } = useThemeContext();
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.primaryLight,
        },
        headerTitleStyle: {
          color: theme.fontColor,
        },
        headerTintColor: theme.fontColor,
      }}
    >
      <Stack.Screen
        name="MainTab"
        component={MainTabNavigator}
        options={MainTabNavigationOptions}
      />
      <Stack.Screen
        name="ProfileUpdate"
        component={ProfileUpdate}
        options={({
          navigation,
        }: {
          navigation: DefaultNavigationProps;
        }): StackNavigationOptions => {
          const settingButton = (): ReactElement => (
            <TouchableOpacity
              style={{
                height: '100%',
                minWidth: 20,
                justifyContent: 'center',
                marginRight: 15,
              }}
              onPress={(): void => {
                navigation.navigate('Setting');
              }}
            >
              <Ionicons name="md-settings" size={24} color={theme.fontColor} />
            </TouchableOpacity>
          );
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
            headerRight: settingButton,
          };
        }}
      />
      <Stack.Screen name="SearchUser" component={SearchUser} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
}

interface Props {
  navigation: DefaultNavigationProps;
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
          navigation.navigate('Chat');
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
