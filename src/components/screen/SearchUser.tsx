import { Animated, FlatList } from 'react-native';
import React, { useState } from 'react';

import EmptyListItem from '../shared/EmptyListItem';
import SearchTextInput from '../shared/SearchTextInput';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useFriendContext } from '../../providers/FriendProvider';
import { useProfileContext } from '../../providers/ProfileModalProvider';

export const fakeUsers: User[] = [
  {
    id: '1',
    nickname: 'admin',
    thumbURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    statusMessage: 'this is my status message......',
    isOnline: true,
  },
  {
    id: '2',
    nickname: 'geoseong-hello-hello-hello-hello-hello-hello-hello-hello',
    thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    statusMessage: 'hi I am fine -hello-hello-hello',
    isOnline: false,
  },
  {
    id: '3',
    nickname: 'hyochan',
    thumbURL: 'https://avatars2.githubusercontent.com/u/27461460?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/27461460?s=460&v=4',
    statusMessage: 'hello',
    isOnline: false,
  },
  {
    id: '4',
    nickname: 'mars',
    thumbURL: 'https://avatars0.githubusercontent.com/u/6101260?s=460&v=4',
    photoURL: 'https://avatars0.githubusercontent.com/u/6101260?s=460&v=4',
    statusMessage: 'offline',
    isOnline: true,
  },
  {
    id: '5',
    nickname: 'gordon',
    thumbURL: 'https://avatars0.githubusercontent.com/u/10363850?s=460&v=4',
    photoURL: 'https://avatars0.githubusercontent.com/u/10363850?s=460&v=4',
    statusMessage: 'offline',
    isOnline: true,
  },
  {
    id: '6',
    nickname: 'admin2',
    thumbURL: 'https://avatars3.githubusercontent.com/u/31645570?s=200&v=4',
    photoURL: 'https://avatars3.githubusercontent.com/u/31645570?s=200&v=4',
    statusMessage: 'how are you',
    isOnline: true,
  },
  {
    id: '7',
    nickname: 'geoseong2',
    thumbURL:
      'https://blogpfthumb-phinf.pstatic.net/20151226_89/imf4_1451062410452TqxER_JPEG/20120428000007_1.jpg',
    photoURL:
      'https://blogpfthumb-phinf.pstatic.net/20151226_89/imf4_1451062410452TqxER_JPEG/20120428000007_1.jpg',
    statusMessage: 'offline',
    isOnline: false,
  },
  {
    id: '8',
    nickname: 'hyochan2',
    thumbURL:
      'https://i.ytimg.com/vi/NgKSEvqzYvo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWBWqCeP5oTwaB6XMRGXEhvbIiIA',
    photoURL:
      'https://i.ytimg.com/vi/NgKSEvqzYvo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWBWqCeP5oTwaB6XMRGXEhvbIiIA',
    statusMessage: 'offline',
    isOnline: false,
  },
  {
    id: '9',
    nickname: 'mars2',
    thumbURL:
      'https://github.com/marsinearth/violin-mockup/blob/master/static/favicons/android-chrome-192x192.png?raw=true',
    photoURL:
      'https://github.com/marsinearth/violin-mockup/blob/master/static/favicons/android-chrome-192x192.png?raw=true',
    statusMessage: 'offline',
    isOnline: true,
  },
  {
    id: '10',
    nickname: 'gordon2',
    thumbURL:
      'https://miro.medium.com/fit/c/256/256/2*rbUkfoA5vfuphYYULjIG_Q.png',
    photoURL:
      'https://miro.medium.com/fit/c/256/256/2*rbUkfoA5vfuphYYULjIG_Q.png',
    statusMessage: 'offline',
    isOnline: true,
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
`;
const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledAnimatedFlatList = styled(AnimatedFlatList)`
  width: 100%;
  height: 100%;
`;

const Screen = (): React.ReactElement => {
  const { state, showModal } = useProfileContext();
  const [searchedUsers] = useState<User[]>(fakeUsers);
  const [users, setUsers] = useState<User[]>(fakeUsers);
  const [searchText, setSearchText] = useState<string>('');
  const scrollY = new Animated.Value(0);

  const {
    friendState: { friends },
  } = useFriendContext();

  const userListOnPress = (user: User): void => {
    if (state.modal) {
      const deleteMode =
        friends.findIndex((friend) => friend.id === user.id) !== -1;
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
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: User;
    index: number;
  }): React.ReactElement => {
    const itemTestID = `user-list-item${index}`;
    const userListOnPressInlineFn = (): void => userListOnPress(item);
    return (
      <UserListItem
        testID={itemTestID}
        user={item}
        onPress={userListOnPressInlineFn}
      />
    );
  };

  const searchUsers = (searchText: string): void => {
    const searchedUser =
      searchText === ''
        ? searchedUsers
        : searchedUsers.filter((item) => item.nickname && item.nickname.includes(searchText));
    setUsers(searchedUser);
  };

  const onChangeText = (text: string): void => {
    searchUsers(text);
    setSearchText(text);
    scrollY.setValue(0);
    Animated.timing(scrollY, {
      toValue: 100,
      duration: 500,
    }).start();
  };

  const getContentContainerStyle = (): object | null => {
    return users.length === 0
      ? {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
      : null;
  };

  return (
    <StyledSafeAreaView>
      <Container>
        <SearchTextInput
          testID="text-input"
          onChangeText={onChangeText}
          value={searchText}
        />
        <StyledAnimatedFlatList
          testID="animated-flatlist"
          // @ts-ignore
          testObj={{ scrollY }}
          style={{
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 50, 100],
                  outputRange: [0, 25, 0],
                }),
              },
            ],
          }}
          contentContainerStyle={getContentContainerStyle}
          keyExtractor={(item: object, index: number): string =>
            index.toString()
          }
          data={users}
          renderItem={renderItem}
          ListEmptyComponent={
            <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
          }
        />
      </Container>
    </StyledSafeAreaView>
  );
};

export default Screen;
