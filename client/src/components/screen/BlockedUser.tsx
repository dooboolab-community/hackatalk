import type {
  BlockedUsersQuery,
  BlockedUsersQueryResponse,
  BlockedUsersQueryVariables,
} from '../../__generated__/BlockedUsersQuery.graphql';
import { FlatList, View } from 'react-native';
import React, { FC, Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import EmptyListItem from '../shared/EmptyListItem';
import { LoadingIndicator } from 'dooboo-ui';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import { User } from '../../types/graphql';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useProfileContext } from '../../providers/ProfileModalProvider';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

const blockedUsersQuery = graphql`
  query BlockedUsersQuery {
    blockedUsers {
      id
      email
      name
      nickname
      hasBlocked
      photoURL
      thumbURL
      photoURL
      statusMessage
    }
  }
`;

const ContentContainer: FC = () => {
  const { showModal } = useProfileContext();

  const {
    blockedUsers = [],
  }: BlockedUsersQueryResponse = useLazyLoadQuery<BlockedUsersQuery>(
    blockedUsersQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: User;
    index: number;
  }): React.ReactElement => {
    const itemTestID = `user-list-item${index}`;

    const pressUserItem = (): void => {
      showModal({
        user: item,
        isFriend: false,
        hideButtons: true,
      });
    };

    return (
      <UserListItem testID={itemTestID} user={item} onPress={pressUserItem} />
    );
  };

  return (
    <FlatList
      style={{ alignSelf: 'stretch' }}
      contentContainerStyle={
        blockedUsers?.length === 0
          ? {
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }
          : null
      }
      keyExtractor={(_, index): string => index.toString()}
      // @ts-ignore
      data={blockedUsers}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListItem>{getString('NO_BANNED_USER')}</EmptyListItem>
      }
      ListFooterComponent={<View style={{ height: 60 }} />}
      onEndReachedThreshold={0.1}
    />
  );
};

const Page: FC<Props> = () => {
  return (
    <Container>
      <Suspense fallback={<LoadingIndicator />}>
        <ContentContainer />
      </Suspense>
    </Container>
  );
};

export default Page;
