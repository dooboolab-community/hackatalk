import { Button, LoadingIndicator } from 'dooboo-ui';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
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
import {
  MessagesQuery,
  MessagesQueryResponse,
  MessagesQueryVariables,
} from '../../__generated__/MessagesQuery.graphql';
import React, { FC, ReactElement, Suspense, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/core';
import { graphql, useLazyLoadQuery, useMutation, usePaginationFragment } from 'react-relay/hooks';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
} from '../../utils/ImagePicker';

import Constants from 'expo-constants';
import EmptyListItem from '../shared/EmptyListItem';
import GiftedChat from '../shared/GiftedChat';
import { IC_SMILE } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import type {
  MessageComponent_message$key,
} from '../../__generated__/MessageComponent_message.graphql';
import MessageListItem from '../shared/MessageListItem';
import { getString } from '../../../STRINGS';
import { isIPhoneX } from '../../utils/Styles';
import styled from 'styled-components/native';
import { useAuthContext } from '../../providers/AuthProvider';
import { useProfileContext } from '../../providers/ProfileModalProvider';
import { useThemeContext } from '@dooboo-ui/theme';

const ITEM_CNT = 20;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.messageBackground};
  flex-direction: column;
  align-items: center;
`;

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

const messagesQuery = graphql`
  query MessagesQuery($first: Int! $after: String $channelId: String! $searchText: String) {
    ...MessageComponent_message @arguments(first: $first after: $after channelId: $channelId searchText: $searchText)
  }
`;

const messagesFragment = graphql`
  fragment MessageComponent_message on Query
    @argumentDefinitions(
      first: {type: "Int!"}
      after: {type: "String"}
      channelId: {type: "String!"}
      searchText: {type: "String"}
    )
    @refetchable(queryName: "Messages") {
      messages(first: $first after: $after channelId: $channelId searchText: $searchText)
      @connection(key: "MessageComponent_messages" filters: ["channelId", "searchText"]) {
        edges {
          cursor
          node {
            messageType
            text
            imageUrls
            fileUrls
            sender {
              id
              name
              nickname
              thumbURL
              photoURL
            }
            createdAt
            updatedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
`;

interface MessageProp {
  channelId: string;
  messages: MessageComponent_message$key;
  searchArgs: MessagesQueryVariables;
}

const MessagesFragment: FC<MessageProp> = ({
  channelId,
  messages,
  searchArgs,
}) => {
  const { theme } = useThemeContext();

  const {
    data,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<MessagesQuery, MessageComponent_message$key>(
    messagesFragment,
    messages,
  );

  const edges = data?.messages?.edges || [];

  const nodes = edges
    // @ts-ignore
    .reduce((arr, item) => arr.concat(item?.node), []);

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const [textToSend, setTextToSend] = useState<string>('');
  const { state, showModal } = useProfileContext();

  const [commitMessage, isMessageInFlight] = useMutation<MessageCreateMutation>(createMessage);

  const onSubmit = (): void => {
    if (!textToSend) return;

    const mutationConfig = {
      variables: {
        channelId,
        message: { text: textToSend },
      },
      updater: (proxyStore: RecordSourceSelectorProxy) => {
        const root = proxyStore.getRoot();
        const channelProxy = proxyStore.get(channelId);

        /** start: ==> Create [Message] list */
        const messagesConnectionRecord = root && ConnectionHandler.getConnection(
          root,
          'MessageComponent_messages',
          {
            channelId,
            searchText: null,
          },
        );

        const newMessageEdge = messagesConnectionRecord && channelProxy && ConnectionHandler.createEdge(
          proxyStore,
          messagesConnectionRecord,
          channelProxy,
          'Message',
        );

        if (messagesConnectionRecord && newMessageEdge) {
          ConnectionHandler.insertEdgeBefore(messagesConnectionRecord, newMessageEdge);
        }
        /** end: ==> Create [Message] list */

        /** start: ==> Update [Channel] list */
        const connectionRecord = root && ConnectionHandler.getConnection(
          root,
          'ChannelComponent_channels',
          { withMessage: true },
        );

        // Get existing edges.
        const prevEdges = connectionRecord?.getLinkedRecords('edges') ?? [];

        // Check if the message is created inside a new channel.
        let existingNode;

        for (const edge of prevEdges) {
          const node = edge.getLinkedRecord('node');

          if (node?.getDataID() === channelId) {
            existingNode = node;
            break;
          }
        }

        const newEdge = connectionRecord && channelProxy && ConnectionHandler.createEdge(
          proxyStore,
          connectionRecord,
          channelProxy,
          'Channel',
        );

        if (connectionRecord && newEdge) {
          ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
        }

        if (existingNode && channelProxy) {
          ConnectionHandler.deleteNode(channelProxy, existingNode.getDataID());
        }
        /** end: ==> Update [Channel] list */
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

  const { state: { user } } = useAuthContext();

  return <GiftedChat
    // @ts-ignore
    chats={nodes}
    borderColor={theme.lineColor}
    onEndReached={onEndReached}
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
      item: Message;
      index: number;
    }): React.ReactElement => {
      return (
        <MessageListItem
          userId={user?.id}
          testID={`message-list-item${index}`}
          // @ts-ignore
          prevItem={messages[index - 1]}
          // @ts-ignore
          nextItem={messages[index + 1]}
          item={item}
          onPressPeerImage={(): void => {
            if (state.modal) {
              showModal({ user: item?.sender, deleteMode: true });
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
          width: 68,
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
  />;
};

interface ContentProps {
  channelId: string;
  searchArgs: MessagesQueryVariables;
}

const ContentContainer: FC<ContentProps> = ({
  searchArgs,
  channelId,
}) => {
  const data: MessagesQueryResponse =
  useLazyLoadQuery<MessagesQuery>(
    messagesQuery,
    searchArgs,
    { fetchPolicy: 'store-or-network' },
  );

  return <MessagesFragment
    channelId={channelId}
    messages={data}
    searchArgs={searchArgs}
  />;
};

interface Props {
  navigation: MainStackNavigationProps<'Message'>;
  route: RouteProp<MainStackParamList, 'Message'>;
}

const MessageScreen: FC<Props> = (props) => {
  const { route: { params: { user, channel } } } = props;
  const navigation = useNavigation();

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

  const searchArgs: MessagesQueryVariables = {
    first: ITEM_CNT,
    channelId: channel.id,
  };

  return (
    <Container>
      <Suspense fallback={<LoadingIndicator/>}>
        <ContentContainer
          searchArgs={searchArgs}
          channelId={channel.id}
        />
      </Suspense>
    </Container>
  );
};

export default MessageScreen;
