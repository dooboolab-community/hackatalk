import {
  Alert,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, LoadingIndicator, useTheme} from 'dooboo-ui';
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
  useMemo,
  useState,
} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {createMessage, messagesQuery} from '../../relay/queries/Message';
import {
  graphql,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from 'react-relay';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
} from '../../utils/ImagePicker';

import {ChannelQuery} from '../../__generated__/ChannelQuery.graphql';
import EmptyListItem from '../uis/EmptyListItem';
import GiftedChat from '../uis/GiftedChat';
import {IC_SMILE} from '../../utils/Icons';
import {Ionicons} from '@expo/vector-icons';
import type {MessageComponent_message$key} from '../../__generated__/MessageComponent_message.graphql';
import type {MessageCreateMutation} from '../../__generated__/MessageCreateMutation.graphql';
import MessageListItem from '../uis/MessageListItem';
import {RootStackNavigationProps} from 'components/navigations/RootStackNavigator';
import {channelQuery} from '../../relay/queries/Channel';
import {createMessageUpdater} from '../../relay/updaters';
import {getString} from '../../../STRINGS';
import {resizePhotoToMaxDimensionsAndCompressAsPNG} from '../../utils/image';
import {showAlertForError} from '../../utils/common';
import styled from '@emotion/native';
import {uploadImageAsync} from '../../apis/upload';
import {useAuthContext} from '../../providers/AuthProvider';
import {useProfileContext} from '../../providers/ProfileModalProvider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ITEM_CNT = 20;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.messageBackground};
  flex-direction: column;
  align-items: center;
`;

const messagesFragment = graphql`
  fragment MessageComponent_message on Query
  @argumentDefinitions(
    last: {type: "Int!"}
    before: {type: "String"}
    channelId: {type: "String!"}
    searchText: {type: "String"}
  )
  @refetchable(queryName: "MessagePaginationQuery") {
    messages(
      last: $last
      before: $before
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
          sender {
            id
            name
            nickname
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

interface MessageProp {
  channelId: string;
  messages: MessageComponent_message$key;
  searchArgs: MessagesQueryVariables;
}

const MessagesFragment: FC<MessageProp> = ({channelId, messages}) => {
  const {theme} = useTheme();
  const navigation = useNavigation<RootStackNavigationProps>();
  const insets = useSafeAreaInsets();

  const {data, loadPrevious} = usePaginationFragment<
    MessagesQuery,
    MessageComponent_message$key
  >(messagesFragment, messages);

  useEffect(() => {
    loadPrevious(1);
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
    loadPrevious(ITEM_CNT);
  };

  const [textToSend, setTextToSend] = useState<string>('');
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const {showModal} = useProfileContext();

  const [commitMessage, isMessageInFlight] =
    useMutation<MessageCreateMutation>(createMessage);

  const {user} = useAuthContext();

  const onSubmit = (): void => {
    if (!textToSend) return;

    commitMessage({
      variables: {
        channelId,
        message: {text: textToSend},
      },
      updater: (store) => {
        if (user) createMessageUpdater(store, channelId);
      },
      onCompleted: () => {
        setTextToSend('');
      },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
    });
  };

  const onRequestImagePicker = async (type: string): Promise<void> => {
    let image;

    setIsImageUploading(true);

    if (type === 'photo') image = await launchImageLibraryAsync();
    else image = await launchCameraAsync();

    if (image && !image.cancelled)
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

        const {url} = JSON.parse(await response.text());

        if (!url)
          return Alert.alert(getString('ERROR'), getString('URL_IS_NULL'));

        commitMessage({
          variables: {
            channelId,
            message: {
              messageType: 'photo',
              imageUrls: [url],
            },
          },
          updater: (store) => {
            if (user) createMessageUpdater(store, channelId);
          },
          onCompleted: () => {},
          onError: (error: Error): void => {
            showAlertForError(error);
            setIsImageUploading(false);
          },
        });
      } catch (err) {
        Alert.alert(getString('ERROR'), getString('FAILED_LOAD_IMAGE'));
      }

    setIsImageUploading(false);
  };

  const renderItem: ListRenderItem<typeof nodes[number]> = ({item, index}) => {
    const nextItemDate = nodes[index - 1]?.createdAt;

    return (
      <MessageListItem
        userId={user?.id}
        testID={`message-list-item${index}`}
        prevItemSenderId={nodes[index + 1]?.sender?.id}
        nextItemDate={
          typeof nextItemDate === 'string' ? nextItemDate : undefined
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

              if (imageUrls && nodeIndex < index)
                initialIndex += imageUrls.length;

              return imageUrls && imageUrls.length > 0;
            })
            .map((message) => {
              const {imageUrls, sender} = message;

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

  return (
    <GiftedChat
      messages={nodes}
      borderColor={theme.lineColor}
      onEndReached={onEndReached}
      backgroundColor={theme.background}
      fontColor={theme.text}
      keyboardOffset={insets.top + insets.bottom}
      message={textToSend}
      placeholder={getString('WRITE_MESSAGE')}
      placeholderTextColor={theme.placeholder}
      onChangeMessage={(text: string): void => setTextToSend(text)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
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
          }}>
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
            }}>
            <Ionicons
              name="ios-camera"
              size={36}
              color={theme ? theme.text : '#3d3d3d'}
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
            }}>
            <Ionicons
              name="md-images"
              size={36}
              color={theme ? theme.text : '#3d3d3d'}
            />
          </TouchableOpacity>
        </View>
      )}
      renderSendButton={(): React.ReactElement => (
        <Button
          testID="btn-message"
          styles={{
            container: {
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

const ContentContainer: FC<ContentProps> = ({searchArgs, channelId}) => {
  const navigation = useNavigation<MainStackNavigationProps<'Message'>>();
  const {user: auth} = useAuthContext();

  const messagesQueryResponse: MessagesQueryResponse =
    useLazyLoadQuery<MessagesQuery>(messagesQuery, searchArgs, {
      fetchPolicy: 'store-or-network',
    });

  const {channel} = useLazyLoadQuery<ChannelQuery>(channelQuery, {channelId});

  const users =
    channel?.memberships?.map((membership) => membership.user) ?? [];

  navigation.setOptions({
    headerTitle: (): ReactElement => {
      let title = channel?.name || '';

      // Note that if the user exists, this is direct message which title should appear as user name or nickname
      if (users)
        if (users.length <= 2)
          title = users
            .map((user) =>
              user?.id !== auth?.id ? user?.nickname || user?.name || '' : '',
            )
            .join('');
        else if (users.length > 1) {
          const userNames = users.map(
            (user) => user?.nickname || user?.name || '',
          );

          title = userNames.join(', ');
        }

      return (
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
          }}
          numberOfLines={2}>
          {title}
        </Text>
      );
    },
  });

  return (
    <MessagesFragment
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

  const searchArgs: MessagesQueryVariables = {
    last: ITEM_CNT,
    channelId,
  };

  return (
    <Container>
      <Suspense fallback={<LoadingIndicator />}>
        <ContentContainer searchArgs={searchArgs} channelId={channelId} />
      </Suspense>
    </Container>
  );
};

export default MessageScreen;
