import React, { ReactElement, useEffect } from 'react';

import { ApolloQueryResult } from 'apollo-client';
import EmptyListItem from '../shared/EmptyListItem';
import ErrorView from '../shared/ErrorView';
import { FlatList } from 'react-native';
import { LoadingIndicator } from '@dooboo-ui/native';
import { QUERY_FRIENDS } from '../../graphql/queries';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useFriendContext } from '../../providers/FriendProvider';
import { useProfileContext } from '../../providers/ProfileModalProvider';
import { useQuery } from '@apollo/react-hooks';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${({ theme }): string => theme.background};
  align-items: center;
  justify-content: center;
`;

export default function Screen(): ReactElement {
  const { state, showModal } = useProfileContext();
  const {
    friendState: { friends },
    setFriends,
  } = useFriendContext();
  const { loading, error, data, refetch } = useQuery<{ friends: User[] }, {}>(QUERY_FRIENDS);

  useEffect(() => {
    if (data && data.friends) {
      setFriends(data.friends);
    }
  }, [data]);

  const userListOnPress = (user: User): void => {
    if (state.modal) {
      showModal({
        user,
        deleteMode: true,
        onDeleteFriend: (): void => {
          if (state.modal && state.modal.current) {
            const profileModal = state.modal.current;
            profileModal.close();
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
  }): ReactElement => {
    const testID = `user-id-${index}`;
    const userListOnPressInlineFn = (): void => userListOnPress(item);
    return (
      <UserListItem
        testID={testID}
        user={item}
        onPress={userListOnPressInlineFn}
      />
    );
  };

  if (loading) {
    return (<Container><LoadingIndicator /></Container>);
  }
  if (error) {
    return <ErrorView
      body={error.message}
      onButtonPressed={(): Promise<ApolloQueryResult<{ friends: User[] }>> => refetch()}
    />;
  }

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
            : null
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
