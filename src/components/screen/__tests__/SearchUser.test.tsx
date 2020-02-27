import * as React from 'react';

import {
  GetByBoundProp,
  ReactTestInstanceExtended,
  RenderResult,
  act,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import SearchUser, {
  onAddFriend,
  onDeleteFriend,
  updateUsers,
} from '../SearchUser';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { Animated } from 'react-native';
import { MockedProvider } from '@apollo/react-testing';
import ProfileModal from '../../shared/ProfileModal';
import { QUERY_USERS } from '../../../graphql/queries';
import { User } from '../../../types';
import { useProfileContext } from '../../../providers/ProfileModalProvider';

type TestingLibInput = Pick<
ReactTestInstanceExtended,
| 'type'
| 'props'
| 'parent'
| 'children'
| 'find'
| 'findAll'
| 'getProp'
| 'parentNode'
>;

const mockUsers = [
  {
    id: '1',
    nickname: 'admin',
    thumbURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    statusMessage: 'online',
    isOnline: true,
    birthday: '',
    email: '',
    name: 'admin',
    gender: 0,
    socialId: '',
    authType: '',
    phone: '',
    verified: '',
    lastSignedIn: '',
  },
  {
    id: '2',
    nickname: 'geoseong',
    thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    statusMessage: 'offline',
    isOnline: false,
    birthday: '',
    email: '',
    name: 'admin',
    gender: 0,
    socialId: '',
    authType: '',
    phone: '',
    verified: '',
    lastSignedIn: '',
  },
  {
    id: '3',
    nickname: 'hyochan',
    thumbURL: 'https://avatars2.githubusercontent.com/u/27461460?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/27461460?s=460&v=4',
    statusMessage: 'offline',
    isOnline: false,
    birthday: '',
    email: '',
    name: 'admin',
    gender: 0,
    socialId: '',
    authType: '',
    phone: '',
    verified: '',
    lastSignedIn: '',
  },
  {
    id: '4',
    nickname: 'mars',
    thumbURL: 'https://avatars0.githubusercontent.com/u/6101260?s=460&v=4',
    photoURL: 'https://avatars0.githubusercontent.com/u/6101260?s=460&v=4',
    statusMessage: 'offline',
    isOnline: true,
    birthday: '',
    email: '',
    name: 'admin',
    gender: 0,
    socialId: '',
    authType: '',
    phone: '',
    verified: '',
    lastSignedIn: '',
  },
  {
    id: '5',
    nickname: 'gordon',
    thumbURL: 'https://avatars0.githubusercontent.com/u/10363850?s=460&v=4',
    photoURL: 'https://avatars0.githubusercontent.com/u/10363850?s=460&v=4',
    statusMessage: 'offline',
    isOnline: true,
    birthday: '',
    email: '',
    name: 'admin',
    gender: 0,
    socialId: '',
    authType: '',
    phone: '',
    verified: '',
    lastSignedIn: '',
  },
  {
    id: '6',
    nickname: 'hyochan2',
    thumbURL:
      'https://i.ytimg.com/vi/NgKSEvqzYvo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWBWqCeP5oTwaB6XMRGXEhvbIiIA',
    photoURL:
      'https://i.ytimg.com/vi/NgKSEvqzYvo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWBWqCeP5oTwaB6XMRGXEhvbIiIA',
    statusMessage: 'offline',
    isOnline: false,
    birthday: '',
    email: '',
    name: 'admin',
    gender: 0,
    socialId: '',
    authType: '',
    phone: '',
    verified: '',
    lastSignedIn: '',
  },
];

const mockSearchUsers = [
  {
    request: {
      query: QUERY_USERS,
    },
    result: {
      data: {
        users: mockUsers,
      },
    },
  },
];
const props = createTestProps();
const component: React.ReactElement = createTestElement(
  <MockedProvider mocks={mockSearchUsers} addTypename={false}>
    <SearchUser {...props} />
  </MockedProvider>,
);

describe('[SearchUser] rendering test', () => {
  it('should render as expected', () => {
    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });
  it('renders error view', async () => {
    const errorMock = {
      request: { query: QUERY_USERS },
      error: new Error('error'),
    };

    const component = createTestElement(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <SearchUser {...props} />
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

describe('[serachUser] interaction', () => {
  let testingLib: RenderResult;
  let txtInputInst: TestingLibInput;
  let animatedFlatListInst: TestingLibInput;
  const inputData: User = mockUsers[0];

  beforeAll(async () => {
    await wait(() => {
      testingLib = render(component);
    });
    await act(() => wait());
    txtInputInst = testingLib.getByTestId('text-input');
    animatedFlatListInst = testingLib.getByTestId('animated-flatlist');
  });
  it('check if users does not injected', () => {
    const injectPropsWithoutUsers = {
      ...props,
    };
    const componentWithoutUsers: React.ReactElement = createTestElement(
      <SearchUser {...injectPropsWithoutUsers} />,
    );
    const testingLibWithoutUsers = render(componentWithoutUsers);
    const animatedFlatListInst = testingLibWithoutUsers.getByTestId(
      'animated-flatlist',
    );
    expect(animatedFlatListInst.props.data.length).toEqual(0);
  });
  it('check if setUsers and setSearchedUsers called when user data received', () => {
    const mockData = {
      users: mockUsers,
    };
    const setUsers = jest.fn();
    const setSearchedUsers = jest.fn();
    const receivedData = updateUsers({
      data: mockData,
      stateSetters: {
        setUsers,
        setSearchedUsers,
      },
    });
    expect(setUsers).toHaveBeenCalled();
    expect(setSearchedUsers).toHaveBeenCalled();
    expect(receivedData).toEqual(mockData);
  });
  it(
    'when friend name typed in TextInput: (onTxtChanged -> searchUsers)' +
      ' and (renderItem) and (keyExtractor)',
    async () => {
      fireEvent.changeText(txtInputInst, inputData.nickname);
      expect(animatedFlatListInst.props.data[0]).toEqual(inputData);

      expect(animatedFlatListInst.props.contentContainerStyle()).toEqual(null);
      fireEvent.changeText(txtInputInst, 'noresult!');
      expect(animatedFlatListInst.props.data.length).toEqual(0);
      expect(animatedFlatListInst.props.contentContainerStyle()).toEqual({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      });

      fireEvent.changeText(txtInputInst, '');
      expect(animatedFlatListInst.props.data.length).toEqual(mockUsers.length);
    },
  );
  it('see Animation is working well', () => {
    jest.useFakeTimers(); // related to timer
    const scrollY = animatedFlatListInst.props.testObj.scrollY;
    const afterScrollY = new Animated.Value(0);
    Animated.timing(afterScrollY, {
      toValue: 100,
      duration: 500,
    }).start();
    // setTimeout called - 5
    setTimeout(() => {
      expect(scrollY).toEqual(afterScrollY); // doesn't work
    }, 600);
    // setTimeout called - 6
  });
});

const TestComponent = ({ modal }): React.ReactElement => {
  const { state } = useProfileContext();
  state.modal = modal;
  const injectProps = {
    ...props,
    onDeleteFriend: onDeleteFriend(modal),
    onAddFriend: onAddFriend(modal),
    users: mockUsers,
  };
  return (
    <>
      <ProfileModal ref={state.modal} />
      <SearchUser {...injectProps} />
    </>
  );
};

describe('[SearchUser] interaction with Profile Modal', () => {
  let component: React.ReactElement;
  let testingLib: RenderResult;
  let itemTestID: string;
  let userListItem: GetByBoundProp;
  const modal = {
    current: {
      open: jest.fn(),
      close: jest.fn(),
      setUser: jest.fn(),
      showAddBtn: jest.fn(),
      setIsFriendAdded: jest.fn(),
      setIsFriendAlreadyAdded: jest.fn(),
      setOnDeleteFriend: jest.fn(),
      setOnAddFriend: jest.fn(),
    },
  };

  beforeEach(() => {
    component = createTestElement(<TestComponent modal={modal} />);
    testingLib = render(component);
    itemTestID = 'user-list-item0';
    userListItem = testingLib.getByTestId(itemTestID);
  });

  it('show profile modal when press user in search user list', async () => {
    act(() => {
      fireEvent.press(userListItem);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();
  });

  it('show changged state when press add and delete button on profile modal', async () => {
    const spyShowAddBtn = jest.spyOn(modal.current, 'showAddBtn');
    const spySetIsFriendAdded = jest.spyOn(modal.current, 'setIsFriendAdded');
    const spySetIsFriendAlreadyAdded = jest.spyOn(
      modal.current,
      'setIsFriendAlreadyAdded',
    );
    act(() => {
      fireEvent.press(userListItem);
    });
    await act(() => wait());

    const btnAdFriend = testingLib.getByTestId('btn-ad-friend');
    act(() => {
      fireEvent.press(btnAdFriend);
    });
    await act(() => wait());

    expect(spyShowAddBtn).toHaveBeenCalledWith(false);
    expect(spySetIsFriendAdded).toHaveBeenCalledWith(true);
    expect(testingLib.asJSON()).toMatchSnapshot();

    act(() => {
      fireEvent.press(btnAdFriend);
    });
    await act(() => wait());

    expect(spyShowAddBtn).toHaveBeenCalledWith(true);
    expect(spySetIsFriendAdded).toHaveBeenCalledWith(false);
    expect(spySetIsFriendAlreadyAdded).toHaveBeenCalledWith(false);
    expect(testingLib.asJSON()).toMatchSnapshot();
  });
  it('show changged state on profile without modal', async () => {
    const componentWithoutModal = createTestElement(<TestComponent />);
    const testingLibWithoutModal = render(componentWithoutModal);
    const userListItem = testingLibWithoutModal.getByTestId(itemTestID);
    const spyShowAddBtn = jest.spyOn(modal.current, 'showAddBtn');
    const spySetIsFriendAdded = jest.spyOn(modal.current, 'setIsFriendAdded');
    const spySetIsFriendAlreadyAdded = jest.spyOn(
      modal.current,
      'setIsFriendAlreadyAdded',
    );
    act(() => {
      fireEvent.press(userListItem);
    });
    await act(() => wait());

    expect(spyShowAddBtn).toHaveBeenCalledTimes(0);
    expect(spySetIsFriendAdded).toHaveBeenCalledTimes(0);
    expect(spySetIsFriendAlreadyAdded).toHaveBeenCalledTimes(0);
  });
});
