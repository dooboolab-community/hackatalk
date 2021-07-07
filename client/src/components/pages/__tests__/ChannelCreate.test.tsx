import 'react-native';

import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {fireEvent, render} from '@testing-library/react-native';

import ChannelCreate from '../ChannelCreate';
import React from 'react';
import mockReactNavigation from '@react-navigation/core';

const mockNavigation = createMockNavigation();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

describe('Rendering', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<ChannelCreate />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('Interaction', () => {
  it('should change search text', () => {
    const component = createTestElement(<ChannelCreate />);
    const screen = render(component);
    const searchInput = screen.getByTestId('text-input');

    fireEvent.changeText(searchInput, 'test search');

    expect(searchInput.props.value).toEqual('test search');
  });
});
