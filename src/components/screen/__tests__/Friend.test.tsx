// import * as ProfileContext from '../../../providers/ProfileModalProvider';

import ProfileContext, {
  useProfileContext,
} from '../../../providers/ProfileModalProvider';
import React, { ReactElement, useRef } from 'react';
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';
import renderer, { act } from 'react-test-renderer';

import { Button } from 'react-native';
import Friend from '../Friend';
import ProfileModal from '../../shared/ProfileModal';
import { User } from '../../../types';
import { useFriendContext } from '../../../providers/FriendProvider';

const fakeUsers: User[] = [
  {
    uid: '1',
    displayName: 'admin',
    thumbURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    statusMsg: 'online',
    online: true,
    // created: new Date(),
    // updated: new Date(),
  },
  {
    uid: '2',
    displayName: 'geoseong',
    thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    statusMsg: 'offline',
    online: false,
  },
];

let props: any;
let component: ReactElement;

describe('[Friend] rendering test', () => {
  beforeEach(() => {
    beforeEach(() => {
      props = createTestProps();
      component = createTestElement(<Friend {...props} />);
    });
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Friend] interaction', () => {
  let testingLib: RenderResult;
  let component: React.ReactElement;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Friend {...props} />);
    testingLib = render(component);
  });

  afterEach(() => {
    cleanup();
  });

  describe('dispatch showModal', () => {
    it('should dispatch [show-modal] when user is pressed', () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: null,
        }));
      const userListItem = testingLib.queryByTestId('USER_ID_0');
      act(() => {
        fireEvent.press(userListItem);
      });
    });

    it('should call [show-modal] when modal is available', () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: {
            user: null,
            deleteMode: true,
            modal: jest.mock,
          },
        }));
      const userListItem = testingLib.queryByTestId('USER_ID_0');
      testingLib.rerender(component);
      act(() => {
        fireEvent.press(userListItem);
      });
    });
  });

  describe('add friends', () => {
    const Buttons = (): React.ReactElement => {
      const {
        friendState: { friends },
        addFriend,
        deleteFriend,
      } = useFriendContext();

      const addNewFriend = (): void => {
        addFriend(fakeUsers[0]);
      };

      const deleteFirstFriend = (): void => {
        if (friends.length > 0) {
          deleteFriend(friends[0]);
        }
      };
      return (
        <>
          <Button testID="btn-add" title="ADD" onPress={addNewFriend} />
          <Button testID="btn-delete" title="DEL" onPress={deleteFirstFriend} />
        </>
      );
    };
    beforeEach(() => {
      component = createTestElement(
        <>
          <Buttons />
          <Friend {...props} />
        </>,
      );
      testingLib = render(component);
    });

    it('should be added to the friend list when called addFriend function', () => {
      const btnAdd = testingLib.queryByTestId('btn-add');
      act(() => {
        fireEvent.press(btnAdd);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('should be deleted to the friend list when called deleteFriend function', () => {
      const btnDel = testingLib.queryByTestId('btn-delete');
      act(() => {
        fireEvent.press(btnDel);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
  });

  describe('Show the interaction of the [ProfileModal] and [Friend] screen.', () => {
    const props: any = createTestProps({
      screenProps: { changeTheme: jest.fn() },
    });
    let component: React.ReactElement;
    let testingLib: RenderResult;
    let itemTestID: string;

    const TestComponent = (): React.ReactElement => {
      const { state } = useProfileContext();
      const modalEl = React.useRef(null);
      state.modal = modalEl;

      return (
        <>
          <ProfileModal ref={state.modal} />
          <Friend {...props} />
        </>
      );
    };

    beforeEach(() => {
      component = createTestElement(<TestComponent />);
      testingLib = render(component);
      itemTestID = 'USER_ID_0';
    });

    it('Show the friend is removed from list and the modal turns off when the delete button is pressed', () => {
      const userListItem = testingLib.queryByTestId(itemTestID);
      act(() => {
        fireEvent.press(userListItem);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
      const btnAdFriend = testingLib.queryByTestId('btn-ad-friend');
      act(() => {
        fireEvent.press(btnAdFriend);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
  });
});
