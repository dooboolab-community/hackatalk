import {FlatList, ListRenderItem, View} from 'react-native';
import React, {FC, Suspense, useMemo} from 'react';

import EmptyListItem from '../uis/EmptyListItem';
import {LoadingIndicator} from 'dooboo-ui';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import type {UserBlockedUsersQuery} from '../../__generated__/UserBlockedUsersQuery.graphql';
import UserListItem from '../uis/UserListItem';
import {blockedUsersQuery} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useProfileContext} from '../../providers/ProfileModalProvider';

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

const ContentContainer: FC = () => {
  const {showModal} = useProfileContext();

  const response = useLazyLoadQuery<UserBlockedUsersQuery>(
    blockedUsersQuery,
    {},
    {fetchPolicy: 'store-or-network'},
  );

  const blockedUsers = useMemo(() => {
    return (
      response.blockedUsers?.filter(
        (x): x is NonNullable<typeof x> => x !== null,
      ) ?? []
    );
  }, [response]);

  const renderItem: ListRenderItem<typeof blockedUsers[number]> = ({
    item,
    index,
  }) => {
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
      style={{alignSelf: 'stretch'}}
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
      data={blockedUsers}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListItem>{getString('NO_BANNED_USER')}</EmptyListItem>
      }
      ListFooterComponent={<View style={{height: 60}} />}
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
