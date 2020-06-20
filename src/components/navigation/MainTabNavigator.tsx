import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { IC_PROFILE_W, IC_SEARCH_W } from '../../utils/Icons';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { MaterialTopTabNavigationProp, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { ReactElement } from 'react';

import Channel from '../screen/Channel';
import Constants from 'expo-constants';
import Friend from '../screen/Friend';
import { LinearGradient } from 'expo-linear-gradient';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { useThemeContext } from '@dooboo-ui/theme';

export type MaterialTopTabParamList = {
  default: undefined;
  Friend: undefined;
  Channel: undefined;
};

type NavigationProps<
  T extends keyof MaterialTopTabParamList = 'default'
> = MaterialTopTabNavigationProp<MaterialTopTabParamList, T>;

export type MaterialTopTabNavigationProps<
  T extends keyof MaterialTopTabParamList = 'default'
> = CompositeNavigationProp<
NavigationProps<T>,
MainStackNavigationProps<'MainTab'>
>;

const Tab = createMaterialTopTabNavigator<MaterialTopTabParamList>();

const CustomHeader = (): ReactElement => {
  const { theme, changeThemeType } = useThemeContext();
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={{
        paddingTop: Platform.select({
          ios: Constants.statusBarHeight,
          android: 0,
        }),
        height: Platform.select({
          ios: 44 + Constants.statusBarHeight,
          android: 56,
        }),
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
          onPress={(): void => navigation.navigate('ProfileUpdate')}
        >
          <Image width={24} height={24} source={IC_PROFILE_W}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={(): void => changeThemeType()}>
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
          onPress={(): void => navigation.navigate('SearchUser')}
        >
          {/* <Ionicons name="ios-search" size={24} color="white" /> */}
          <Image width={24} height={24} source={IC_SEARCH_W}/>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

function TabNavigator(): ReactElement {
  const { theme } = useThemeContext();
  return (
    <Tab.Navigator
      swipeEnabled={true}
      tabBarOptions={{
        activeTintColor: theme.indicatorColor,
        inactiveTintColor: theme.inactiveColor,
        indicatorStyle: {
          backgroundColor: theme.indicatorColor,
        },
        tabStyle: {
          backgroundColor: 'transparent',
        },
        style: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Tab.Screen name="Friend" component={Friend} />
      <Tab.Screen name="Channel" component={Channel} />
    </Tab.Navigator >
  );
}

export const MainTabNavigationOptions = (): Record<string, unknown> => {
  return {
    header: CustomHeader,
  };
};

export default TabNavigator;
