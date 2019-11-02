import MainTabNavigator, { MainTabNavigationOptions } from './MainTabNavigator';
import React, { PureComponent, ReactElement } from 'react';

import Chat from '../screen/Chat';
import { DefaultNavigationProps } from '../../types';
import ProfileModal from '../shared/ProfileModal';
import ProfileUpdate from '../screen/ProfileUpdate';
import SearchUser from '../screen/SearchUser';
import { StateContext } from '../../contexts';
import StatusBar from '../shared/StatusBar';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
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

export default class RootNavigator extends PureComponent<Props> {
  public static contextType = StateContext;

  public render(): ReactElement {
    const { navigation } = this.props;
    const [
      {
        profileModal: { modal },
      },
    ] = this.context;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <StatusBar />
        <MainStackNavigator />
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
      </View>
    );
  }
}
