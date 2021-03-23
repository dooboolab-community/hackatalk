import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';

import MainFriend from '../MainFriend';
import React from 'react';
import {User} from '../../../types/graphql';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

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

describe('[Friend] rendering test', () => {
  it('renders a friend', async () => {
    const component = createTestElement(<MainFriend />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    const nickname = await screen.findByText('jdoe1234');

    expect(nickname).toBeTruthy();

    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
