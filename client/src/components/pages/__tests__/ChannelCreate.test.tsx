import 'react-native';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';

import type {AuthProviderMeQuery$data} from '../../../__generated__/AuthProviderMeQuery.graphql';
import ChannelCreate from '../ChannelCreate';
import React from 'react';
import type {User} from '../../../types/graphql';
import type mockReactNavigation from '@react-navigation/core';
import {render} from '@testing-library/react-native';

const mockNavigation = createMockNavigation();

const mockEnvironment = createMockEnvironment();

mockEnvironment.mock.queueOperationResolver((operation) => {
  return MockPayloadGenerator.generate(operation, {
    User: (_, generateId): User => ({
      id: `user-${generateId()}`,
      name: 'John Doe',
      nickname: 'jdoe1234',
    }),
    PageInfo: () => ({has_next_page: false}),
  });
});

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
  });

  it('renders [UserListItem]', async () => {
    const user: AuthProviderMeQuery$data['me'] = {
      id: 'me1234',
      verified: true,
      email: 'test@email.com',
      profile: null,
    };

    const component = createTestElement(<ChannelCreate />, {
      environment: mockEnvironment,
      user,
    });
    const screen = render(component);

    const nickname = await screen.findByText('jdoe1234');

    expect(nickname).toBeTruthy();
  });
});
