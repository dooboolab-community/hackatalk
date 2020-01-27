import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { MessageProps, MessageType } from '../../types';
import React, { useState } from 'react';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
} from '../../utils/ImagePicker';

import { Button } from '@dooboo-ui/native';
import Constants from 'expo-constants';
import EmptyListItem from '../shared/EmptyListItem';
import GiftedChat from '../shared/GiftedChat';
import { IC_SMILE } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import MessageListItem from '../shared/MessageListItem';
import { getString } from '../../../STRINGS';
import { isIphoneX } from '../../utils/Styles';
import styled from 'styled-components/native';
import { useProfileContext } from '../../providers/ProfileModalProvider';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.messageBackground};
  flex-direction: column;
  align-items: center;
`;

interface Props {
  navigation: MainStackNavigationProps<'Message'>;
}

function Message(): React.ReactElement {
  const { theme } = useThemeContext();

  const [isSending, setIsSending] = useState<boolean>(false);
  const [textToSend, setTextToSend] = useState<string>('');
  const { state, showModal } = useProfileContext();

  const [messages, setMessages] = useState<MessageProps[]>([
    {
      id: '',
      message: 'hello1',
      sender: {
        id: '0',
        nickname: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMessage: '',
      },
      created: '2020-01-01 11:22',
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
        id: '2',
        nickname: 'sender111',
        thumbURL: '',
      },
      created: '2020-01-01 11:23',
    },
    {
      id: '',
      messageType: MessageType.Message,
      message: 'hello',
      sender: {
        id: '0',
        nickname: 'sender111',
        thumbURL: '',
      },
      created: '2020-01-01 11:23',
    },
    {
      id: '',
      messageType: MessageType.Message,
      message: 'hello2',
      sender: {
        id: '0',
        nickname: 'sender111',
        thumbURL: '',
      },
      created: '2020-01-01 11:26',
    },
    {
      id: '',
      messageType: MessageType.Photo,
      photo: 'http://photo.png',
      sender: {
        id: '0',
        nickname: 'sender111',
        thumbURL: '',
      },
      created: '2020-01-01 11:26',
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
        chats={messages}
        borderColor={theme.lineColor}
        backgroundColor={theme.background}
        fontColor={theme.fontColor}
        keyboardOffset={Platform.select({
          ios: isIphoneX
            ? Constants.statusBarHeight + 40
            : Constants.statusBarHeight,
          android: Constants.statusBarHeight + 52,
        })}
        message={textToSend}
        placeholder={getString('WRITE_MESSAGE')}
        placeholderTextColor={theme.placeholder}
        onChangeMessage={(text: string): void => setTextToSend(text)}
        renderItem={({
          item,
          index,
        }: {
          item: MessageProps;
          index: number;
        }): React.ReactElement => {
          return (
            <MessageListItem
              testID={`message-list-item${index}`}
              prevItem={messages[index - 1]}
              item={item}
              nextItem={messages[index + 1]}
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
              width: 24,
              height: 24,
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
              testID="icon-camera"
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
              testID="icon-photo"
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
            testID="btn-message"
            style={{
              backgroundColor: theme.btnPrimary,
              width: 60,
              height: 40,
            }}
            textStyle={{
              color: theme.btnPrimaryFont,
            }}
            isLoading={isSending}
            onPress={onSubmit}
            text={getString('SEND')}
          />
        )}
      />
    </Container>
  );
}

export default Message;
