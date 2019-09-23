import React, { useContext } from 'react';

import EmptyListItem from '../shared/EmptyListItem';
import { FlatList } from 'react-native';
import { ProfileModalContext } from '../../providers/ProfileModalProvider';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${({ theme }): string => theme.background};
  align-items: center;
  justify-content: center;
`;

function Screen(): React.ReactElement {
  const profileModal = useContext(ProfileModalContext);
  const [friends] = React.useState<User[]>([
    {
      uid: 'my_uid',
      displayName: 'hello',
      thumbURL: '',
      photoURL: '',
      statusMsg: 'I am fine today',
      online: true,
    },
  ]);

  const renderItem = (item: User): React.ReactElement => {
    return (
      <UserListItem
        testID='USER_ID'
        user={item}
        onPress={(): void => {
          if (profileModal) {
            profileModal.dispatch({
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
        renderItem={({ item }): React.ReactElement => renderItem(item)}
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
    </StyledContainer>
  );
}

export default Screen;
