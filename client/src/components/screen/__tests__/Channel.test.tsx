import 'react-native';

import * as React from 'react';

import { RenderResult, act, cleanup, fireEvent, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Channel from '../Channel';
import { Channel as ChannelType } from '../../../types/graphql';
import { MockPayloadGenerator } from 'relay-test-utils';
import { environment } from '../../../providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

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
    props = createTestProps();
    component = createTestElement(
      <Channel {...props} />,
    );
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

    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
    expect(testingLib.baseElement).toMatchSnapshot();
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

      testingLib = render(component);
    });

    it('should simulate onPress', () => {
      const btn = testingLib.queryByTestId('list-item-0');
      act(() => {
        fireEvent.press(btn);
      });
    });
  });

  afterEach(cleanup);
});
