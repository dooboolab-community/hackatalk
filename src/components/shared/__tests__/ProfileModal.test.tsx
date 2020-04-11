import {
  MUTATION_ADD_FRIEND,
  MUTATION_DELETE_FRIEND,
} from '../../../graphql/mutations';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  RenderResult,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { QUERY_FRIENDS } from '../../../graphql/queries';
import Shared from '../ProfileModal';
import { act } from 'react-test-renderer';
import { useProfileContext } from '../../../providers/ProfileModalProvider';

// Extract type of Ref from forwarding component.
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
  let testingLib: RenderResult;
  const ref = createRef<Handle<typeof Shared>>();
  let fakeProfileModalRef;
  let fakeModalTestingLib;
  let fakeProfileModalTestComponent;
  const onAddFriend = jest.fn();
  const onDeleteFriend = jest.fn();
  const mocks: Array<MockedResponse> = [
    {
      request: { query: MUTATION_ADD_FRIEND, variables: { friendId: '1' } },
      result: {
        data: {
          friends: [
            {
              id: 'aa11',
              photoURL: '',
              name: 'testName',
            },
          ],
        },
      },
    },
    {
      request: {
        query: MUTATION_DELETE_FRIEND,
      },
      result: {
        data: {
          friends: [
            {
              id: 'aa11',
              photoURL: '',
              name: 'testName',
            },
          ],
        },
      },
    },
    {
      request: {
        query: QUERY_FRIENDS,
      },
      result: {
        data: {
          friends: [
            {
              id: 'aa11',
              photoURL: '',
              name: 'testName',
              email: 'test@email.com',
              nickname: '',
              birthday: '',
              statusMessage: '',
              verified: true,
              authType: '',
              thumbURL: '',
              isOnline: '',
            },
          ],
        },
      },
    },
  ];
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Shared ref={ref} {...props} />
      </MockedProvider>,
    );
    testingLib = render(component);

    fakeProfileModalRef = createRef<Ref>();
    fakeProfileModalTestComponent = createTestElement(
      <FakeProfileModal
        ref={fakeProfileModalRef}
        onAddFriend={onAddFriend}
        onDeleteFriend={onDeleteFriend}
      />,
    );
    fakeModalTestingLib = render(fakeProfileModalTestComponent);
  });

  it('Render without crashing', async () => {
    const { baseElement } = testingLib;
    await wait(() => {
      expect(baseElement).toMatchSnapshot();
      expect(baseElement).toBeTruthy();
    });
  });

  it('Should be opened', async () => {
    const { current } = ref;
    // Open modal by using it's state.
    await act(async () => {
      current.open();
    });
    const button = testingLib.queryByTestId('btn-ad-friend');
    expect(button).not.toBeNull();
  });

  it('Check "Added to your friend." button', async () => {
    const { current } = ref;
    await act(async () => {
      current.open();
      current.setIsFriendAdded(true);
    });
    const button = testingLib.queryByTestId('added-message');
    expect(button).not.toBeNull();
  });

  it('Check "Already your friend." button', async () => {
    const { current } = ref;
    await act(async () => {
      current.open();
      current.setUser(mocks[0].result.data.friends[0]);
    });
    const alreadyAddedMsgButton = testingLib.queryByTestId('already-added-message');
    expect(alreadyAddedMsgButton).not.toBeNull();
  });

  it('Should be closed', async () => {
    const { current } = ref;
    // Cloase modal by using it's state.
    await act(async () => {
      current.close();
    });
    const button = testingLib.queryByTestId('btn-ad-friend');
    expect(button).toBeNull();
  });

  it('Add Friend', async () => {
    await act(async () => {
      fakeProfileModalRef.current.showModal({
        user: { photoURL: '', nickname: 'nickname', statusMessage: 'online' },
      });
    });
    const button = fakeModalTestingLib.queryByTestId('btn-ad-friend');
    await act(async () => {
      fireEvent.press(button);
    });
    expect(onAddFriend).toHaveBeenCalled();
  });

  it('Delete Friend by using its state', async () => {
    const { current } = ref;
    await act(async () => {
      current.showAddBtn(false);
      current.open();
    });
    const button = testingLib.queryByTestId('btn-ad-friend');
    await act(async () => {
      fireEvent.press(button);
    });
    expect(current.modal).toBeTruthy();
  });

  it('Delete Friend by using ModalProvider', async () => {
    await act(async () => {
      fakeProfileModalRef.current.showModal({
        user: { photoURL: '', nickname: 'nickname', statusMessage: 'online' },
        deleteMode: true,
      });
    });
    const button = fakeModalTestingLib.queryByTestId('btn-ad-friend');
    await act(async () => {
      fireEvent.press(button);
    });
    expect(onDeleteFriend).toHaveBeenCalled();
  });
});
