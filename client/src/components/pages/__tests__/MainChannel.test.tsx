import 'react-native';

import * as React from 'react';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {fireEvent, render} from '@testing-library/react-native';

import {Channel} from '../../../types/graphql';
import MainChannel from '../MainChannel';
import mockReactNavigation from '@react-navigation/core';

const mockNavigation = createMockNavigation();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

const mockEnvironment = createMockEnvironment();

mockEnvironment.mock.queueOperationResolver((operation) =>
  MockPayloadGenerator.generate(operation, {
    Channel: (_, generateId): Channel => ({
      id: `test-channel-${generateId()}`,
      name: 'HackaTalk',
      channelType: 'private',
      lastMessage: {
        id: 'test-message-3848',
        messageType: 'text',
        createdAt: '2021-03-19T05:13:22.932Z',
      },
      messages: {
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
        },
      },
    }),
  }),
);

describe('[Channel] screen', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<MainChannel />, {
      environment: mockEnvironment,
    });

    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  describe('interactions', () => {
    it('should simulate onPress', async () => {
      const component = createTestElement(<MainChannel />, {
        environment: mockEnvironment,
      });

      const screen = render(component);
      const btn = await screen.findByTestId('list-item-0');

      fireEvent.press(btn);

      // TODO: Test what happens after pressing the button.
    });
  });
});
