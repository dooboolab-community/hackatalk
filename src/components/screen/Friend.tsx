import React, { ReactElement, useState } from 'react';

import EmptyListItem from '../shared/EmptyListItem';
import { FlatList } from 'react-native';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useStateValue } from '../../contexts';

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${({ theme }): string => theme.background};
  align-items: center;
  justify-content: center;
`;

export default function Screen(): ReactElement {
  const [{ profileModal }, dispatch] = useStateValue();
  const [friends] = useState<User[]>([
    {
      uid: 'my_uid',
      displayName: 'hello',
      thumbURL: '',
      photoURL: '',
      statusMsg: 'I am fine today',
      online: true,
    },
  ]);

  const renderItem = (item: User): ReactElement => {
    return (
      <UserListItem
        testID="USER_ID"
        user={item}
        onPress={(): void => {
          if (profileModal) {
            dispatch({
              type: 'show-modal',
              payload: { user: item, deleteMode: true },
            });
          }
        }}
      />
    );
  };

  return (
    <StyledContainer>
      <FlatList
        style={{
          alignSelf: 'stretch',
        }}
        contentContainerStyle={
          // prettier-ignore
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
        renderItem={({ item }): ReactElement => renderItem(item)}
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
    </StyledContainer>
  );
}
