import * as ProfileContext from '../../../providers/ProfileModalProvider';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {fireEvent, render} from '@testing-library/react-native';

import MainFriend from '../MainFriend';
import React from 'react';
import type {User} from '../../../types/graphql';
import {createTestElement} from '../../../../test/testUtils';

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
  });
});

describe('[Friend] interaction test', () => {
  it('shows modal when peer button pressed', async () => {
    const mockShowModal = jest.fn();

    jest.spyOn(ProfileContext, 'useProfileContext').mockImplementation(() => ({
      showModal: mockShowModal,
      hideModal: jest.fn(),
      modalState: {isVisible: false},
    }));

    const component = createTestElement(<MainFriend />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    const peerButton = await screen.findByTestId('peer-button');

    expect(peerButton).toBeTruthy();

    fireEvent.press(peerButton);

    expect(mockShowModal).toBeCalledTimes(1);
  });
});
