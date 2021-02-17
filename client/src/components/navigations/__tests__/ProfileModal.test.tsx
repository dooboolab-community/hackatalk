import {
  ProfileModalContext,
  useProfileContext,
} from '../../../providers/ProfileModalProvider';
import React, {createRef, forwardRef, useImperativeHandle} from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';

import {MockPayloadGenerator} from 'relay-test-utils';
import ProfileModal from '../MainStackNavigator/ProfileModal';
import {View} from 'react-native';
import {createTestElement} from '../../../../test/testUtils';
import {environment} from '../../../providers';

jest.mock('@react-navigation/core', () => {
  return {
    useNavigation: (): Record<string, unknown> => {
      return {
        navigate: jest.fn(),
      };
    },
  };
});

type ConsumerRef = {
  showModal: ProfileModalContext['showModal'];
  hideModal: ProfileModalContext['hideModal'];
};

const ProfileConsumer = forwardRef<ConsumerRef>((props, ref) => {
  const {showModal, hideModal} = useProfileContext();

  useImperativeHandle(ref, () => ({showModal, hideModal}));

  return null;
});

const ref = createRef<ConsumerRef>();

const component = createTestElement(
  <View>
    <ProfileConsumer ref={ref} />
    <ProfileModal />
  </View>,
);

describe('[ProfileModal] rendering test', () => {
  it('Render without crashing', async () => {
    const {toJSON} = render(component);

    await act(() =>
      ref.current?.showModal({
        // @ts-ignore
        user: {
          id: '',
        },
        isFriend: false,
      }),
    );

    const json = toJSON();

    expect(json).toMatchSnapshot();
  });

  it('Should be opened', async () => {
    const {queryByTestId} = render(component);

    await act(() =>
      ref.current?.showModal({
        // @ts-ignore
        user: {id: ''},
        isFriend: false,
      }),
    );

    const button = queryByTestId('touch-add-friend');

    expect(button).not.toBeNull();
  });

  it('Check "Added to your friend." button', async () => {
    const {getByTestId, queryByTestId} = render(component);

    await act(() =>
      ref.current?.showModal({
        // @ts-ignore
        user: {id: ''},
        isFriend: false,
      }),
    );

    const button = getByTestId('touch-add-friend');

    fireEvent.press(button);

    environment.mock.resolveMostRecentOperation((op) =>
      MockPayloadGenerator.generate(op),
    );

    const message = queryByTestId('added-message');

    expect(message).not.toBeNull();
  });

  it('Should be closed', async () => {
    const {queryByTestId} = render(component);

    await act(() => ref.current?.hideModal());

    const button = queryByTestId('touch-add-friend');

    expect(button).toBeNull();
  });

  it('delete', async () => {
    const {queryByTestId, toJSON} = render(component);

    await act(() =>
      ref.current?.showModal({
        // @ts-ignore
        user: {id: ''},
        isFriend: true,
      }),
    );

    const button = queryByTestId('touch-add-friend');

    fireEvent.press(button);

    const json = toJSON();

    expect(json).toBeTruthy();
  });

  // it('Add Friend', async () => {
  //   await act(async () => {
  //     fakeProfileModalRef.current?.showModal({
  //       user: { photoURL: '', nickname: 'nickname', statusMessage: 'online' },
  //     });
  //   });

  //   const button = testingLib2.queryByTestId('touch-add-friend');

  //   await act(async () => {
  //     fireEvent.press(button);
  //   });

  //   expect(onAddFriend).toHaveBeenCalled();
  // });

  // it('Delete Friend', async () => {
  //   await act(async () => {
  //     fakeProfileModalRef.current?.showModal({
  //       user: { photoURL: '', nickname: 'nickname', statusMessage: 'online' },
  //       deleteMode: true,
  //     });
  //   });

  //   const button = testingLib2.queryByTestId('touch-add-friend');

  //   await act(async () => {
  //     fireEvent.press(button);
  //   });

  //   expect(onDeleteFriend).toHaveBeenCalled();
  // });
});
