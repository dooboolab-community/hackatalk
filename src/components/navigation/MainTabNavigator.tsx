import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import Friend from '../screen/Friend';
import Icon5 from '@expo/vector-icons/FontAwesome5';
import Message from '../screen/Message';
import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { getString } from '../../../STRINGS';

interface Styles {
  imgHeaderLeft: ImageStyle;
  txt: TextStyle;
  txtSub: TextStyle;
}

const styles: Styles = StyleSheet.create({
  imgHeaderLeft: {
    marginLeft: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: 'white',
    borderWidth: 1,
  },
  txt: {
    color: 'white',
    fontSize: 15,
  },
  txtSub: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});

const MainTabNavigator = createMaterialTopTabNavigator(
  {
    Friend: { screen: Friend },
    Message: { screen: Message },
  },
  {
    navigationOptions: ({ navigation }) => {
      return {
        tabBarVisible: true,
        tabBarLabel: ({ focused }) => {
          const { routeName } = navigation.state;
          switch (routeName) {
            case 'Friend':
              return (
                <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
                  {getString('FRIEND')} <Text style={styles.txtSub}>24</Text>
                </Text>
              );
            case 'Message':
              return (
                <Text style={[styles.txt, { opacity: focused ? 1 : 0.8 }]}>
                  {getString('MESSAGE')} <Text style={styles.txtSub}>8</Text>
                </Text>
              );
          }
          return null;
        },
      };
    },
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'white',
      },
      style: {
        height: 44,
        justifyContent: 'center',
        backgroundColor: 'rgb(58,139,255)',
        borderTopColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
      },
    },
  },
);

export default MainTabNavigator;

export const MainTabNavigationOptions = ({ navigation, screenProps }) => {
  const { theme } = screenProps;
  return {
    title: 'Talk Talk',
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.title,
    },
    headerLeft: (
      <View
        style={{
          marginLeft: 16,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('ProfileUpdate')}
        >
          <Icon5
            name='user-circle'
            size={20}
            color={theme.colors.dodgerBlue}
            light={true}
          />
        </TouchableOpacity>
      </View>
    ),
    headerRight: (
      <View
        style={{
          marginRight: 16,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('SearchUser')}
        >
          <Icon5
            name='search-plus'
            size={20}
            color={theme.colors.dodgerBlue}
            light={true}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};
