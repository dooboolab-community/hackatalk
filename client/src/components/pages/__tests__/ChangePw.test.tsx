import * as React from 'react';

import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';

import ChangePw from '../ChangePw';
import mockReactNavigation from '@react-navigation/core';
import {render} from '@testing-library/react-native';

const mockNavigation = createMockNavigation();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

describe('[ChangePw] screen', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<ChangePw />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
