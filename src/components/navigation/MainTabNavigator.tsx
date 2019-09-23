import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MaterialTopTabBar as RNMaterialTopTabBar,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { SvgNoProfile, SvgPlus } from '../../utils/Icons';

import Constants from 'expo-constants';
import Friend from '../screen/Friend';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Message from '../screen/Message';
import React from 'react';
import { ScreenProps } from './SwitchNavigator';
import { getString } from '../../../STRINGS';

interface Styles {
  imgHeaderLeft: ImageStyle;
  txt: TextStyle;
  txtSub: TextStyle;
}

const MaterialTopTabBar = (props: any) => {
  const { theme } = props.screenProps;
  return (
    <RNMaterialTopTabBar
      {...props}
      activeTintColor={theme.indicatorColor}
      inactiveTintColor={theme.tintColor}
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
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: MaterialTopTabBar,
  },
);

export default MainTabNavigator;

const CustomHeader = (props: any) => {
  const { theme } = props.screenProps;
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
          onPress={() => props.navigation.navigate('ProfileUpdate')}
        >
          <Ionicons name='ios-person' size={24} color={theme.background} />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: theme.background,
          }}
        >
          HackaTalk
        </Text>
      </View>
      <View style={{ marginRight: 8 }}>
        <TouchableOpacity
          style={{ padding: 8 }}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('SearchUser')}
        >
          <Ionicons name='ios-search' size={24} color={theme.background} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export const MainTabNavigationOptions = ({
  navigation,
  screenProps,
}: {
  navigation: any;
  screenProps: ScreenProps;
}) => {
  const { theme } = screenProps;
  return {
    header: CustomHeader,
  };
};
