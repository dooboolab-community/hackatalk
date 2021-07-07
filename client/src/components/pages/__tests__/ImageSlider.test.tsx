import 'react-native';

import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import mockReactNavigation, {RouteProp} from '@react-navigation/core';

import ImageSlider from '../ImageSlider';
import React from 'react';
import {RootStackParamList} from '../../navigations/RootStackNavigator';
import {render} from '@testing-library/react-native';

const mockNavigation = createMockNavigation();

const mockRoute: RouteProp<RootStackParamList, 'ImageSlider'> = {
  key: '',
  name: 'ImageSlider',
  params: {
    images: [
      {
        uri: 'https://images.unsplash.com/photo-1519335337423-a3357c2cd12e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80',
      },
      {
        uri: 'https://www.housingwire.com/wp-content/uploads/2019/09/Purple-technology-data-internet-3.jpg',
      },
      {
        uri: 'https://images.unsplash.com/photo-1587628736664-fdc50efb57b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      },
      {
        uri: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg',
      },
      {uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
    ],
    initialIndex: 1,
  },
};

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

describe('Rendering', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<ImageSlider />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });
});
