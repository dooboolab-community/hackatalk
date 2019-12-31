import { Chatroom, MessageType } from '../../types';
import React, { useState } from 'react';

import ChatroomListItem from '../shared/ChatroomListItem';
import EmptyListItem from '../shared/EmptyListItem';
import { FlatList } from 'react-native';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: MainStackNavigationProps<'Chat'>;
}

interface State {
  rooms: Chatroom[];
}

const initRooms: Chatroom[] = [
  {
    id: 'room1',
    lastChat: {
      id: 'id_3',
      sender: {
        uid: 'uid_3',
        displayName: 'displayName3',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
        online: false,
      },
      messageType: MessageType.Message,
      message: 'How are you doing?',
      created: new Date(0),
      updated: new Date(0),
    },
    lastChatCnt: 3,
  },
  {
    id: 'room2',
    lastChat: {
      id: 'id_3',
      sender: {
        uid: 'uid_3',
        displayName: 'Byun8585',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
        online: false,
      },
      messageType: MessageType.Message,
      message: 'Hi. This is student from react-native-seoul. Nice to meet you.',
      created: new Date(0),
      updated: new Date(0),
    },
    lastChatCnt: 0,
  },
];

function Screen(): React.ReactElement {
  const [rooms, setRooms] = useState(initRooms);
  const navigation = useNavigation();

  const onItemClick = (itemId: string): void => {
    navigation.navigate('Chat', { chatId: itemId });
  };

  const renderItem = (item: Chatroom, index: number): React.ReactElement => {
    return (
      <ChatroomListItem
        testID={`listitem${index}`}
        item={item}
        onPress={(): void => onItemClick(item.id)}
      />
    );
  };
  return (
    <Container>
      <FlatList
        style={{
          alignSelf: 'stretch',
        }}
        // prettier-ignore
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
        keyExtractor={(item, index): string => index.toString()}
        data={rooms}
        renderItem={({ item, index }): React.ReactElement =>
          renderItem(item, index)
        }
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
    </Container>
  );
}
export default Screen;
