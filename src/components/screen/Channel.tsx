import { ChannelType, MessageType } from '../../types';
import { FlatList, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import ChannelListItem from '../shared/ChannelListItem';
import EmptyListItem from '../shared/EmptyListItem';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { SvgPlus } from '../../utils/Icons';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.View`
  flex: 1;
  background: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Fab = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }): string => theme.fab};
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
  const [channels] = useState(initialChannels);
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  const onItemClick = (itemId: string): void => {
    navigation.navigate('Message', { messageId: itemId });
  };

  const renderItem = (item: ChannelType, index: number): React.ReactElement => {
    return (
      <ChannelListItem
        testID={`list-item-${index}`}
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
        keyExtractor={(_, index): string => index.toString()}
        data={channels}
        renderItem={({ item, index }): React.ReactElement =>
          renderItem(item, index)
        }
        ListEmptyComponent={
          <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
        }
      />
      <TouchableOpacity
        activeOpacity={0.65}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 44,
        }}
        onPress={(): void => navigation.navigate('ChannelCreate')}
      >
        <Fab>
          <SvgPlus fill={theme.background}/>
        </Fab>
      </TouchableOpacity>
    </Container>
  );
}
export default Channel;
