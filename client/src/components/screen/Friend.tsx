import React, { FC, ReactElement, Suspense, useMemo } from 'react';
import { User, UserEdge } from '../../types/graphql';
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay/hooks';

import EmptyListItem from '../shared/EmptyListItem';
import { FlatList } from 'react-native';
import { FriendFriendsPaginationQuery } from '../../__generated__/FriendFriendsPaginationQuery.graphql';
import { FriendFriendsQuery } from '../../__generated__/FriendFriendsQuery.graphql';
import { Friend_friends$key } from '../../__generated__/Friend_friends.graphql';
import { LoadingIndicator } from 'dooboo-ui';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useProfileContext } from '../../providers/ProfileModalProvider';

const ITEM_CNT = 20;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${({ theme }): string => theme.background};
  align-items: center;
  justify-content: center;
`;

const friendsQuery = graphql`
  query FriendFriendsQuery($first: Int!, $after: String) {
    ...Friend_friends @arguments(first: $first, after: $after)
  }
`;

const friendsFragment = graphql`
  fragment Friend_friends on Query
    @argumentDefinitions(
      first: {type: "Int!"}
      after: {type: "String"}
    )
    @refetchable(queryName: "FriendFriendsPaginationQuery") {
      friends(first: $first, after: $after)
      @connection(key: "Friend_friends", filters: []) {
        edges {
          cursor
          node {
            id
            email
            name
            nickname
            thumbURL
            photoURL
            birthday
            gender
            phone
            statusMessage
            verified
            lastSignedIn
            isOnline
            hasBlocked
            createdAt
            updatedAt
            deletedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
`;

type FriendsFragmentProps = {
  friendsKey: Friend_friends$key
};

const FriendsFragment: FC<FriendsFragmentProps> = ({
  friendsKey,
}) => {
  const { showModal } = useProfileContext();

  const {
    data,
    loadNext,
    isLoadingNext,
    refetch,
  } = usePaginationFragment<FriendFriendsPaginationQuery, Friend_friends$key>(
    friendsFragment,
    friendsKey,
  );

  const userListOnPress = (user: User): void => {
    showModal({
      user,
      isFriend: true,
    });
  };

  const friendEdges = useMemo(() => {
    return data.friends.edges?.filter(
      (x): x is NonNullable<typeof x> => x !== null,
    ) || [];
  }, [data]);

  const renderItem = ({
    item,
    index,
  }: {
    item: UserEdge;
    index: number;
  }): ReactElement => {
    const testID = `user-id-${index}`;
    const userListOnPressInlineFn = (): void => userListOnPress(item.node as User);

    return (
      <UserListItem
        testID={testID}
        showStatus
        user={item.node as User}
        onPress={userListOnPressInlineFn}
      />
    );
  };

  return (
    <FlatList
      testID="friend-list"
      style={{
        alignSelf: 'stretch',
      }}
      contentContainerStyle={
        friendEdges.length === 0
          ? {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }
          : undefined
      }
      keyExtractor={(item, index): string => index.toString()}
      data={friendEdges as UserEdge[]}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListItem>{getString('NO_FRIENDLIST')}</EmptyListItem>
      }
      refreshing={isLoadingNext}
      onRefresh={() => {
        refetch(
          { first: ITEM_CNT },
          { fetchPolicy: 'network-only' },
        );
      }}
      onEndReachedThreshold={0.1}
      onEndReached={() => loadNext(ITEM_CNT)}
    />
  );
};

const Friend: FC = () => {
  const queryResponse = useLazyLoadQuery<FriendFriendsQuery>(
    friendsQuery,
    { first: ITEM_CNT },
    { fetchPolicy: 'store-or-network' },
  );

  return <FriendsFragment friendsKey={queryResponse} />;
};

const Screen: FC = () => {
  return <Container>
    <Suspense fallback={<LoadingIndicator/>}>
      <Friend/>
    </Suspense>
  </Container>;
};

export default Screen;
