import React, {FC, Suspense} from 'react';
import type {
  UserBlockedUsersQuery,
  UserBlockedUsersQueryResponse,
} from '../../__generated__/UserBlockedUsersQuery.graphql';

import BlockedUserTemp from '../templates/BlockedUserTemp';
import {LoadingIndicator} from 'dooboo-ui';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {blockedUsersQuery} from '../../relay/queries/User';
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

  const {
    blockedUsers = [],
  }: UserBlockedUsersQueryResponse = useLazyLoadQuery<UserBlockedUsersQuery>(
    blockedUsersQuery,
    {},
    {fetchPolicy: 'store-or-network'},
  );

  return (
    <BlockedUserTemp
      // @ts-ignore
      blockedUsers={blockedUsers}
      onPressUserItem={(user) => {
        showModal({
          user,
          isFriend: false,
          hideButtons: true,
        });
      }}
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
