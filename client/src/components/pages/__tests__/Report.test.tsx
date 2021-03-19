import 'react-native';

import ReactNavigation, {RouteProp} from '@react-navigation/core';
import {
  createNavigationStub,
  createTestElement,
} from '../../../../test/testUtils';

import {MainStackParamList} from '../../navigations/MainStackNavigator';
import React from 'react';
import Report from '../Report';
import {render} from '@testing-library/react-native';

const mockNavigation = createNavigationStub();

const mockRoute: RouteProp<MainStackParamList, 'Report'> = {
  key: '',
  name: 'Report',
  params: {
    name: 'hello',
    userId: 'my-user-id',
  },
};

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof ReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

describe('Rendering', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<Report />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });
});
