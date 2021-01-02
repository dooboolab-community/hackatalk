import * as Notifications from 'expo-notifications';

import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, LoadingIndicator } from 'dooboo-ui';
import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';
import {
  MainStackNavigationProps,
  MainStackParamList,
} from '../navigation/MainStackNavigator';
import { Message, User } from '../../types/graphql';
import type {
  MessageCreateMutation,
  MessageCreateMutationResponse,
} from '../../__generated__/MessageCreateMutation.graphql';
import {
  MessagesQuery,
  MessagesQueryResponse,
  MessagesQueryVariables,
} from '../../__generated__/MessagesQuery.graphql';
import React, {
  FC,
  ReactElement,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RouteProp, useNavigation } from '@react-navigation/core';
import {
  graphql,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from 'react-relay/hooks';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
} from '../../utils/ImagePicker';

import Constants from 'expo-constants';
import EmptyListItem from '../shared/EmptyListItem';
import GiftedChat from '../shared/GiftedChat';
import { IC_SMILE } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import type { MessageComponent_message$key } from '../../__generated__/MessageComponent_message.graphql';
import MessageListItem from '../shared/MessageListItem';
import { RootStackNavigationProps } from 'components/navigation/RootStackNavigator';
import { getString } from '../../../STRINGS';
import moment from 'moment';
import { resizePhotoToMaxDimensionsAndCompressAsPNG } from '../../utils/image';
import { showAlertForError } from '../../utils/common';
import styled from 'styled-components/native';
import { uploadImageAsync } from '../../apis/upload';
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
  mutation MessageCreateMutation(
    $channelId: String!
    $message: MessageCreateInput!
  ) {
    createMessage(channelId: $channelId, message: $message) {
      id
      text
      messageType
      imageUrls
      fileUrls
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
  query MessagesQuery(
    $first: Int!
    $after: String
    $channelId: String!
    $searchText: String
  ) {
    ...MessageComponent_message
      @arguments(
        first: $first
        after: $after
        channelId: $channelId
        searchText: $searchText
      )
  }
`;

const messagesFragment = graphql`
  fragment MessageComponent_message on Query
  @argumentDefinitions(
    first: { type: "Int!" }
    after: { type: "String" }
    channelId: { type: "String!" }
    searchText: { type: "String" }
  )
  @refetchable(queryName: "MessagePaginationQuery") {
    messages(
      first: $first
      after: $after
      channelId: $channelId
      searchText: $searchText
    )
      @connection(
        key: "MessageComponent_messages"
        filters: ["channelId", "searchText"]
      ) {
      edges {
        cursor
        node {
          id
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
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

function updateMessageOnSubmit(
  proxyStore: RecordSourceSelectorProxy,
  currentChannelId: string,
  currentUserId: string,
): void {
  const root = proxyStore.getRoot();

  const connectionRecord =
    root &&
    ConnectionHandler.getConnection(root, 'MessageComponent_messages', {
      channelId: currentChannelId,
      searchText: null,
    });

  const payload = proxyStore.getRootField('createMessage');
  const userProxy = proxyStore.get(currentUserId);
  const now = moment().toString();

  if (userProxy && payload) {
    payload.setLinkedRecord(userProxy, 'sender');

    payload.setValue(now, 'createdAt');

    payload.setValue(now, 'updatedAt');
  }

  const newEdge =
    connectionRecord &&
    payload &&
    ConnectionHandler.createEdge(
      proxyStore,
      connectionRecord,
      payload,
      'Message',
    );

  if (connectionRecord && newEdge) {
    ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
  }
}

function updateChannelsOnSubmit(
  proxyStore: RecordSourceSelectorProxy,
  currentChannelId: string,
): void {
  const root = proxyStore.getRoot();
  const channelProxy = proxyStore.get(currentChannelId);

  const connectionRecord =
    root &&
    ConnectionHandler.getConnection(root, 'ChannelComponent_channels', {
      withMessage: true,
    });

  // Get existing edges.
  const prevEdges = connectionRecord?.getLinkedRecords('edges') ?? [];

  // Check if the message is created inside a new channel.
  let existingNode;

  for (const edge of prevEdges) {
    const node = edge.getLinkedRecord('node');

    if (node?.getDataID() === currentChannelId) {
      existingNode = node;
      break;
    }
  }

  const newEdge =
    connectionRecord &&
    channelProxy &&
    ConnectionHandler.createEdge(
      proxyStore,
      connectionRecord,
      channelProxy,
      'Channel',
    );

  if (existingNode && connectionRecord) {
    ConnectionHandler.deleteNode(connectionRecord, existingNode.getDataID());
  }

  if (connectionRecord && newEdge) {
    ConnectionHandler.insertEdgeBefore(connectionRecord, newEdge);
  }
}

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
  const navigation = useNavigation<RootStackNavigationProps>();

  const { data, loadNext, loadPrevious, isLoadingNext } = usePaginationFragment<
    MessagesQuery,
    MessageComponent_message$key
  >(messagesFragment, messages);

  useEffect(() => {
    // Add notification handler.
    const responseListener = Notifications.addNotificationReceivedListener(
      (event) => {
        loadPrevious(ITEM_CNT);
      },
    );

    // Clean up : remove notification handler.
    return () => Notifications.removeNotificationSubscription(responseListener);
  }, [data, loadPrevious]);

  const nodes = useMemo(() => {
    return (
      data.messages?.edges
        ?.filter((x): x is NonNullable<typeof x> => x !== null)
        .map((x) => x.node) || []
    );
  }, [data]);

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const [textToSend, setTextToSend] = useState<string>('');
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const { showModal } = useProfileContext();

  const [commitMessage, isMessageInFlight] = useMutation<MessageCreateMutation>(
    createMessage,
  );

  const {
    state: { user },
  } = useAuthContext();

  const onSubmit = (): void => {
    if (!textToSend) return;

    const mutationConfig = {
      variables: {
        channelId,
        message: { text: textToSend },
      },
      updater: (proxyStore: RecordSourceSelectorProxy) => {
        if (user) {
          updateMessageOnSubmit(proxyStore, channelId, user.id);
        }

        updateChannelsOnSubmit(proxyStore, channelId);
      },
      onCompleted: (response: MessageCreateMutationResponse) => {
        const { text } = response.createMessage as Message;

        setTextToSend('');
      },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
    };

    commitMessage(mutationConfig);
  };

  const onRequestImagePicker = async (type: string): Promise<void> => {
    let image;

    setIsImageUploading(true);

    if (type === 'photo') {
      image = await launchImageLibraryAsync();
    } else {
      image = await launchCameraAsync();
    }

    if (image && !image.cancelled) {
      try {
        const resizedImage = await resizePhotoToMaxDimensionsAndCompressAsPNG({
          uri: image.uri,
          width: 1920,
          height: 1920,
        });

        const response = await uploadImageAsync(
          resizedImage.uri,
          'messages',
          `_${channelId}_${new Date().toISOString()}`,
        );

        const { url } = JSON.parse(await response.text());

        const mutationConfig = {
          variables: {
            channelId,
            message: {
              messageType: 'photo',
              imageUrls: [url],
            },
          },
          updater: (proxyStore: RecordSourceSelectorProxy) => {
            if (user) {
              updateMessageOnSubmit(proxyStore, channelId, user.id);
            }

            updateChannelsOnSubmit(proxyStore, channelId);
          },
          onCompleted: (messageResponse: MessageCreateMutationResponse) => {
            const { imageUrls } = messageResponse.createMessage as Message;
          },
          onError: (error: Error): void => {
            showAlertForError(error);
            setIsImageUploading(false);
          },
        };

        commitMessage(mutationConfig);
      } catch (err) {
        Alert.alert(getString('ERROR'), getString('FAILED_LOAD_IMAGE'));
      }
    }

    setIsImageUploading(false);
  };

  return (
    <GiftedChat
      // @ts-ignore
      chats={nodes}
      borderColor={theme.lineColor}
      onEndReached={onEndReached}
      backgroundColor={theme.background}
      fontColor={theme.fontColor}
      keyboardOffset={Platform.select({
        ios: Constants.statusBarHeight + 40,
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
              showModal({ user: item?.sender as User });
            }}
            onPressMessageImage={(indexOfTheNode: number) => {
              let initialIndex = indexOfTheNode;

              const imagesList = nodes
                .filter((node, nodeIndex) => {
                  const { imageUrls } = node as Message;

                  if (imageUrls && nodeIndex < index) {
                    initialIndex += imageUrls.length;
                  }

                  return imageUrls && imageUrls.length > 0;
                })
                .map((message) => {
                  const { imageUrls, sender } = message as Message;

                  return imageUrls?.map((uri) => ({
                    uri,
                    sender: sender?.nickname || sender?.name,
                  }));
                });

              const flattenImages =
                imagesList.reduce(
                  (prev, current) =>
                    current != null
                      ? [...(prev || []), ...current]
                      : prev || [],
                  [],
                ) || [];

              navigation.push('ImageSlider', {
                images: flattenImages.reverse(),
                initialIndex: flattenImages.length - 1 - initialIndex,
              });
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
          resizeMethod="resize"
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
            button: {
              backgroundColor: theme.btnPrimary,
              width: 80,
              height: 40,
            },
            text: {
              color: theme.btnPrimaryFont,
            },
          }}
          loading={isMessageInFlight || isImageUploading}
          onPress={onSubmit}
          text={getString('SEND')}
          textProps={{
            numberOfLines: 1,
          }}
        />
      )}
    />
  );
};

interface ContentProps {
  channelId: string;
  searchArgs: MessagesQueryVariables;
}

const ContentContainer: FC<ContentProps> = ({ searchArgs, channelId }) => {
  const data: MessagesQueryResponse = useLazyLoadQuery<MessagesQuery>(
    messagesQuery,
    searchArgs,
    { fetchPolicy: 'store-or-network' },
  );

  return (
    <MessagesFragment
      channelId={channelId}
      messages={data}
      searchArgs={searchArgs}
    />
  );
};

interface Props {
  navigation: MainStackNavigationProps<'Message'>;
  route: RouteProp<MainStackParamList, 'Message'>;
}

const MessageScreen: FC<Props> = (props) => {
  const {
    route: {
      params: { users, channel },
    },
    navigation,
  } = props;

  navigation.setOptions({
    headerTitle: (): ReactElement => {
      let title = channel?.name || '';

      // Note that if the user exists, this is direct message which title should appear as user name or nickname
      if (users) {
        if (users.length === 1) {
          title = users[0].nickname || users[0].name || '';
        } else {
          const userNames = users.map((v) => v.nickname || v.name || '');

          title = userNames.join(', ');
        }
      }

      return (
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
          }}
          numberOfLines={2}
        >
          {title}
        </Text>
      );
    },
  });

  const searchArgs: MessagesQueryVariables = {
    first: ITEM_CNT,
    channelId: channel.id,
  };

  return (
    <Container>
      <Suspense fallback={<LoadingIndicator />}>
        <ContentContainer searchArgs={searchArgs} channelId={channel.id} />
      </Suspense>
    </Container>
  );
};

export default MessageScreen;
