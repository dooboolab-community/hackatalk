import * as React from 'react';

import {
  createNavigationStub,
  createTestElement,
} from '../../../../test/testUtils';

import ChangePw from '../ChangePw';
import ReactNavigation from '@react-navigation/core';
import {render} from '@testing-library/react-native';

const mockNavigation = createNavigationStub();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof ReactNavigation>('@react-navigation/core'),
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
