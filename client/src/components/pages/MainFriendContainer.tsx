import React, {FC, Suspense, useMemo} from 'react';
import {User, UserConnection} from '../../types/graphql';
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay/hooks';

import {FriendFriendsPaginationQuery} from '../../__generated__/FriendFriendsPaginationQuery.graphql';
import {LoadingIndicator} from 'dooboo-ui';
import MainFriendTemp from '../templates/MainFriendTemp';
import {MainFriend_friends$key} from '../../__generated__/MainFriend_friends.graphql';
import {friendsQuery} from '../../relay/queries/Friend';
import styled from 'styled-components/native';
import {useProfileContext} from '../../providers/ProfileModalProvider';

const ITEM_CNT = 20;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${({theme}) => theme.background};
  align-items: center;
  justify-content: center;
`;

const friendsFragment = graphql`
  fragment MainFriend_friends on Query
  @argumentDefinitions(first: {type: "Int!"}, after: {type: "String"})
  @refetchable(queryName: "FriendFriendsPaginationQuery") {
    friends(first: $first, after: $after, searchText: $searchText)
      @connection(key: "MainFriend_friends", filters: []) {
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
  friendsKey: MainFriend_friends$key;
};

const FriendsFragment: FC<FriendsFragmentProps> = ({friendsKey}) => {
  const {showModal} = useProfileContext();

  const {data, loadNext, isLoadingNext, refetch} = usePaginationFragment<
    FriendFriendsPaginationQuery,
    MainFriend_friends$key
  >(friendsFragment, friendsKey);

  const pressUserList = (user?: User | null): void => {
    if (user)
      showModal({
        user,
        isFriend: true,
      });
  };

  const friendEdges = useMemo(() => {
    return (
      (data?.friends as UserConnection)?.edges?.filter(
        (x): x is NonNullable<typeof x> => x !== null,
      ) || []
    );
  }, [data]);

  return (
    <MainFriendTemp
      friendEdges={friendEdges}
      refreshing={isLoadingNext}
      onUserListPressed={pressUserList}
      onRefresh={() => {
        refetch({first: ITEM_CNT}, {fetchPolicy: 'network-only'});
      }}
      onEndReached={() => loadNext(ITEM_CNT)}
    />
  );
};

const Friend: FC = () => {
  const queryResponse = useLazyLoadQuery<FriendFriendsPaginationQuery>(
    friendsQuery,
    {first: ITEM_CNT},
    {fetchPolicy: 'store-or-network'},
  );

  return <FriendsFragment friendsKey={queryResponse} />;
};

const Screen: FC = () => {
  return (
    <Container>
      <Suspense fallback={<LoadingIndicator />}>
        <Friend />
      </Suspense>
    </Container>
  );
};

export default Screen;
