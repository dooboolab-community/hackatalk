import 'react-native';

import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';

import type {MainStackParamList} from '../../navigations/MainStackNavigator';
import React from 'react';
import Report from '../Report';
import type {RouteProp} from '@react-navigation/core';
import type mockReactNavigation from '@react-navigation/core';
import {render} from '@testing-library/react-native';

const mockNavigation = createMockNavigation();

const mockRoute: RouteProp<MainStackParamList, 'Report'> = {
  key: '',
  name: 'Report',
  params: {
    name: 'hello',
    userId: 'my-user-id',
  },
};

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

describe('Rendering', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<Report />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});
