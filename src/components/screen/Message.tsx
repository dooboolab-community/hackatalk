import React, { useState } from 'react';

import { Chat } from '../../models/Chat';
import { Chatroom } from '../../models/Chatroom';
import ChatroomListItem from '../shared/ChatroomListItem';
import EmptyListItem from '../shared/EmptyListItem';
import { FlatList } from 'react-native';
import { User } from '../../models/User';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: any;
}

interface State {
  rooms: Chatroom[];
}

const initRooms = [
  new Chatroom(
    '',
    new Chat(
      '',
      new User('sender_uid1', 'dooboolab', '', 'I am fine', true),
      'How are you?',
    ),
    6,
  ),
  new Chatroom(
    '',
    new Chat(
      '',
      new User('sender_uid2', 'Byun8585', '', 'hello folks', false),
      'Hi. This is student from react-native-seoul. Nice to meet you.',
    ),
    0,
  ),
];

function Screen(props: Props, state: State) {
  const [rooms, setRooms] = useState(initRooms);
  const onItemClick = (itemId: string) => {
    props.navigation.navigate('Chat', { chatId: itemId });
  };
  const renderItem = (item: Chatroom, index: number) => {
    return (
      <ChatroomListItem
        testID={`listitem${index}`}
        item={item}
        onPress={() => onItemClick(item.id)}
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
          rooms.length === 0
            ? {
                flex: 1,
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : null
        }
        keyExtractor={(item, index) => index.toString()}
        data={rooms}
        renderItem={({ item, index }) => renderItem(item, index)}
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
    </StyledContainer>
  );
}
export default Screen;
