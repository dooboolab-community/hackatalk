import {IC_PROFILE_W, IC_SEARCH_W} from '../../utils/Icons';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';

import Channel from '../pages/MainChannel';
import type {CompositeNavigationProp} from '@react-navigation/native';
import Friend from '../pages/MainFriend';
import {LinearGradient} from 'expo-linear-gradient';
import type {MainStackNavigationProps} from './MainStackNavigator';
import type {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import React from 'react';
import type {ReactElement} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getString} from '../../../STRINGS';
import {useDooboo} from 'dooboo-ui';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type MaterialTopTabParamList = {
  Friend: undefined;
  Channel: undefined;
};

type NavigationProps<T extends keyof MaterialTopTabParamList> =
  MaterialTopTabNavigationProp<MaterialTopTabParamList, T>;

export type MaterialTopTabNavigationProps<
  T extends keyof MaterialTopTabParamList,
> = CompositeNavigationProp<
  NavigationProps<T>,
  MainStackNavigationProps<'MainTab'>
>;

const Tab = createMaterialTopTabNavigator<MaterialTopTabParamList>();

const CustomHeader = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const {theme, changeThemeType} = useDooboo();
  const navigation = useNavigation<MainStackNavigationProps<'MainTab'>>();

  return (
    <LinearGradient
      style={{
        paddingTop: insets.top,
        height: Platform.select({
          ios: 44 + insets.top,
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
      colors={[theme.header, theme.primaryLight]}
    >
      <View style={{marginLeft: 8}}>
        <TouchableOpacity
          style={{padding: 8}}
          activeOpacity={0.5}
          onPress={(): void => navigation.navigate('ProfileUpdate')}
        >
          <Image style={{height: 24, width: 24}} source={IC_PROFILE_W} />
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
          {getString('HACKATALK')}
        </Text>
      </TouchableOpacity>
      <View style={{marginRight: 8}}>
        <TouchableOpacity
          style={{padding: 8}}
          activeOpacity={0.5}
          onPress={(): void => navigation.navigate('SearchUser')}
        >
          <Image style={{height: 24, width: 24}} source={IC_SEARCH_W} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

function TabNavigator(): ReactElement {
  const {theme} = useDooboo();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      screenOptions={{
        swipeEnabled: true,
        tabBarActiveTintColor: theme.role.primary,
        tabBarInactiveTintColor: theme.text.disabled,
        tabBarIndicatorStyle: {
          backgroundColor: theme.role.primary,
        },
        tabBarItemStyle: {
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          backgroundColor: theme.bg.basic,
        },
        tabBarIndicatorContainerStyle: {
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        tabBarLabelStyle: {textTransform: 'none', fontWeight: '500'},
      }}
    >
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
