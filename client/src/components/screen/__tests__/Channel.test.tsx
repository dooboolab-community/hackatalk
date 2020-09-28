import 'react-native';

import * as React from 'react';

import { cleanup, fireEvent, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Channel from '../Channel';
import { Channel as ChannelType } from '../../../types/graphql';
import { MockPayloadGenerator } from 'relay-test-utils';
import { environment } from '../../../providers';

const component = createTestElement(
  <Channel {...createTestProps()} />,
);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: (): Record<string, unknown> => {
      return {
        navigate: jest.fn(),
      };
    },
  };
});

describe('[Channel] screen', () => {
  beforeEach(() => {
    environment.mockClear();
  });

  it('renders without crashing', () => {
    environment.mock.queueOperationResolver((operation) => {
      return MockPayloadGenerator.generate(operation, {
        Channel: (_, generateId): ChannelType => ({
          id: `user-${generateId()}`,
          name: 'HackaTalk',
          channelType: 'private',
          messages: {
            edges: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
            },
          },
        }),
      });
    });

    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  describe('interactions', () => {
    beforeEach(() => {
      environment.mock.queueOperationResolver((operation) => {
        return MockPayloadGenerator.generate(operation, {
          Channel: (_, generateId): ChannelType => ({
            id: `user-${generateId()}`,
            name: 'HackaTalk',
            channelType: 'private',
            messages: {
              edges: [],
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
              },
            },
          }),
        });
      });
    });

    it('should simulate onPress', () => {
      const { getByTestId } = render(component);
      const btn = getByTestId('list-item-0');

      fireEvent.press(btn);
    });
  });
});
