import { Animated, FlatList } from 'react-native';
import {
  QUERY_FRIENDS,
  QUERY_USERS,
  QueryUsersInput,
} from '../../graphql/queries';
import React, { useMemo, useState } from 'react';

import { ApolloQueryResult } from 'apollo-client';
import EmptyListItem from '../shared/EmptyListItem';
import ErrorView from '../shared/ErrorView';
import { LoadingIndicator } from '@dooboo-ui/native';
import { Ref as ProfileModalRef } from '../shared/ProfileModal';
import SearchTextInput from '../shared/SearchTextInput';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import useDebounce from '../../hooks/useDebounce';
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
interface QueryUsersData {
  users: {
    edges: {
      node: User;
    }[];
  };
}
interface QueryFriendsData {
  friends: User[];
}
interface Props {
  users?: User[];
  onDeleteFriend?: (modal?: Modal) => () => void;
  onAddFriend?: (modal?: Modal) => () => void;
}
interface ShowModalParams {
  user: User;
  deleteMode: boolean;
  onDeleteFriend?: () => void;
  onAddFriend?: () => void;
}
interface UserListOnPress {
  user: User;
  friends?: User[];
  modal?: Modal;
  showModal: (showModalParams: ShowModalParams) => void;
  event: {
    onDeleteFriend: (modal?: Modal) => () => void;
    onAddFriend: (modal?: Modal) => () => void;
  };
}

export const onDeleteFriend = (modal?: Modal) => (): void => {
  if (modal && modal.current) {
    const profileModal = modal.current;
    profileModal.showAddBtn(true);
    profileModal.setIsFriendAdded(false);
  }
};

export const onAddFriend = (modal?: Modal) => (): void => {
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
    friends?.findIndex((friend) => friend.id === user.id) !== -1;
  showModal({
    user,
    deleteMode,
    onDeleteFriend: onDeleteFriend(modal),
    onAddFriend: onAddFriend(modal),
  });
};
const Screen = (props: Props): React.ReactElement => {
  const { state, showModal } = useProfileContext();

  const scrollY = new Animated.Value(0);

  const {
    loading: loadingFriends,
    error: friendsQueryError,
    data: friendsData,
    refetch: refetchFreinds,
  } = useQuery<QueryFriendsData>(QUERY_FRIENDS, {
    fetchPolicy: 'network-only',
  });

  const [searchText, setSearchText] = useState<string>('');
  const debouncedText = useDebounce(searchText, 500);

  const {
    loading: loadingUsers,
    data: usersData,
    error: usersQueryError,
    refetch: refetchUsers,
  } = useQuery<QueryUsersData, QueryUsersInput>(QUERY_USERS, {
    fetchPolicy: 'network-only',
    variables:
      debouncedText === ''
        ? undefined
        : {
          nickname: debouncedText,
        },
  });

  const users = useMemo(() => {
    return usersData?.users?.edges?.map((edge) => edge?.node) || [];
  }, [usersData]);

  if (usersQueryError) {
    return (
      <ErrorView
        body={usersQueryError.message}
        onButtonPressed={(): Promise<ApolloQueryResult<QueryUsersData>> =>
          refetchUsers()
        }
      />
    );
  }

  if (friendsQueryError) {
    return (
      <ErrorView
        body={friendsQueryError.message}
        onButtonPressed={(): Promise<ApolloQueryResult<QueryFriendsData>> =>
          refetchFreinds()
        }
      />
    );
  }

  const onTxtChanged = (text: string): void => {
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
      friends: friendsData?.friends,
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

  const renderUsers = (): React.ReactElement => {
    if (loadingUsers || loadingFriends) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }

    return (
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
        keyExtractor={(item: object, index: number): string => index.toString()}
        data={users}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
    );
  };

  return (
    <StyledSafeAreaView>
      <Container>
        <SearchTextInput
          testID="text-input"
          onChangeText={onTxtChanged}
          value={searchText}
        />
        {renderUsers()}
      </Container>
    </StyledSafeAreaView>
  );
};

export default Screen;
