import * as React from 'react';

import { Button, FlatList, View } from 'react-native';
import { FriendProvider, useFriendContext } from '../FriendProvider';
import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import { ThemeProvider } from '../ThemeProvider';
import { User } from '../../types';
import UserListItem from '../../components/shared/UserListItem';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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
    displayName: 'zeoseong',
    thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    statusMsg: 'offline',
    online: false,
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
        keyExtractor={(item): string => `${item.uid}`}
        data={friends}
        renderItem={renderItem}
      />
    </View>
  );
};

const TestComponent = (): React.ReactElement => (
  <FriendProvider>
    <ThemeProvider>
      <FakeChild />
    </ThemeProvider>
  </FriendProvider>
);

describe('[FriendProvider] rendering test', () => {
  let json;

  it('component and snapshot matches', () => {
    json = renderer.create(<TestComponent />).toJSON();
    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
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
    it('[FriendProvider] add unregistered friend and registered friend', () => {
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
      ].sort((a, b) => (a.displayName > b.displayName ? 1 : -1));
      expect(friendList.props.data).toMatchObject(registeredFriendList);

      //
      act(() => {
        fireEvent.press(btnAdd1);
      });
      friendList = testingLib.queryByTestId('friend-list');
      expect(friendList.props.data.length).toBe(initFriendCount + 1);
      expect(friendList.props.data).toMatchObject(registeredFriendList);
    });

    it('[FriendProvider] add registered friends', () => {
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
      ].sort((a, b) => (a.displayName > b.displayName ? 1 : -1));
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

    it('[FriendProvider] delete registered friend and unregistered friend', () => {
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

    it('[FriendProvider] delete registered friends', () => {
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
