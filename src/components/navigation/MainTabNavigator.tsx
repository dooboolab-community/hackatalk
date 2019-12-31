import { MaterialTopTabNavigationProp, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CompositeNavigationProp } from '@react-navigation/native';
import Constants from 'expo-constants';
import Friend from '../screen/Friend';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import Message from '../screen/Message';
import { useThemeContext } from '@dooboo-ui/native-theme';

export type MaterialTopTabParamList = {
  default: undefined;
  Friend: undefined;
  Message: undefined;
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

const Tab = createMaterialTopTabNavigator<MaterialTopTabNavigationProps>();

interface Props {
  navigation: MaterialTopTabNavigationProps;
}

const CustomHeader = (props: Props): ReactElement => {
  const { theme, changeThemeType } = useThemeContext();
  const { navigation } = props;
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
          onPress={(): void => navigation.navigate('ProfileUpdate')}
        >
          <Ionicons name="ios-person" size={24} color="white" />
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
          <Ionicons name="ios-search" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

function MainTabNavigator(): ReactElement {
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
      {/*
      // @ts-ignore */}
      <Tab.Screen name="Friend" component={Friend} />
      {/*
      // @ts-ignore */}
      <Tab.Screen name="Message" component={Message} />
    </Tab.Navigator >
  );
}

export const MainTabNavigationOptions = (): object => {
  return {
    header: CustomHeader,
  };
};

export default MainTabNavigator;
