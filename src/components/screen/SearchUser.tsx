import { Animated, FlatList } from 'react-native';
import { ApolloQueryResult, OperationVariables } from 'apollo-client';
import {
  QUERY_FRIENDS,
  QUERY_USERS,
  QueryUsersInput,
} from '../../graphql/queries';
import React, { useMemo, useState } from 'react';

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
interface UserEdges {
  node: User;
  cursor: string;
}
interface QueryUsersData {
  users: {
    __typename: string;
    totalCount: number;
    edges: UserEdges[];
    pageInfo: {
      startCursor: string;
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}
interface QueryFriendsData {
  friends: User[];
}
interface Props {
  users?: User[];
  queryArgs?: QueryUsersInput;
  onDeleteFriend?: (modal?: Modal) => () => void;
  onAddFriend?: (modal?: Modal) => () => void;
}

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
    fetchMore: fetchMoreUsers,
  } = useQuery<QueryUsersData, QueryUsersInput>(QUERY_USERS, {
    fetchPolicy: 'network-only',
    variables:
      debouncedText === ''
        ? props.queryArgs || { first: 20 }
        : {
          first: 20,
          filter: true,
          user: {
            email: debouncedText,
            name: debouncedText,
            nickname: debouncedText,
          },
        },
  });

  const users = useMemo(() => {
    return usersData?.users?.edges?.map((edge: UserEdges) => edge?.node) || [];
  }, [usersData]);

  if (usersQueryError) {
    return (
      <ErrorView
        body={usersQueryError.message}
        onButtonPressed={(): Promise<ApolloQueryResult<QueryUsersData>> =>
          refetchUsers({ first: 20 })
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

  const onChangeText = (text: string): void => {
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
    const userListOnPressInlineFn = (): void => {
      const deleteMode = !friendsData
        ? false
        : !friendsData.friends
          ? false
          : friendsData.friends.findIndex((friend) => friend.id === item.id) > -1;
      showModal({
        user: item,
        deleteMode,
      });
    };
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

    const onEndReached = (): void => {
      const { endCursor } = usersData?.users?.pageInfo || {};
      const variables =
        debouncedText === ''
          ? {
            first: 20,
            after: endCursor,
          }
          : {
            first: 20,
            after: endCursor,
            filter: true,
            user: {
              email: debouncedText,
              name: debouncedText,
              nickname: debouncedText,
            },
          };
      const updateQuery = (
        previousResult: QueryUsersData,
        { fetchMoreResult }: OperationVariables,
      ): QueryUsersData => {
        const { edges: prevEdges, __typename } = previousResult.users;
        const { edges: newEdges, pageInfo, totalCount } = fetchMoreResult.users;
        return newEdges.length
          ? {
            users: {
              __typename,
              totalCount,
              edges: [...prevEdges, ...newEdges],
              pageInfo,
            },
          }
          : previousResult;
      };
      fetchMoreUsers({ variables, updateQuery });
    };
    return (
      <StyledAnimatedFlatList
        testID="animated-flatlist"
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
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        scrollEventThrottle={500}
      />
    );
  };

  return (
    <StyledSafeAreaView>
      <Container>
        <SearchTextInput
          testID="text-input"
          containerStyle={{ marginTop: 12 }}
          onChangeText={onChangeText}
          value={searchText}
        />
        {renderUsers()}
      </Container>
    </StyledSafeAreaView>
  );
};

export default Screen;
