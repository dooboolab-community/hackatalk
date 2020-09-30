import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Shared from '../ProfileModal';
import { useProfileContext } from '../../../providers/ProfileModalProvider';

type Handle<T> = T extends ForwardRefExoticComponent<RefAttributes<infer T2>>
  ? T2
  : never;
interface Ref {
  showModal: (showModalParams: any) => void;
}
interface Props {
  onAddFriend?: () => void;
  onDeleteFriend?: () => void;
}

// interface Props {}
const FakeProfileModal = forwardRef<Ref, Props>((props, ref) => {
  const { state, showModal } = useProfileContext();
  const modalEl = React.useRef(null);

  state.modal = modalEl;

  useImperativeHandle(ref, () => ({
    showModal,
    // modalEl,
  }));

  return (
    <Shared
      ref={modalEl}
      onAddFriend={props.onAddFriend}
      onDeleteFriend={props.onDeleteFriend}
    />
  );
});

describe('[ProfileModal] rendering test', () => {
  let props: any;
  let component: React.ReactElement;
  let testingLib: RenderAPI;
  let fakeProfileModalRef;
  let testingLib2;
  let component2;

  const ref = createRef<Handle<typeof Shared>>();
  const onAddFriend = jest.fn();
  const onDeleteFriend = jest.fn();

  beforeEach(() => {
    props = createTestProps();

    component = createTestElement(
      <Shared ref={ref} {...props} />,
    );

    testingLib = render(component);
    fakeProfileModalRef = createRef<Ref>();

    component2 = createTestElement(
      <FakeProfileModal
        ref={fakeProfileModalRef}
        onAddFriend={onAddFriend}
        onDeleteFriend={onDeleteFriend}
      />,
    );

    testingLib2 = render(component2);
  });

  it('Render without crashing', async () => {
    testingLib = render(component);

    await waitFor(() => {
      const json = testingLib.toJSON();

      expect(json).toMatchSnapshot();
    });
  });

  it('Should be opened', async () => {
    const { current } = ref;

    // Open modal by using it's state.
    await act(async () => {
      current?.open();
    });

    const button = testingLib.queryByTestId('touch-add-friend');

    expect(button).not.toBeNull();
  });

  it('Check "Added to your friend." button', async () => {
    const { current } = ref;

    await act(async () => {
      current?.open();
      current?.setIsFriendAdded(true);
    });

    const button = testingLib.queryByTestId('added-message');

    expect(button).not.toBeNull();
  });

  it('Should be closed', async () => {
    const { current } = ref;

    // Cloase modal by using it's state.
    await act(async () => {
      current?.close();
    });

    const button = testingLib.queryByTestId('touch-add-friend');

    expect(button).toBeNull();
  });

  it('delete', async () => {
    const { current } = ref;

    await act(async () => {
      current?.showAddBtn(false);
      current?.open();
    });

    const button = testingLib.queryByTestId('touch-add-friend');

    await act(async () => {
      fireEvent.press(button);
    });

    expect(current?.modal).toBeTruthy();
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
