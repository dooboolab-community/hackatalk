import {FlatList, ListRenderItem} from 'react-native';
import React, {FC, Suspense, useMemo} from 'react';
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
  useSubscription,
} from 'react-relay';

import CustomLoadingIndicator from '../uis/CustomLoadingIndicator';
import EmptyListItem from '../uis/EmptyListItem';
import {FriendFriendsPaginationQuery} from '../../__generated__/FriendFriendsPaginationQuery.graphql';
import {GraphQLSubscriptionConfig} from 'relay-runtime';
import {MainFriendUserUpdatedSubscription} from '../../__generated__/MainFriendUserUpdatedSubscription.graphql';
import {MainFriend_friends$key} from '../../__generated__/MainFriend_friends.graphql';
import {ProfileModal_user$key} from '../../__generated__/ProfileModal_user.graphql';
import UserListItem from '../uis/UserListItem';
import {friendsQuery} from '../../relay/queries/Friend';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';
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
          ...ProfileModal_user
          ...UserListItem_user
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

const userUpdatedSubscription = graphql`
  subscription MainFriendUserUpdatedSubscription {
    userUpdated {
      id
      ...ProfileModal_user
      ...UserListItem_user
    }
  }
`;

const FriendsFragment: FC<FriendsFragmentProps> = ({friendsKey}) => {
  const {showModal} = useProfileContext();

  const {data, loadNext, isLoadingNext, refetch} = usePaginationFragment<
    FriendFriendsPaginationQuery,
    MainFriend_friends$key
  >(friendsFragment, friendsKey);

  const subscriptionConfig = useMemo<
    GraphQLSubscriptionConfig<MainFriendUserUpdatedSubscription>
  >(
    () => ({
      variables: {},
      subscription: userUpdatedSubscription,
    }),
    [],
  );

  useSubscription(subscriptionConfig);

  const nodes = useMemo(() => {
    return (
      data.friends?.edges
        ?.filter((x): x is NonNullable<typeof x> => x !== null)
        .map((x) => x.node)
        ?.filter((x): x is NonNullable<typeof x> => x !== null) ?? []
    );
  }, [data]);

  const userListOnPress = (user: ProfileModal_user$key): void => {
    showModal({
      user,
    });
  };

  const renderItem: ListRenderItem<typeof nodes[number]> = ({item}) => {
    const userListOnPressInlineFn = (): void => userListOnPress(item);

    return (
      <UserListItem showStatus user={item} onPress={userListOnPressInlineFn} />
    );
  };

  return (
    <FlatList
      testID="friend-list"
      style={{
        alignSelf: 'stretch',
      }}
      contentContainerStyle={
        nodes.length === 0
          ? {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }
          : undefined
      }
      keyExtractor={(item, index): string => index.toString()}
      data={nodes}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListItem>{getString('NO_FRIENDLIST')}</EmptyListItem>
      }
      refreshing={isLoadingNext}
      onRefresh={() => {
        refetch({first: ITEM_CNT}, {fetchPolicy: 'network-only'});
      }}
      onEndReachedThreshold={0.1}
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
      <Suspense fallback={<CustomLoadingIndicator />}>
        <Friend />
      </Suspense>
    </Container>
  );
};

export default Screen;
