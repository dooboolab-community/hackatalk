import { ChatProps, MessageType } from '../../types';
import { Image, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
} from '../../utils/ImagePicker';

import Button from '../shared/Button';
import ChatListItem from '../shared/ChatListItem';
import Constants from 'expo-constants';
import EmptyListItem from '../shared/EmptyListItem';
import GiftedChat from '../shared/GiftedChat';
import { Header } from 'react-navigation-stack';
import { IC_SMILE } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useProfileContext } from '../../providers/ProfileModalProvider';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
`;

interface Props {
  navigation: MainStackNavigationProps<'Chat'>;
}

function Screen(): React.ReactElement {
  const { theme } = useThemeContext();

  const [isSending, setIsSending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { state, showModal } = useProfileContext();
  const [chats, setChats] = useState<ChatProps[]>([
    {
      id: '',
      message: 'hello1',
      messageType: MessageType.Message,
      sender: {
        uid: '0',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
    },
    {
      id: '',
      messageType: MessageType.Message,
      message:
        'Hello2. This is long message. This is long message.This is long message.' +
        'This is long message. This is long message. This is long message.' +
        'This is long message. This is long message.' +
        'This is long message. This is long message. This is long message.',
      sender: {
        uid: '2',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
    },
    {
      id: '',
      messageType: MessageType.Message,
      message: 'hello',
      sender: {
        uid: '0',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
    },
    {
      id: '',
      messageType: MessageType.Message,
      message: 'hello2',
      sender: {
        uid: '0',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
    },
    {
      id: '',
      messageType: MessageType.Photo,
      photo: 'http://photo.png',
      sender: {
        uid: '0',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
    },
  ]);

  const onSubmit = (): void => {
    setIsSending(true);
  };

  const onRequestImagePicker = async (type: string): Promise<void> => {
    if (type === 'photo') {
      const result = await launchImageLibraryAsync();
      return;
    }
    const result = await launchCameraAsync();
  };

  return (
    <Container>
      <GiftedChat
        chats={chats}
        borderColor={theme.lineColor}
        backgroundColor={theme.background}
        fontColor={theme.fontColor}
        keyboardOffset={Constants.statusBarHeight + Header.HEIGHT}
        message={message}
        placeholder={getString('WRITE_MESSAGE')}
        placeholderTextColor={theme.status}
        onChangeMessage={(text: string): void => setMessage(text)}
        renderItem={({
          item,
          index,
        }: {
          item: ChatProps;
          index: number;
        }): React.ReactElement => {
          return (
            <ChatListItem
              testID={`CHAT_LIST_ITEM${index}`}
              prevItem={index > 0 ? chats[index - 1] : undefined}
              item={item}
              onPressPeerImage={(): void => {
                if (state.modal) {
                  showModal({ user: item, deleteMode: true });
                }
              }}
            />
          );
        }}
        optionView={
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={IC_SMILE}
          />
        }
        emptyItem={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
        renderViewMenu={(): React.ReactElement => (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              testID="icon_camera"
              onPress={(): Promise<void> => onRequestImagePicker('camera')}
              style={{
                marginLeft: 16,
                marginTop: 2,
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="ios-camera"
                size={36}
                color={theme ? theme.fontColor : '#3d3d3d'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              testID="icon_photo"
              onPress={(): Promise<void> => onRequestImagePicker('photo')}
              style={{
                marginLeft: 16,
                marginTop: 4,
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="md-images"
                size={36}
                color={theme ? theme.fontColor : '#3d3d3d'}
              />
            </TouchableOpacity>
          </View>
        )}
        renderSendButton={(): React.ReactElement => (
          <Button
            testID="btn_chat"
            height={40}
            isLoading={isSending}
            onPress={onSubmit}
          >
            {getString('SEND')}
          </Button>
        )}
      />
    </Container>
  );
}

export default Screen;
