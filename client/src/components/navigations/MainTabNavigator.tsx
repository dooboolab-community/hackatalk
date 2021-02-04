import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {IC_PROFILE_W, IC_SEARCH_W} from '../../utils/Icons';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {
  MaterialTopTabNavigationProp,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import React, {ReactElement} from 'react';

import Channel from '../pages/Channel';
import Constants from 'expo-constants';
import Friend from '../pages/Friend';
import {LinearGradient} from 'expo-linear-gradient';
import {MainStackNavigationProps} from './MainStackNavigator';
import {getString} from '../../../STRINGS';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'dooboo-ui';

export type MaterialTopTabParamList = {
  Friend: undefined;
  Channel: undefined;
};

type NavigationProps<
  T extends keyof MaterialTopTabParamList
> = MaterialTopTabNavigationProp<MaterialTopTabParamList, T>;

export type MaterialTopTabNavigationProps<
  T extends keyof MaterialTopTabParamList
> = CompositeNavigationProp<
  NavigationProps<T>,
  MainStackNavigationProps<'MainTab'>
>;

const Tab = createMaterialTopTabNavigator<MaterialTopTabParamList>();

const CustomHeader = (): ReactElement => {
  const {theme, changeThemeType} = useTheme();
  const navigation = useNavigation<MainStackNavigationProps<'MainTab'>>();

  return (
    // @ts-ignore
    <LinearGradient
      style={{
        paddingTop: Platform.select({
          ios: Constants.statusBarHeight,
          default: 0,
        }),
        height: Platform.select({
          ios: 44 + Constants.statusBarHeight,
          default: 56,
        }),
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      start={[0.4, 0.6]}
      end={[1.0, 0.85]}
      locations={[0, 0.85]}
      colors={[theme.header, theme.primaryLight]}>
      <View style={{marginLeft: 8}}>
        <TouchableOpacity
          style={{padding: 8}}
          activeOpacity={0.5}
          onPress={(): void => navigation.navigate('ProfileUpdate')}>
          <Image style={{height: 24, width: 24}} source={IC_PROFILE_W} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={(): void => changeThemeType()}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: 'white',
          }}>
          {getString('HACKATALK')}
        </Text>
      </TouchableOpacity>
      <View style={{marginRight: 8}}>
        <TouchableOpacity
          style={{padding: 8}}
          activeOpacity={0.5}
          onPress={(): void => navigation.navigate('SearchUser')}>
          {/* <Ionicons name="ios-search" size={24} color="white" /> */}
          <Image style={{height: 24, width: 24}} source={IC_SEARCH_W} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

function TabNavigator(): ReactElement {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      swipeEnabled={true}
      sceneContainerStyle={{
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
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
        indicatorContainerStyle: {
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      }}>
      <Tab.Screen
        name="Friend"
        component={Friend}
        options={{
          title: getString('FRIEND'),
        }}
      />
      <Tab.Screen
        name="Channel"
        component={Channel}
        options={{
          title: getString('CHANNEL'),
        }}
      />
    </Tab.Navigator>
  );
}

export const MainTabNavigationOptions = (): Record<string, unknown> => {
  return {
    header: CustomHeader,
  };
};

export default TabNavigator;
