import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import React, {
  FC,
  RefObject,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {graphql, useLazyLoadQuery} from 'react-relay';

import {IEnvironment} from 'relay-runtime';
import ProfileModal from '../MainStackNavigator/ProfileModal';
import {ProfileModalTestQuery} from '../../../__generated__/ProfileModalTestQuery.graphql';
import {User} from '../../../types/graphql';
import {View} from 'react-native';
import mockReactNavigation from '@react-navigation/core';
import {useProfileContext} from '../../../providers/ProfileModalProvider';

const mockNavigation = createMockNavigation();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

const generateUser = (idNum: number, isFriend: boolean): Partial<User> => ({
  id: `user-test-${idNum}`,
  isFriend,
});

type ConsumerRef = {
  showModal: (next: {
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

interface TestComponentProps {
  consumerRef: RefObject<ConsumerRef>;
  environment: IEnvironment;
}

const TestComponent: FC<TestComponentProps> = ({consumerRef, environment}) => {
  return createTestElement(
    <View>
      <ProfileConsumer ref={consumerRef} />
      <ProfileModal />
    </View>,
    {
      environment,
    },
  );
};

describe('[ProfileModal] rendering test', () => {
  it('Render without crashing', async () => {
    const mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        User: (_, generateId) => generateUser(generateId(), false),
      }),
    );

    const consumerRef = createRef<ConsumerRef>();

    const screen = render(
      <TestComponent consumerRef={consumerRef} environment={mockEnvironment} />,
    );

    act(() => consumerRef.current?.showModal({}));

    const json = screen.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('Should be opened', async () => {
    const mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        User: (_, generateId) => generateUser(generateId(), false),
      }),
    );

    const consumerRef = createRef<ConsumerRef>();

    const screen = render(
      <TestComponent consumerRef={consumerRef} environment={mockEnvironment} />,
    );

    act(() => consumerRef.current?.showModal({}));

    const button = screen.getByTestId('touch-add-friend');

    expect(button).toBeTruthy();
  });

  it('Check "Added to your friend." button', async () => {
    const mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        User: (_, generateId) => generateUser(generateId(), false),
      }),
    );

    const consumerRef = createRef<ConsumerRef>();

    const screen = render(
      <TestComponent consumerRef={consumerRef} environment={mockEnvironment} />,
    );

    act(() => consumerRef.current?.showModal({}));

    const button = screen.getByTestId('touch-add-friend');

    fireEvent.press(button);

    // Resolve mutation.
    act(() => {
      mockEnvironment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, {
          User: (_, generateId) => generateUser(generateId(), true),
        }),
      );
    });

    const message = screen.getByTestId('added-message');

    expect(message).toBeTruthy();
  });

  it('Should be closed', async () => {
    const mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        User: (_, generateId) => generateUser(generateId(), false),
      }),
    );

    const consumerRef = createRef<ConsumerRef>();

    const screen = render(
      <TestComponent consumerRef={consumerRef} environment={mockEnvironment} />,
    );

    act(() => consumerRef.current?.hideModal());

    const button = screen.queryByTestId('touch-add-friend');

    expect(button).toBeNull();
  });

  it('delete', async () => {
    const mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        User: (_, generateId) => generateUser(generateId(), true),
      }),
    );

    const consumerRef = createRef<ConsumerRef>();

    const screen = render(
      <TestComponent consumerRef={consumerRef} environment={mockEnvironment} />,
    );

    const mockOnDeleteFriend = jest.fn();

    act(() =>
      consumerRef.current?.showModal({
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
    const mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        User: (_, generateId) => generateUser(generateId(), false),
      }),
    );

    const consumerRef = createRef<ConsumerRef>();

    const screen = render(
      <TestComponent consumerRef={consumerRef} environment={mockEnvironment} />,
    );

    const mockOnAddFriend = jest.fn();

    act(() => {
      consumerRef.current?.showModal({
        onAddFriend: mockOnAddFriend,
      });
    });

    const button = screen.getByTestId('touch-add-friend');

    fireEvent.press(button);

    expect(mockOnAddFriend).toHaveBeenCalledTimes(1);
  });
});
