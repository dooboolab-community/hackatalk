// import * as ProfileContext from '../../../providers/ProfileModalProvider';

import ProfileContext, {
  useProfileContext,
} from '../../../providers/ProfileModalProvider';
import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { Button } from 'react-native';
import Friend from '../Friend';
import { MockedProvider } from '@apollo/react-testing';
import ProfileModal from '../../shared/ProfileModal';
import { QUERY_FRIENDS } from '../../../graphql/queries';
import { User } from '../../../types';
import { useFriendContext } from '../../../providers/FriendProvider';

const fakeUsers: User[] = [
  {
    id: '1',
    nickname: 'admin',
    thumbURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    statusMessage: 'hello',
    isOnline: true,
  },
  {
    id: '2',
    nickname: 'geoseong',
    thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    statusMessage: 'hello baby',
    isOnline: false,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

const mocks = [
  {
    request: {
      query: QUERY_FRIENDS,
    },
    result: {
      data: {
        friends: [
          {
            id: '1',
            nickname: 'admin',
            name: 'admin',
            thumbURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
            photoURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
            statusMessage: 'hello',
            isOnline: true,
          }, {
            id: '2',
            nickname: 'geoseong',
            name: 'geoseong',
            thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
            photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
            statusMessage: 'hello baby',
            isOnline: false,
          },
        ],
      },
    },
  },
];

describe('[Friend] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders as expected', async () => {
    component = createTestElement(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Friend {...props} />
      </MockedProvider>,
    );

    const testingLib = render(component);
    await wait(() => {
      testingLib.rerender(component);
      expect(testingLib.asJSON()).toBeTruthy();
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
    await act(() => wait());
  });

  it('renders loading', () => {
    component = createTestElement(
      <MockedProvider mocks={[]} addTypename={false}>
        <Friend {...props} />
      </MockedProvider>,
    );

    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders error view', async () => {
    const errorMock = {
      request: { query: QUERY_FRIENDS },
      error: new Error('error'),
    };

    component = createTestElement(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <Friend {...props} />
      </MockedProvider>,
    );

    const testingLib = render(component);
    await wait(() => {
      testingLib.rerender(component);
      expect(testingLib.asJSON()).toBeTruthy();
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
    await act(() => wait());
  });
});

describe('[Friend] interaction', () => {
  let testingLib: RenderResult;
  let component: React.ReactElement;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Friend {...props} />
      </MockedProvider>,
    );
    testingLib = render(component);
  });

  afterEach(() => {
    cleanup();
  });

  describe('dispatch showModal', () => {
    it('should dispatch [show-modal] when user is pressed', async () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: null,
        }));
      await wait(() => {
        const userListItem = testingLib.queryByTestId('user-id-0');
        fireEvent.press(userListItem);
      });
      await act(() => wait());
    });

    it('should call [show-modal] when modal is available', async () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: {
            user: null,
            deleteMode: true,
          },
        }));

      await wait(() => {
        const userListItem = testingLib.queryByTestId('user-id-0');
        testingLib.rerender(component);
        fireEvent.press(userListItem);
      });
      await act(() => wait());
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
          <MockedProvider mocks={mocks} addTypename={false}>
            <Friend {...props} />
          </MockedProvider>
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <MockedProvider mocks={mocks} addTypename={false}>
            <Friend {...props} />
          </MockedProvider>
        </>
      );
    };

    beforeEach(async () => {
      component = createTestElement(<TestComponent />);
      testingLib = render(component);
      itemTestID = 'user-id-0';
      await wait();
    });

    it('Show the friend is removed from list and the modal turns off when the delete button is pressed', async () => {
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
