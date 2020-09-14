import { ConnectionHandler, ROOT_ID, RecordSourceSelectorProxy } from 'relay-runtime';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  MainStackNavigationProps,
  MainStackParamList,
} from '../navigation/MainStackNavigator';
import { Message, User } from '../../types/graphql';
import type {
  MessageCreateMutation,
  MessageCreateMutationResponse,
  MessageCreateMutationVariables,
} from '../../__generated__/MessageCreateMutation.graphql';
import { MessageProps, MessageType } from '../../types';
import React, { FC, ReactElement, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/core';
import { graphql, useMutation } from 'react-relay/hooks';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
} from '../../utils/ImagePicker';

import { Button } from 'dooboo-ui';
import Constants from 'expo-constants';
import EmptyListItem from '../shared/EmptyListItem';
import GiftedChat from '../shared/GiftedChat';
import { IC_SMILE } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import MessageListItem from '../shared/MessageListItem';
import { getString } from '../../../STRINGS';
import { isIPhoneX } from '../../utils/Styles';
import styled from 'styled-components/native';
import { useProfileContext } from '../../providers/ProfileModalProvider';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.messageBackground};
  flex-direction: column;
  align-items: center;
`;

interface Props {
  navigation: MainStackNavigationProps<'Message'>;
  route: RouteProp<MainStackParamList, 'Message'>;
}

const createMessage = graphql`
  mutation MessageCreateMutation($channelId: String! $message: MessageCreateInput!) {
    createMessage(channelId: $channelId, message: $message) {
      id
      text
      messageType
      channel {
        id
        channelType
        name
        memberships(excludeMe: true) {
          user {
            name
            nickname
            thumbURL
            photoURL
          }
        }
        lastMessage {
          messageType
          text
          imageUrls
          fileUrls
          createdAt
        }
      }
    }
  }
`;

const MessageScreen: FC<Props> = (props) => {
  const { theme } = useThemeContext();
  const { route: { params: { user, channel } } } = props;
  const navigation = useNavigation();
  const [commitMessage, isMessageInFlight] = useMutation<MessageCreateMutation>(createMessage);

  navigation.setOptions({
    headerTitle: (): ReactElement => {
      let title = channel?.name || '';

      // Note that if the user exists, this is direct message which title should appear as user name or nickname
      if (user) {
        title = user.nickname || user.name || '';
      }

      return <Text style={{
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
      }}>{title}</Text>;
    },
  });

  // Note that if the user exists, this is direct message which title should appear as user name or nickname

  const [textToSend, setTextToSend] = useState<string>('');
  const { state, showModal } = useProfileContext();

  const [messages] = useState<MessageProps[]>([
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
        'Hello2. This is long message. This is long message. This is long message.' +
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
    const mutationConfig = {
      variables: {
        channelId: channel.id,
        message: {
          // TODO: Use actual message as a variable.
          text: 'Hi this is Hyo111',
        },
      },
      updater: (proxyStore: RecordSourceSelectorProxy) => {
        // Get connection.
        const channelProxy = proxyStore.get(channel.id);
        const root = proxyStore.getRoot();
        const connectionRecord = root && ConnectionHandler.getConnection(
          root,
          'ChannelComponent_channels',
          {
            withMessage: true,
          },
        );

        // Get existing edges.
        const prevEdges = connectionRecord?.getLinkedRecords('edges') ?? [];

        // Check if the message is created inside a new channel.
        let isNewChannel = true;
        for (const edge of prevEdges) {
          const node = edge.getLinkedRecord('node');
          if (node?.getDataID() === channel.id) {
            isNewChannel = false;
            break;
          }
        }

        // If a new channel is created,
        // update relay store.
        if (isNewChannel) {
          const newEdge = connectionRecord && channelProxy && ConnectionHandler.createEdge(
            proxyStore,
            connectionRecord,
            channelProxy,
            'Channel',
          );
          if (connectionRecord && newEdge) {
            ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
          }
        }
      },
      onCompleted: async (response: MessageCreateMutationResponse): Promise<void> => {
        const { text } = response.createMessage;
        console.log('createMessage', text);
      },
      onError: (error: Error): void => {
        console.log('error', error);
      },
    };

    commitMessage(mutationConfig);
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
          ios: isIPhoneX()
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
            loading={isMessageInFlight}
            onPress={onSubmit}
            text={getString('SEND')}
          />
        )}
      />
    </Container>
  );
};

export default MessageScreen;
