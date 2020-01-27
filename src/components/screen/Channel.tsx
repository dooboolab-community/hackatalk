import { ChannelType, MessageType } from '../../types';
import React, { useState } from 'react';

import ChannelListItem from '../shared/ChannelListItem';
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
  navigation: MainStackNavigationProps<'Message'>;
}

const initialChannels: ChannelType[] = [
  {
    id: 'room1',
    lastMessage: {
      id: 'id_3',
      sender: {
        id: 'uid_3',
        nickname: 'displayName3',
        thumbURL: '',
        photoURL: '',
        statusMessage: '',
        isOnline: false,
      },
      messageType: MessageType.Message,
      message: 'How are you doing?',
      created: '2020-01-01 12:00',
      updated: '2020-01-01 12:00',
    },
    lastMessageCnt: 3,
  },
  {
    id: 'room2',
    lastMessage: {
      id: 'id_3',
      sender: {
        id: 'uid_3',
        nickname: 'Byun8585',
        thumbURL: '',
        photoURL: '',
        statusMessage: '',
        isOnline: false,
      },
      messageType: MessageType.Message,
      message: 'Hi. This is student from react-native-seoul. Nice to meet you.',
      created: '2020-01-01 12:00',
      updated: '2020-01-01 12:00',
    },
    lastMessageCnt: 0,
  },
];

function Channel(): React.ReactElement {
  const [channels, setChannels] = useState(initialChannels);
  const navigation = useNavigation();

  const onItemClick = (itemId: string): void => {
    navigation.navigate('Message', { messageId: itemId });
  };

  const renderItem = (item: ChannelType, index: number): React.ReactElement => {
    return (
      <ChannelListItem
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
          channels.length === 0
            ? {
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }
            : null
        }
        keyExtractor={(item, index): string => index.toString()}
        data={channels}
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
export default Channel;
