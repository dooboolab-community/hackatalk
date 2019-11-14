import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import { ProfileModalProvider, useProfileContext } from '../../providers/ProfileModalProvider';
import React, { useRef } from 'react';

import Chat from '../screen/Chat';
import { DefaultNavigationProps } from '../../types';
import ProfileModal from '../shared/ProfileModal';
import ProfileUpdate from '../screen/ProfileUpdate';
import SearchUser from '../screen/SearchUser';
import StatusBar from '../shared/StatusBar';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { useThemeContext } from '../../providers/ThemeProvider';

const Stack = createStackNavigator();

function MainStackNavigator(): React.ReactElement {
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
      <Stack.Screen name="MainTab" component={MainTabNavigator} options={MainTabNavigationOptions}/>
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
      <Stack.Screen name="SearchUser" component={SearchUser} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

interface Props {
  navigation: DefaultNavigationProps;
}

function RootNavigator(): React.ReactElement {
  const navigation = useNavigation();
  const { state } = useProfileContext();
  const modalEl = useRef(null);
  state.modal = modalEl;
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
    }}>
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

export default function RootNavigatorWrapper(): React.ReactElement {
  return (
    <ProfileModalProvider>
      <RootNavigator/>
    </ProfileModalProvider>
  );
}
