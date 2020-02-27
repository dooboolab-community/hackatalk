import { Animated, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import { ApolloQueryResult } from 'apollo-client';
import EmptyListItem from '../shared/EmptyListItem';
import ErrorView from '../shared/ErrorView';
import { Ref as ProfileModalRef } from '../shared/ProfileModal';
import { QUERY_USERS } from '../../graphql/queries';
import SearchTextInput from '../shared/SearchTextInput';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useFriendContext } from '../../providers/FriendProvider';
import { useProfileContext } from '../../providers/ProfileModalProvider';
import { useQuery } from '@apollo/react-hooks';

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

type Modal = React.MutableRefObject<ProfileModalRef | null | undefined>;
interface Users {
  users: User[];
}
interface Props {
  users?: User[];
  onDeleteFriend?: (modal?: Modal) => () => void;
  onAddFriend?: (modal?: Modal) => () => void;
}
interface StateSetters {
  setUsers: (users: User[]) => void;
  setSearchedUsers: (users: User[]) => void;
}
interface ShowModalParams {
  user: User;
  deleteMode: boolean;
  isFriendAlreadyAdded?: boolean;
  onDeleteFriend?: () => void;
  onAddFriend?: () => void;
}
interface UserListOnPress {
  user: User;
  friends: User[];
  modal?: Modal;
  showModal: (showModalParams: ShowModalParams) => void;
  event: {
    onDeleteFriend: (modal?: Modal) => () => void;
    onAddFriend: (modal?: Modal) => () => void;
  };
}
export const updateUsers = ({ data, stateSetters }: { data?: Users; stateSetters: StateSetters }): Users | void => {
  const { setUsers, setSearchedUsers } = stateSetters;
  if (data?.users) {
    setUsers(data.users);
    setSearchedUsers(data.users);
  }
  return data;
};
export const onDeleteFriend = (
  modal?: Modal,
) => (): void => {
  if (modal && modal.current) {
    const profileModal = modal.current;
    profileModal.showAddBtn(true);
    profileModal.setIsFriendAdded(false);
    profileModal.setIsFriendAlreadyAdded(false);
  }
};
export const onAddFriend = (
  modal?: Modal,
) => (): void => {
  if (modal && modal.current) {
    const profileModal = modal.current;
    profileModal.showAddBtn(false);
    profileModal.setIsFriendAdded(true);
  }
};
const userListOnPress = ({
  user,
  friends,
  modal,
  showModal,
  event,
}: UserListOnPress) => (): void => {
  const { onDeleteFriend, onAddFriend } = event;
  const deleteMode =
    friends.findIndex((friend) => friend.id === user.id) !== -1;
  showModal({
    user,
    deleteMode,
    isFriendAlreadyAdded: deleteMode,
    onDeleteFriend: onDeleteFriend(modal),
    onAddFriend: onAddFriend(modal),
  });
};
const Screen = (props: Props): React.ReactElement => {
  const { state, showModal } = useProfileContext();
  const {
    friendState: { friends },
  } = useFriendContext();
  const scrollY = new Animated.Value(0);

  const { loading, data, error, refetch } = useQuery<Users>(QUERY_USERS, {
    fetchPolicy: 'network-only',
  });

  const [searchedUsers, setSearchedUsers] = useState<User[]>(props.users || []);
  const [users, setUsers] = useState<User[]>(props.users || []);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    updateUsers({
      data,
      stateSetters: {
        setUsers,
        setSearchedUsers,
      },
    });
  }, [data]);

  if (error) {
    return <ErrorView body={error.message} onButtonPressed={(): Promise<ApolloQueryResult<Users>> => refetch()} />;
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: User;
    index: number;
  }): React.ReactElement => {
    const itemTestID = `user-list-item${index}`;
    const userListOnPressInlineFn = userListOnPress({
      user: item,
      friends,
      modal: state.modal,
      showModal,
      event: {
        onDeleteFriend: props.onDeleteFriend || onDeleteFriend,
        onAddFriend: props.onAddFriend || onAddFriend,
      },
    });
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
        : searchedUsers.filter(
          (item) =>
            item.nickname && item.nickname.toLowerCase().includes(searchText),
        );
    setUsers(searchedUser);
  };
  const onTxtChanged = (text: string): void => {
    const lowercaseTxt = text.toLowerCase();
    searchUsers(lowercaseTxt);
    setSearchText(lowercaseTxt);
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
          onChangeText={onTxtChanged}
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
