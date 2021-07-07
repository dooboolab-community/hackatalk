import 'react-native';

import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';

import LicenseAgreement from '../LicenseAgreement';
import React from 'react';
import mockReactNavigation from '@react-navigation/core';
import {render} from '@testing-library/react-native';

const mockNavigation = createMockNavigation();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

describe('Rendering', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<LicenseAgreement />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });
});
