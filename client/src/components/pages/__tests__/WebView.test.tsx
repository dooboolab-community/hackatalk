import 'react-native';

import * as React from 'react';

import type {RootStackParamList} from '../../navigations/RootStackNavigator';
import type {RouteProp} from '@react-navigation/core';
import WebView from '../WebView';
import {createTestElement} from '../../../../test/testUtils';
import type mockReactNavigation from '@react-navigation/core';
import {render} from '@testing-library/react-native';

const mockRoute: RouteProp<RootStackParamList, 'WebView'> = {
  key: '',
  name: 'WebView',
  params: {
    uri: 'http://example.com',
  },
};

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useRoute: () => mockRoute,
}));

describe('[WebView] screen', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<WebView />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});
