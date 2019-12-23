import React, { ReactElement } from 'react';

import EmptyListItem from '../shared/EmptyListItem';
import { FlatList } from 'react-native';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useFriendContext } from '../../providers/FriendProvider';
import { useProfileContext } from '../../providers/ProfileModalProvider';

const StyledContainer = styled.View`
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
  } = useFriendContext();

  const userListOnPress = (user: User): void => {
    if (state.modal) {
      showModal({
        user,
        deleteMode: true,
        onDeleteFriend: () => (): void => {
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
    const testID = `USER_ID_${index}`;
    const userListOnPressInlineFn = (): void => userListOnPress(item);
    return (
      <UserListItem
        testID={testID}
        user={item}
        onPress={userListOnPressInlineFn}
      />
    );
  };

  return (
    <StyledContainer>
      <FlatList
        testID="friend-list"
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
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
    </StyledContainer>
  );
}
