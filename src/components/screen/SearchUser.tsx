import { Animated, FlatList } from 'react-native';
import React, { useState } from 'react';

import EmptyListItem from '../shared/EmptyListItem';
import { IC_SEARCH } from '../../utils/Icons';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useFriendContext } from '../../providers/FriendProvider';
import { useProfileContext } from '../../providers/ProfileModalProvider';

export const fakeUsers: User[] = [
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
  {
    uid: '3',
    displayName: 'hyochan',
    thumbURL: 'https://avatars2.githubusercontent.com/u/27461460?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/27461460?s=460&v=4',
    statusMsg: 'offline',
    online: false,
  },
  {
    uid: '4',
    displayName: 'mars',
    thumbURL: 'https://avatars0.githubusercontent.com/u/6101260?s=460&v=4',
    photoURL: 'https://avatars0.githubusercontent.com/u/6101260?s=460&v=4',
    statusMsg: 'offline',
    online: true,
  },
  {
    uid: '5',
    displayName: 'gordon',
    thumbURL: 'https://avatars0.githubusercontent.com/u/10363850?s=460&v=4',
    photoURL: 'https://avatars0.githubusercontent.com/u/10363850?s=460&v=4',
    statusMsg: 'offline',
    online: true,
  },
  {
    uid: '6',
    displayName: 'admin2',
    thumbURL: 'https://avatars3.githubusercontent.com/u/31645570?s=200&v=4',
    photoURL: 'https://avatars3.githubusercontent.com/u/31645570?s=200&v=4',
    statusMsg: 'online',
    online: true,
  },
  {
    uid: '7',
    displayName: 'geoseong2',
    thumbURL:
      'https://blogpfthumb-phinf.pstatic.net/20151226_89/imf4_1451062410452TqxER_JPEG/20120428000007_1.jpg',
    photoURL:
      'https://blogpfthumb-phinf.pstatic.net/20151226_89/imf4_1451062410452TqxER_JPEG/20120428000007_1.jpg',
    statusMsg: 'offline',
    online: false,
  },
  {
    uid: '8',
    displayName: 'hyochan2',
    thumbURL:
      'https://i.ytimg.com/vi/NgKSEvqzYvo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWBWqCeP5oTwaB6XMRGXEhvbIiIA',
    photoURL:
      'https://i.ytimg.com/vi/NgKSEvqzYvo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWBWqCeP5oTwaB6XMRGXEhvbIiIA',
    statusMsg: 'offline',
    online: false,
  },
  {
    uid: '9',
    displayName: 'mars2',
    thumbURL:
      'https://github.com/marsinearth/violin-mockup/blob/master/static/favicons/android-chrome-192x192.png?raw=true',
    photoURL:
      'https://github.com/marsinearth/violin-mockup/blob/master/static/favicons/android-chrome-192x192.png?raw=true',
    statusMsg: 'offline',
    online: true,
  },
  {
    uid: '10',
    displayName: 'gordon2',
    thumbURL:
      'https://miro.medium.com/fit/c/256/256/2*rbUkfoA5vfuphYYULjIG_Q.png',
    photoURL:
      'https://miro.medium.com/fit/c/256/256/2*rbUkfoA5vfuphYYULjIG_Q.png',
    statusMsg: 'offline',
    online: true,
  },
];
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
`;
const StyledContainer = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledSearchView = styled.View`
  width: 100%;
  height: 50;
  justify-content: center;
  overflow: hidden;
`;
const StyledAnimatedFlatList = styled(AnimatedFlatList)`
  width: 100%;
  height: 100%;
`;
const StyledTextInputWrapper = styled.View`
  width: 100%;
  height: 50;
  position: absolute;
  padding-horizontal: 20;
`;
const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 30;
  top: 10;
  color: ${({ theme }): string => theme.fontColor};
  background-color: ${({ theme }): string => theme.searchBackground};
  border-radius: 4;
  padding-left: 34;
  padding-right: 10;
`;
const StyledSearchImage = styled.Image`
  width: 16;
  height: 16;
  position: absolute;
  top: 18;
  left: 30;
`;

const Screen = (): React.ReactElement => {
  const { state, showModal } = useProfileContext();
  const [searchedUsers, setSearchedUsers] = useState<User[]>(fakeUsers);
  const [users, setUsers] = useState<User[]>(fakeUsers);
  const scrollY = new Animated.Value(0);

  const {
    friendState: { friends },
  } = useFriendContext();

  const userListOnPress = (user: User): void => {
    if (state.modal) {
      const deleteMode =
        friends.findIndex((friend) => friend.uid === user.uid) !== -1;
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
    const itemTestID = `userListItem${index}`;
    const userListOnPressInlineFn = (): void => userListOnPress(item);
    return (
      <UserListItem
        testID={itemTestID}
        user={item}
        onPress={userListOnPressInlineFn}
      />
    );
  };
  const onSearch = (txt: string): void => {
    const searchedUser =
      txt === ''
        ? searchedUsers
        : searchedUsers.filter((item) => item.displayName.includes(txt));
    setUsers(searchedUser);
  };
  const onTxtChanged = (txt: string): void => {
    onSearch(txt);
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
      <StyledContainer>
        <StyledSearchView>
          <StyledTextInputWrapper>
            <StyledTextInput
              testID="txtInput"
              onChangeText={onTxtChanged}
              underlineColorAndroid="transparent" // android fix
              autoCapitalize="none"
              autoCorrect={false}
              multiline={false}
              defaultValue={''}
            />
            <StyledSearchImage source={IC_SEARCH} />
          </StyledTextInputWrapper>
        </StyledSearchView>
        <StyledAnimatedFlatList
          testID="animatedFlatlist"
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
      </StyledContainer>
    </StyledSafeAreaView>
  );
};

export default Screen;
