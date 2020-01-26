import * as React from 'react';

import { RenderResult, fireEvent, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';
import renderer, { act } from 'react-test-renderer';

import { Button } from 'react-native';
// Note: test renderer must be required after react-native.
import ProfileModal from '../ProfileModal';
import { User } from '../../../types';
import { getString } from '../../../../STRINGS';
import { useFriendContext } from '../../../providers/FriendProvider';
import { useProfileContext } from '../../../providers/ProfileModalProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
// let testingLib: RenderResult;

const fakeUsers: User[] = [
  {
    id: '1',
    nickname: 'admin',
    thumbURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    statusMessage: 'online',
    isOnline: true,
    // created: new Date(),
    // updated: new Date(),
  },
  {
    id: '2',
    nickname: 'zeoseong',
    thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    statusMessage: 'offline',
    isOnline: false,
  },
];

describe('[ProfileModal] render', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<ProfileModal {...props} />);
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });

  // describe('interactions', () => {
  //   beforeEach(() => {
  //     testingLib = render(component);
  //   });

  //   it('should simulate onPress', () => {
  //     const btn = testingLib.queryByTestId('btn');
  //     act(() => {
  //       fireEvent.press(btn);
  //     });
  //     expect(cnt).toBe(3);
  //   });
  // });
});

const TestComponent = ({ showModalParams }): React.ReactElement => {
  const { state, showModal } = useProfileContext();
  const {
    friendState: { friends },
  } = useFriendContext();
  const modalEl = React.useRef(null);
  state.modal = modalEl;
  const user = showModalParams.user || friends[0];
  const deleteMode =
    friends.findIndex((friend) => friend.id === user.id) !== -1;
  return (
    <>
      <Button
        testID="btn-close"
        title="close"
        onPress={(): void => {
          if (state.modal.current) {
            state.modal.current.close();
          }
        }}
      />
      <Button
        testID="btn-showmodal"
        title="show"
        onPress={(): void => {
          if (state.modal.current && user) {
            showModal({
              user,
              deleteMode,
              isFriendAlreadyAdded: deleteMode,
              onDeleteFriend: () => (): void => {
                if (state.modal && state.modal.current) {
                  const profileModal = state.modal.current;
                  profileModal.showAddBtn(true);
                  profileModal.setIsFriendAdded(false);
                  profileModal.setIsFriendAlreadyAdded(false);
                }
              },
              onAddFriend: () => (): void => {
                if (state.modal && state.modal.current) {
                  const profileModal = state.modal.current;
                  profileModal.showAddBtn(false);
                  profileModal.setIsFriendAdded(true);
                }
              },
            });
          }
        }}
      />
      <ProfileModal ref={state.modal} {...props} />
    </>
  );
};

describe('[ProfileModal] interactions', () => {
  let component: React.ReactElement;
  let testingLib: RenderResult;

  it('should be shown and closed when press buttons', () => {
    component = createTestElement(
      <TestComponent showModalParams={{ user: fakeUsers[0] }} />,
    );
    testingLib = render(component);
    const btnShowmodal = testingLib.queryByTestId('btn-showmodal');
    act(() => {
      fireEvent.press(btnShowmodal);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();

    //
    const btnClose = testingLib.queryByTestId('btn-close');
    act(() => {
      fireEvent.press(btnClose);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();
  });

  it('should display added friend message when press add button in [SearchUser] Screen', () => {
    component = createTestElement(
      <TestComponent
        showModalParams={{
          user: fakeUsers[0],
          deleteMode: false,
          screen: 'SearchUser',
        }}
      />,
    );
    testingLib = render(component);
    const btnShowmodal = testingLib.queryByTestId('btn-showmodal');
    act(() => {
      fireEvent.press(btnShowmodal);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();

    let btnAdTitle = testingLib.queryByTestId('btn-ad-title');
    let addedMessage = testingLib.queryByTestId('added-message');
    let alreadyAddedMessage = testingLib.queryByTestId('already-added-message');
    expect(btnAdTitle.children[0]).toEqual(getString('ADD_FRIEND'));
    expect(addedMessage).toBeNull();
    expect(alreadyAddedMessage).toBeNull();

    // press add button
    const btnAdFriend = testingLib.queryByTestId('btn-ad-friend');
    act(() => {
      fireEvent.press(btnAdFriend);
    });
    btnAdTitle = testingLib.queryByTestId('btn-ad-title');
    addedMessage = testingLib.queryByTestId('added-message');
    alreadyAddedMessage = testingLib.queryByTestId('already-added-message');
    expect(btnAdTitle.children[0]).toEqual(getString('DELETE_FRIEND'));
    expect(addedMessage.children[0]).toEqual(getString('FRIEND_ADDED'));
    expect(alreadyAddedMessage).toBeNull();

    // press delete button
    act(() => {
      fireEvent.press(btnAdFriend);
    });
    btnAdTitle = testingLib.queryByTestId('btn-ad-title');
    addedMessage = testingLib.queryByTestId('added-message');
    alreadyAddedMessage = testingLib.queryByTestId('already-added-message');
    expect(btnAdTitle.children[0]).toEqual(getString('ADD_FRIEND'));
    expect(addedMessage).toBeNull();
    expect(alreadyAddedMessage).toBeNull();

    // press add button
    act(() => {
      fireEvent.press(btnAdFriend);
    });
    btnAdTitle = testingLib.queryByTestId('btn-ad-title');
    addedMessage = testingLib.queryByTestId('added-message');
    alreadyAddedMessage = testingLib.queryByTestId('already-added-message');
    expect(btnAdTitle.children[0]).toEqual(getString('DELETE_FRIEND'));
    expect(addedMessage.children[0]).toEqual(getString('FRIEND_ADDED'));
    expect(alreadyAddedMessage).toBeNull();

    // press close button and open button
    const btnClose = testingLib.queryByTestId('btn-close');
    act(() => {
      fireEvent.press(btnClose);
      fireEvent.press(btnShowmodal);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();
    btnAdTitle = testingLib.queryByTestId('btn-ad-title');
    addedMessage = testingLib.queryByTestId('added-message');
    alreadyAddedMessage = testingLib.queryByTestId('already-added-message');
    expect(btnAdTitle.children[0]).toEqual(getString('DELETE_FRIEND'));
    expect(addedMessage).toBeNull();
    expect(alreadyAddedMessage.children[0]).toEqual(
      getString('FRIEND_ALREADY_ADDED'),
    );
  });

  it('should close when press delete button in [Friend] Screen', () => {
    component = createTestElement(
      <TestComponent
        showModalParams={{
          screen: 'Friend',
        }}
      />,
    );
    testingLib = render(component);
    const btnShowmodal = testingLib.queryByTestId('btn-showmodal');
    act(() => {
      fireEvent.press(btnShowmodal);
    });
    const btnAdTitle = testingLib.queryByTestId('btn-ad-title');
    expect(btnAdTitle.children[0]).toEqual(getString('DELETE_FRIEND'));
    const btnAdFriend = testingLib.queryByTestId('btn-ad-friend');
    act(() => {
      fireEvent.press(btnAdFriend);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();
  });
});
