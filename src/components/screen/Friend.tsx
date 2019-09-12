import React, { useContext } from 'react';

import EmptyListItem from '../shared/EmptyListItem';
import { FlatList } from 'react-native';
import { User as Friend } from '../../models/User';
import { ProfileModalContext } from '../../providers/ProfileModalProvider';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: any;
}

function Screen(props: Props) {
  const profileModal = useContext(ProfileModalContext);
  const [friends, setFriends] = React.useState([
    new Friend('my_uid', 'hello', '', 'I am fine today', false),
  ]);

  const renderItem = (item: Friend) => {
    return (
      <UserListItem
        testID='user'
        user={item}
        onPress={() => {
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
          friends.length === 0
            ? {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }
            : null
        }
        keyExtractor={(item, index) => index.toString()}
        data={friends}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
    </StyledContainer>
  );
}

export default Screen;
