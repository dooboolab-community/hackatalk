import * as React from 'react';

import { Button, FlatList, View } from 'react-native';
import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import { AllProviders } from '../../providers';
import { User } from '../../types';
import UserListItem from '../../components/shared/UserListItem';
import { useFriendContext } from '../FriendProvider';

const fakeUsers: User[] = [
  {
    id: '1',
    nickname: 'admin',
    thumbURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    statusMessage: 'online',
    isOnline: true,
  },
  {
    id: '2',
    nickname: 'zeoseong',
    thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    statusMessage: 'hello',
    isOnline: false,
  },
];

const FakeChild = (): React.ReactElement => {
  const {
    friendState: { friends },
    addFriend,
    deleteFriend,
  } = useFriendContext();

  const renderItem = ({ item }): React.ReactElement => (
    <UserListItem user={item} />
  );

  return (
    <View testID="fake-child">
      <Button
        testID="btn-add-1"
        title="add"
        onPress={(): void => addFriend(fakeUsers[0])}
      />
      <Button
        testID="btn-add-2"
        title="add"
        onPress={(): void => addFriend(fakeUsers[1])}
      />
      <Button
        testID="btn-delete-1"
        title="delete"
        onPress={(): void => deleteFriend(fakeUsers[0])}
      />
      <Button
        testID="btn-delete-2"
        title="delete"
        onPress={(): void => deleteFriend(fakeUsers[1])}
      />
      <FlatList
        testID="friend-list"
        keyExtractor={(item): string => `${item.id}`}
        data={friends}
        renderItem={renderItem}
      />
    </View>
  );
};

const TestComponent = (): React.ReactElement => (
  <AllProviders>
    <FakeChild />
  </AllProviders>
);

describe('[FriendProvider] rendering test', () => {
  it('component and snapshot matches', () => {
    const { baseElement } = render(<TestComponent/>);
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[FriendProvider] interactions', () => {
  let testingLib: RenderResult;
  let initFriendList: Partial<User>[];
  let initFriendCount: number;

  beforeEach(() => {
    testingLib = render(<TestComponent />);
    const friendList = testingLib.queryByTestId('friend-list');
    initFriendList = [...friendList.props.data];
    initFriendCount = initFriendList.length;
  });

  describe('[FriendProvider] add friends', () => {
    it('should be added only once, when add the same user twice', () => {
      const btnAdd1 = testingLib.queryByTestId('btn-add-1');

      //
      act(() => {
        fireEvent.press(btnAdd1);
      });
      let friendList = testingLib.queryByTestId('friend-list');
      expect(friendList.props.data.length).toBe(initFriendCount + 1);
      const registeredFriendList = [
        ...initFriendList,
        fakeUsers[0],
      ].sort((a, b) => (a.nickname > b.nickname ? 1 : -1));
      expect(friendList.props.data).toMatchObject(registeredFriendList);

      //
      act(() => {
        fireEvent.press(btnAdd1);
      });
      friendList = testingLib.queryByTestId('friend-list');
      expect(friendList.props.data.length).toBe(initFriendCount + 1);
      expect(friendList.props.data).toMatchObject(registeredFriendList);
    });

    it('should be added 2 users, when added 2 unregistered users', () => {
      const btnAdd1 = testingLib.queryByTestId('btn-add-1');
      const btnAdd2 = testingLib.queryByTestId('btn-add-2');
      act(() => {
        fireEvent.press(btnAdd1);
        fireEvent.press(btnAdd2);
      });
      const friendList = testingLib.queryByTestId('friend-list');
      const registeredFriendList = [
        ...initFriendList,
        fakeUsers[0],
        fakeUsers[1],
      ].sort((a, b) => (a.nickname > b.nickname ? 1 : -1));
      expect(friendList.props.data.length).toBe(initFriendCount + 2);
      expect(friendList.props.data).toMatchObject(registeredFriendList);
    });
  });

  describe('[FriendProvider] delete friends', () => {
    // add friends
    beforeEach(() => {
      const btnAdd1 = testingLib.queryByTestId('btn-add-1');
      const btnAdd2 = testingLib.queryByTestId('btn-add-2');
      act(() => {
        fireEvent.press(btnAdd1);
        fireEvent.press(btnAdd2);
      });
      const friendList = testingLib.queryByTestId('friend-list');
      initFriendList = friendList.props.data;
      initFriendCount = initFriendList.length;
    });

    it('should be deleted, when delete registered friend', () => {
      const btnDelete1 = testingLib.queryByTestId('btn-delete-1');

      //
      act(() => {
        fireEvent.press(btnDelete1);
      });
      let friendList = testingLib.queryByTestId('friend-list');
      expect(friendList.props.data.length).toBe(initFriendCount - 1);

      //
      act(() => {
        fireEvent.press(btnDelete1);
      });
      friendList = testingLib.queryByTestId('friend-list');
      expect(friendList.props.data.length).toBe(initFriendCount - 1);
    });

    it('should be deleted 2 user, when delete 2 registered friends', () => {
      const btnDelete1 = testingLib.queryByTestId('btn-delete-1');
      const btnDelete2 = testingLib.queryByTestId('btn-delete-2');

      //
      act(() => {
        fireEvent.press(btnDelete1);
        fireEvent.press(btnDelete2);
      });
      const friendList = testingLib.queryByTestId('friend-list');
      expect(friendList.props.data.length).toBe(initFriendCount - 2);
    });
  });
});
