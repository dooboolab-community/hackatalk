import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import {
  MaterialTopTabBar as RNMaterialTopTabBar,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Constants from 'expo-constants';
import Friend from '../screen/Friend';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Message from '../screen/Message';
import { ScreenProps } from './SwitchNavigator';
import { getString } from '../../../STRINGS';

interface Props {
  screenProps: ScreenProps;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const MaterialTopTabBar = (props: Props & any): ReactElement => {
  const { theme } = props.screenProps;
  return (
    <RNMaterialTopTabBar
      {...props}
      activeTintColor={theme.indicatorColor}
      inactiveTintColor={theme.inactiveColor}
      indicatorStyle={{
        backgroundColor: theme.indicatorColor,
      }}
      tabStyle={{
        backgroundColor: 'transparent',
      }}
      style={{
        backgroundColor: theme.background,
      }}
    />
  );
};

const MainTabNavigator = createMaterialTopTabNavigator(
  {
    Friend: {
      screen: Friend,
      navigationOptions: {
        tabBarLabel: getString('FRIEND'),
        tabBarAccessibilityLabel: getString('FRIEND'),
      },
    },
    Message: {
      screen: Message,
      navigationOptions: {
        tabBarLabel: getString('MESSAGE'),
        tabBarAccessibilityLabel: getString('MESSAGE'),
      },
    },
  },
  {
    swipeEnabled: true,
    tabBarComponent: MaterialTopTabBar,
  },
);

export default MainTabNavigator;

const CustomHeader = (props: Props): ReactElement => {
  const { theme, changeTheme } = props.screenProps;
  return (
    <LinearGradient
      style={{
        paddingTop: Constants.statusBarHeight,
        height: 44 + Constants.statusBarHeight,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      start={[0.4, 0.6]}
      end={[1.0, 0.85]}
      locations={[0, 0.85]}
      colors={[theme.primary, theme.primaryLight]}
    >
      <View style={{ marginLeft: 8 }}>
        <TouchableOpacity
          style={{ padding: 8 }}
          activeOpacity={0.5}
          onPress={(): boolean => props.navigation.navigate('ProfileUpdate')}
        >
          <Ionicons name='ios-person' size={24} color='white' />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={(): void => changeTheme()}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: 'white',
          }}
        >
          HackaTalk
        </Text>
      </TouchableOpacity>
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity
          style={{ padding: 8 }}
          activeOpacity={0.5}
          onPress={(): boolean => props.navigation.navigate('SearchUser')}
        >
          <Ionicons name='ios-search' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export const MainTabNavigationOptions = (): object => {
  return {
    header: CustomHeader,
  };
};
