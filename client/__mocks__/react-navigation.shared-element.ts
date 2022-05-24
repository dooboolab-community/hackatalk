import {FC, createElement} from 'react';

import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

export const createSharedElementStackNavigator = createStackNavigator;
export const SharedElement: FC = () =>
  createElement(View, {
    testID: 'mock-shared-element',
  });
