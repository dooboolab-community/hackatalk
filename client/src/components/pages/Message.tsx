import * as Notifications from 'expo-notifications';

import {
  ActivityIndicator,
  Alert,
  Image,
  ListRenderItem,
  Platform,
  Text,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IC_MSG_CAMERA,
  IC_MSG_IMAGE,
  SvgArrDown,
  SvgArrUp,
  SvgSend,
} from '../../utils/Icons';
import {
  ImagePickerType,
  launchCameraAsync,
  launchMediaLibraryAsync,
} from '../../utils/ImagePicker';
import {
  MESSAGE_RESIZED_IMAGE_HEIGHT,
  MESSAGE_RESIZED_IMAGE_WIDTH,
  UPLOAD_FILE_SIZE_LIMIT,
} from '../../utils/const';
import {
  MainStackNavigationProps,
  MainStackParamList,
} from '../navigations/MainStackNavigator';
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
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {createMessage, messagesQuery} from '../../relay/queries/Message';
import {
  createMessageOptimisticUpdater,
  createMessageUpdater,
} from '../../relay/updaters';
import {
  graphql,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from 'react-relay';

import {ChannelQuery} from '../../__generated__/ChannelQuery.graphql';
import CustomLoadingIndicator from '../uis/CustomLoadingIndicator';
import EmptyListItem from '../uis/EmptyListItem';
import GiftedChat from '../uis/GiftedChat';
import {ImagePickerResult} from 'expo-image-picker';
import type {MessageComponent_message$key} from '../../__generated__/MessageComponent_message.graphql';
import type {MessageCreateMutation} from '../../__generated__/MessageCreateMutation.graphql';
import MessageListItem from '../uis/MessageListItem';
import {RootStackNavigationProps} from 'components/navigations/RootStackNavigator';
import {channelQuery} from '../../relay/queries/Channel';
import {getString} from '../../../STRINGS';
import {nanoid} from 'nanoid/non-secure';
import {resizePhotoToMaxDimensionsAndCompressAsPNG} from '../../utils/image';
import {showAlertForError} from '../../utils/common';
import styled from '@emotion/native';
import {uploadSingleAsync} from '../../apis/upload';
import useAppStateChangeHandler from '../../hooks/useAppStateChangeHandler';
import {useAuthContext} from '../../providers/AuthProvider';
import {useDeviceContext} from '../../providers';
import {useProfileContext} from '../../providers/ProfileModalProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'dooboo-ui';

const ITEM_CNT = 20;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  flex-direction: column;
  align-items: center;
`;

const messagesFragment = graphql`
  fragment MessageComponent_message on Query
  @argumentDefinitions(
    first: {type: "Int!"}
    after: {type: "String"}
    channelId: {type: "String!"}
    searchText: {type: "String"}
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
          imageUrls
          fileUrls
          text
          sender {
            id
            name
            nickname
            photoURL
          }
          createdAt
          ...MessageListItem_message
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

export type User = {
  readonly id: string;
  readonly nickname: string | null;
  readonly name: string | null;
  readonly photoURL: string | null;
} | null;

interface MessageProp {
  users: User[];
  channelId: string;
  messages: MessageComponent_message$key;
  searchArgs: MessagesQueryVariables;
}

const MessagesFragment: FC<MessageProp> = ({channelId, messages, users}) => {
  const {theme} = useTheme();
  const navigation = useNavigation<RootStackNavigationProps>();
  const insets = useSafeAreaInsets();

  const {data, loadNext} = usePaginationFragment<
    MessagesQuery,
    MessageComponent_message$key
  >(messagesFragment, messages);

  useAppStateChangeHandler((state) => {
    if (state === 'active') {
      loadNext(ITEM_CNT);
    }
  });

  useEffect(() => {
    loadNext(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nodes = useMemo(() => {
    return (
      data.messages?.edges
        ?.filter((x): x is NonNullable<typeof x> => !!x)
        ?.map((x) => x.node)
        ?.filter((x): x is NonNullable<typeof x> => !!x) || []
    );
  }, [data]);

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const [message, setMessage] = useState<string>('');

  const [cursor, setCursor] = useState<{start: number; end: number}>({
    start: 0,
    end: 0,
  });

  const [lastKeyEvent, setLastKeyEvent] = useState<TextInputKeyPressEventData>({
    key: '',
  });

  const [tagUsers, setTagUsers] = useState<User[]>([]);

  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const {showModal} = useProfileContext();

  const [commitMessage, messageInFlight] =
    useMutation<MessageCreateMutation>(createMessage);

  const {user} = useAuthContext();
  const {deviceKey} = useDeviceContext();

  const submitMessage = (): void => {
    setMessage('');
    if (!message || messageInFlight) {
      return;
    }

    const messageToSend = message;

    commitMessage({
      variables: {
        channelId,
        message: {text: messageToSend},
        deviceKey,
      },
      optimisticUpdater: (store) => {
        if (user) {
          createMessageOptimisticUpdater(
            store,
            channelId,
            messageToSend,
            user.id,
          );
        }
      },
      updater: (store) => {
        if (user) {
          createMessageUpdater(store, channelId);
        }
      },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
    });
  };

  const onRequestMediaPicker = async (type: ImagePickerType): Promise<void> => {
    let media: ImagePickerResult | null;

    setIsImageUploading(true);

    if (type === ImagePickerType.CAMERA) {
      media = await launchCameraAsync();
    } else {
      media = await launchMediaLibraryAsync();
    }

    if (media && !media.cancelled) {
      if (Platform.OS === 'web' && !media.type) {
        const mediaType = media.uri.substring(
          media.uri.indexOf(':') + 1,
          media.uri.indexOf(';'),
        );

        media.type = mediaType.split('/')[0] as 'video' | 'image' | undefined;
      }

      try {
        let response: Response;

        if (media.type === 'video') {
          response = await uploadSingleAsync(
            media.uri,
            'messages',
            `_${channelId}_${new Date().toISOString()}`,
          );
        } else {
          const resizedImage = await resizePhotoToMaxDimensionsAndCompressAsPNG(
            {
              uri: media.uri,
              width: MESSAGE_RESIZED_IMAGE_WIDTH,
              height: MESSAGE_RESIZED_IMAGE_HEIGHT,
            },
          );

          response = await uploadSingleAsync(
            resizedImage.uri,
            'messages',
            `_${channelId}_${new Date().toISOString()}`,
          );
        }

        const {url, error: fetchError} = JSON.parse(await response.text());

        if (!url) {
          if (!fetchError) {
            setIsImageUploading(false);

            return Alert.alert(getString('ERROR'), getString('URL_IS_NULL'));
          }

          throw new Error(fetchError);
        }

        const urls =
          media.type === 'video' ? {fileUrls: [url]} : {imageUrls: [url]};

        commitMessage({
          variables: {
            channelId,
            message: {
              messageType: media.type === 'video' ? 'file' : 'photo',
              ...urls,
            },
            deviceKey,
          },
          updater: (store) => {
            if (user) {
              createMessageUpdater(store, channelId);
            }
          },
          onCompleted: () => {
            setIsImageUploading(false);
          },
          onError: (error: Error): void => {
            showAlertForError(error);
            setIsImageUploading(false);
          },
        });
      } catch (err: any) {
        setIsImageUploading(false);

        Alert.alert(
          getString('ERROR'),
          err.message === 'LIMIT_FILE_SIZE'
            ? getString(err.message, {uploadFileSize: UPLOAD_FILE_SIZE_LIMIT})
            : getString('FAILED_LOAD_IMAGE'),
        );
      }
    }
  };

  const renderItem: ListRenderItem<typeof nodes[number]> = ({item, index}) => {
    const prevItem = nodes[index + 1];
    const nextItem = nodes[index - 1];

    return (
      <MessageListItem
        userId={user?.id}
        testID={`message-list-item${index}`}
        prevItemSender={prevItem?.sender}
        prevItemDate={
          typeof prevItem?.createdAt === 'string'
            ? prevItem?.createdAt
            : undefined
        }
        nextItemSender={nextItem?.sender}
        nextItemDate={
          typeof nextItem?.createdAt === 'string'
            ? nextItem?.createdAt
            : undefined
        }
        item={item}
        onPressPeerImage={(sender): void => {
          showModal({user: sender});
        }}
        onPressMessageImage={(indexOfTheNode: number) => {
          let initialIndex = indexOfTheNode;

          const imagesList = nodes
            .filter((node, nodeIndex) => {
              const {imageUrls} = node;

              if (imageUrls && nodeIndex < index) {
                initialIndex += imageUrls.length;
              }

              return imageUrls && imageUrls.length > 0;
            })
            .map((el) => {
              const {imageUrls, sender} = el;

              return imageUrls?.map((uri) => ({
                uri,
                sender: sender?.nickname || sender?.name,
              }));
            });

          const flattenImages =
            imagesList.reduce(
              (prev, current) =>
                current != null ? [...(prev || []), ...current] : prev || [],
              [],
            ) || [];

          navigation.push('ImageSlider', {
            images: flattenImages.reverse(),
            initialIndex: flattenImages.length - 1 - initialIndex,
          });
        }}
      />
    );
  };

  const changeMessageByTagUser = (item: User): void => {
    const cursorPrefix = message.slice(0, cursor.start + 1);
    const tagIdx = cursorPrefix.lastIndexOf('@');

    const newMessageWithTag = [...message];

    newMessageWithTag.splice(
      tagIdx + 1,
      cursor.start - tagIdx - 1,
      item?.name + ' ' || '',
    );

    setMessage(newMessageWithTag.join(''));
  };

  const selectTagUser = (item: User): void => {
    setTagUsers([]);
    changeMessageByTagUser(item);
  };

  const parseTagText = (
    inputedText: string,
  ): {isTag: boolean; parsedText: string} => {
    let result = {isTag: false, parsedText: ''};

    const cursorPrefix = inputedText.slice(0, cursor.start + 1);
    const tagIdx = cursorPrefix.lastIndexOf('@');
    if (tagIdx !== -1) {
      if (tagIdx === 0 || (tagIdx > 0 && inputedText[tagIdx - 1] === ' ')) {
        if (lastKeyEvent.key === 'Backspace') {
          result = {
            isTag: true,
            parsedText: cursorPrefix.slice(tagIdx + 1, -2),
          };
        } else {
          result = {isTag: true, parsedText: cursorPrefix.slice(tagIdx + 1)};
        }
      }
    }

    return result;
  };

  const getTagUsersByText = (inputedText: string): User[] => {
    let result = [];
    if (inputedText === '') {
      result = users;
    } else {
      result = users.filter((item) => {
        return item?.name?.includes(inputedText);
      });
    }

    return result;
  };

  const handleTagUsers = (inputedText: string): void => {
    const parsedTagText = parseTagText(inputedText);

    const paredUsers = parsedTagText.isTag
      ? getTagUsersByText(parsedTagText.parsedText)
      : [];
    setTagUsers(paredUsers);
  };

  return (
    <GiftedChat
      selectTagUser={selectTagUser}
      tagUsers={tagUsers}
      messages={nodes}
      borderColor={theme.disabled}
      onEndReached={onEndReached}
      backgroundColor={theme.background}
      fontColor={theme.text}
      keyboardOffset={Platform.select({
        ios: insets.bottom + 56,
        android: insets.bottom,
      })}
      message={message}
      placeholder={getString('WRITE_MESSAGE')}
      onChangeMessage={(text) => {
        if (text === '\n') {
          setMessage('');

          return handleTagUsers('');
        }

        setMessage(text);
        handleTagUsers(text);
      }}
      onChangeCursor={({start, end}) => {
        setCursor({start: start, end: end});
      }}
      renderItem={renderItem}
      keyExtractor={(item) => item.id || nanoid()}
      onKeyPress={({nativeEvent}) => {
        if (Platform.OS === 'web') {
          if (nativeEvent.key === 'Enter') {
            // @ts-ignore
            const altKeyPressed = !!nativeEvent.altKey;

            if (!altKeyPressed) {
              return submitMessage();
            }

            setMessage(`${message}\n`);
          }
        }

        setLastKeyEvent(nativeEvent);
        handleTagUsers(message);
      }}
      openedOptionView={
        <SvgArrDown width={18} height={18} stroke={theme.text} />
      }
      closedOptionView={<SvgArrUp width={18} height={18} stroke={theme.text} />}
      emptyItem={<EmptyListItem>{getString('NO_MESSAGE')}</EmptyListItem>}
      renderViewMenu={(): React.ReactElement => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            testID="icon-camera"
            onPress={(): Promise<void> =>
              onRequestMediaPicker(ImagePickerType.CAMERA)
            }
            style={{
              marginLeft: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image style={{width: 40, height: 40}} source={IC_MSG_CAMERA} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="icon-photo"
            onPress={(): Promise<void> =>
              onRequestMediaPicker(ImagePickerType.LIBRARY)
            }
            style={{
              marginLeft: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image style={{width: 40, height: 40}} source={IC_MSG_IMAGE} />
          </TouchableOpacity>
        </View>
      )}
      renderSendButton={(): React.ReactElement => (
        <TouchableOpacity
          onPress={submitMessage}
          activeOpacity={0.7}
          accessibilityRole="button"
        >
          {isImageUploading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <SvgSend fill={theme.button} />
          )}
        </TouchableOpacity>
      )}
    />
  );
};

interface ContentProps {
  channelId: string;
  searchArgs: MessagesQueryVariables;
}

const ContentContainer: FC<ContentProps> = ({searchArgs, channelId}) => {
  const navigation = useNavigation<MainStackNavigationProps<'Message'>>();
  const {user: auth} = useAuthContext();

  const messagesQueryResponse: MessagesQueryResponse =
    useLazyLoadQuery<MessagesQuery>(messagesQuery, searchArgs, {
      fetchPolicy: 'store-or-network',
    });

  const {channel} = useLazyLoadQuery<ChannelQuery>(channelQuery, {channelId});

  const users = useMemo(
    () => channel?.memberships?.map((membership) => membership.user) ?? [],
    [channel?.memberships],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (): ReactElement => {
        let title = channel?.name || '';

        // Note that if the user exists, this is direct message which title should appear as user name or nickname
        if (users) {
          if (users.length <= 2) {
            title = users
              .map((user) =>
                user?.id !== auth?.id ? user?.nickname || user?.name || '' : '',
              )
              .join('');
          } else if (users.length > 1) {
            const userNames = users.map(
              (user) => user?.nickname || user?.name || '',
            );

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
  }, [auth?.id, channel?.name, navigation, users]);

  return (
    <MessagesFragment
      users={users}
      channelId={channelId}
      messages={messagesQueryResponse}
      searchArgs={searchArgs}
    />
  );
};

const MessageScreen: FC = () => {
  const {
    params: {channelId},
  } = useRoute<RouteProp<MainStackParamList, 'Message'>>();

  // Delete notification if user is foreground in channel.
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const parsedNotificationData = JSON.parse(
          notification.request.content.data.data as string,
        );

        if (parsedNotificationData.channelId === channelId) {
          Notifications.dismissNotificationAsync(
            notification.request.identifier,
          );
        }
      },
    );

    return () => subscription.remove();
  }, [channelId]);

  useEffect(() => {
    async function DeleteSameChannelNotification(): Promise<void> {
      const notifications =
        await Notifications.getPresentedNotificationsAsync();

      notifications.forEach((notificationData) => {
        const {data: jsonString} = notificationData.request.content.data;

        if (typeof jsonString === 'string') {
          const {channelId: notificationChannelId} = JSON.parse(jsonString);

          if (
            typeof notificationChannelId === 'string' &&
            notificationChannelId === channelId
          ) {
            Notifications.dismissNotificationAsync(
              notificationData.request.identifier,
            );
          }
        }
      });
    }
    DeleteSameChannelNotification();
  }, [channelId]);

  const searchArgs: MessagesQueryVariables = {
    first: ITEM_CNT,
    channelId,
  };

  return (
    <Container>
      <Suspense fallback={<CustomLoadingIndicator />}>
        <ContentContainer searchArgs={searchArgs} channelId={channelId} />
      </Suspense>
    </Container>
  );
};

export default MessageScreen;
