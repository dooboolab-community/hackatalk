import 'react-native';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {act, fireEvent, render} from '@testing-library/react-native';

import type {AuthStackParamList} from '../../navigations/AuthStackNavigator';
import React from 'react';
import type {RouteProp} from '@react-navigation/core';
import VerifyEmail from '../VerifyEmail';
import {createTestElement} from '../../../../test/testUtils';
import type mockReactNavigation from '@react-navigation/core';

const mockRoute: RouteProp<AuthStackParamList, 'VerifyEmail'> = {
  key: '',
  name: 'VerifyEmail',
  params: {
    email: 'test@email.com',
  },
};

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useRoute: () => mockRoute,
}));

describe('Rendering', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<VerifyEmail />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});

describe('Interaction', () => {
  it('should simulate email button press', async () => {
    const mockEnvironment = createMockEnvironment();

    const component = createTestElement(<VerifyEmail />, {
      environment: mockEnvironment,
    });

    const {getByTestId} = render(component);
    const btn = getByTestId('btn-next');

    fireEvent.press(btn);

    const operation = mockEnvironment.mock.getMostRecentOperation();

    expect(operation).toBeTruthy();

    act(() => {
      mockEnvironment.mock.resolve(
        operation,
        MockPayloadGenerator.generate(operation),
      );
    });
  });
});
