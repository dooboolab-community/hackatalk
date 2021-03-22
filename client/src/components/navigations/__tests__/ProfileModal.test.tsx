import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import React, {createRef, forwardRef, useImperativeHandle} from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {graphql, useLazyLoadQuery} from 'react-relay/hooks';

import ProfileModal from '../MainStackNavigator/ProfileModal';
import {ProfileModalTestQuery} from '../../../__generated__/ProfileModalTestQuery.graphql';
import ReactNavigation from '@react-navigation/core';
import {User} from '../../../types/graphql';
import {View} from 'react-native';
import {useProfileContext} from '../../../providers/ProfileModalProvider';

const mockNavigation = createMockNavigation();

jest.useFakeTimers();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof ReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

const mockEnvironment = createMockEnvironment();

const generateUser = (_: unknown, generateId: () => number): User => ({
  id: `user-test-${generateId()}`,
  name: 'Unnamed',
});

mockEnvironment.mock.queueOperationResolver((operation) =>
  MockPayloadGenerator.generate(operation, {
    User: generateUser,
  }),
);

type ConsumerRef = {
  showModal: (next: {
    isFriend?: boolean;
    onDeleteFriend?: () => void;
    onAddFriend?: () => void;
    hideButtons?: boolean;
  }) => void;
  hideModal: () => void;
};

const ProfileConsumer = forwardRef<ConsumerRef>((_props, ref) => {
  const {myData} = useLazyLoadQuery<ProfileModalTestQuery>(
    graphql`
      query ProfileModalTestQuery {
        myData: user(id: "test-id") {
          ...ProfileModal_user
        }
      }
    `,
    {},
  );

  const {showModal, hideModal} = useProfileContext();

  if (!myData) throw new Error('myData is null');

  useImperativeHandle(ref, () => ({
    showModal: (next) => showModal({...next, user: myData}),
    hideModal,
  }));

  return null;
});

const consumerRef = createRef<ConsumerRef>();

const component = createTestElement(
  <View>
    <ProfileConsumer ref={consumerRef} />
    <ProfileModal />
  </View>,
  {
    environment: mockEnvironment,
  },
);

describe('[ProfileModal] rendering test', () => {
  it('Render without crashing', async () => {
    const screen = render(component);

    act(() =>
      consumerRef.current?.showModal({
        isFriend: false,
      }),
    );

    const json = screen.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('Should be opened', async () => {
    const screen = render(component);

    act(() =>
      consumerRef.current?.showModal({
        isFriend: false,
      }),
    );

    const button = screen.getByTestId('touch-add-friend');

    expect(button).toBeTruthy();
  });

  it('Check "Added to your friend." button', async () => {
    const screen = render(component);

    act(() =>
      consumerRef.current?.showModal({
        isFriend: false,
      }),
    );

    const button = screen.getByTestId('touch-add-friend');

    fireEvent.press(button);

    // Resolve mutation.
    await waitFor(() =>
      mockEnvironment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, {
          User: generateUser,
        }),
      ),
    );

    const message = screen.getByTestId('added-message');

    expect(message).toBeTruthy();
  });

  it('Should be closed', async () => {
    const screen = render(component);

    act(() => consumerRef.current?.hideModal());

    const button = screen.queryByTestId('touch-add-friend');

    expect(button).toBeNull();
  });

  it('delete', async () => {
    const screen = render(component);

    const mockOnDeleteFriend = jest.fn();

    act(() =>
      consumerRef.current?.showModal({
        isFriend: true,
        onDeleteFriend: mockOnDeleteFriend,
      }),
    );

    // Find the delete button.
    // 'touch-add-friend' button becomes the delete button if
    // the user is already a friend.
    const button = screen.getByTestId('touch-add-friend');

    fireEvent.press(button);
    expect(mockOnDeleteFriend).toHaveBeenCalledTimes(1);
  });

  it('Add Friend', async () => {
    const screen = render(component);

    const mockOnAddFriend = jest.fn();

    act(() => {
      consumerRef.current?.showModal({
        isFriend: false,
        onAddFriend: mockOnAddFriend,
      });
    });

    const button = screen.getByTestId('touch-add-friend');

    fireEvent.press(button);

    expect(mockOnAddFriend).toHaveBeenCalledTimes(1);
  });
});
