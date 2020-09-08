import React, { ReactElement, useEffect, useState } from 'react';
import { User, UserEdge } from '../../types/graphql';
import { fetchQuery, graphql, useRelayEnvironment } from 'react-relay/hooks';

import EmptyListItem from '../shared/EmptyListItem';
import { FlatList } from 'react-native';
import { FriendFriendsQuery } from '../../__generated__/FriendFriendsQuery.graphql';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useProfileContext } from '../../providers/ProfileModalProvider';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${({ theme }): string => theme.background};
  align-items: center;
  justify-content: center;
`;

const friendsQuery = graphql`
  query FriendFriendsQuery {
    me {
      friends(first: 10) {
        edges {
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
            createdAt
            updatedAt
            deletedAt
          }
        }
      }
    }
  }
`;

export default function Screen(): ReactElement {
  const { state, showModal } = useProfileContext();
  const [friends, setFriends] = useState<any>([]);
  const environment = useRelayEnvironment();

  useEffect(() => {
    const subscription = fetchQuery<FriendFriendsQuery>(environment, friendsQuery, {}).subscribe({
      next: (data) => setFriends(data?.me?.friends?.edges || []),
    });

    // Clean up.
    return (): void => subscription.unsubscribe();
  }, []);

  const userListOnPress = (user: User): void => {
    if (state.modal) {
      showModal({
        user,
        deleteMode: true,
      });
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: UserEdge;
    index: number;
  }): ReactElement => {
    const testID = `user-id-${index}`;
    const userListOnPressInlineFn = (): void => userListOnPress(item.node);
    return (
      <UserListItem
        testID={testID}
        user={item.node}
        onPress={userListOnPressInlineFn}
      />
    );
  };

  return (
    <Container>
      <FlatList
        testID="friend-list"
        style={{
          alignSelf: 'stretch',
        }}
        contentContainerStyle={
          friends.length === 0
            ? {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }
            : undefined
        }
        keyExtractor={(item, index): string => index.toString()}
        data={friends}
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
    </Container>
  );
}
