import {Icon, useTheme} from 'dooboo-ui';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import {graphql, useFragment, useMutation} from 'react-relay';

import {IC_NO_IMAGE} from '../../utils/Icons';
import Image from 'react-native-scalable-image';
import type {MessageDeleteMutation} from '../../__generated__/MessageDeleteMutation.graphql';
import {MessageListItem_message$key} from '../../__generated__/MessageListItem_message.graphql';
import ParsedText from 'react-native-parsed-text';
import {ProfileModal_user$key} from '../../__generated__/ProfileModal_user.graphql';
import {User} from '../../types/graphql';
import VideoPlayer from './VideoPlayer';
import {colors} from '../../theme';
import {deleteMessage} from '../../relay/queries/Message';
import {getString} from '../../../STRINGS';
import moment from 'moment';
import {nanoid} from 'nanoid/non-secure';
import styled from '@emotion/native';
import {useSnackbarContext} from '../../providers/SnackbarProvider';

const fragment = graphql`
  fragment MessageListItem_message on Message {
    id
    messageType
    text
    imageUrls
    fileUrls
    createdAt
    updatedAt
    deletedAt
    sender {
      id
      name
      nickname
      thumbURL
      photoURL
      ...ProfileModal_user
    }
  }
`;

const WrapperPeer = styled.View<{shouldShowDatePeer: boolean}>`
  min-height: 48px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: ${({shouldShowDatePeer}) =>
    shouldShowDatePeer ? '8px' : '20px'};
  width: 100%;
`;

const StyledImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const StyledImageSender = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const StyledTextPeerMessageContainer = styled.View`
  margin-right: 8px;
  background-color: ${colors.messageSecondary};
  padding: 12px;
`;

const StyledPeerTextMessage = styled.Text`
  font-size: 14px;
  color: black;
`;

const StyledPhotoContainer = styled.View`
  border-color: ${({theme}) => theme.textContrast};
  border-width: 1px;
`;

const StyledTextPeerName = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.text};
  margin-bottom: 2px;
`;

const StyledMediaError = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.danger};
`;

const StyledTextPeerDate = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.textDisabled};
  margin-right: 20px;
  margin-top: 4px;
`;

const WrapperMy = styled.View<{shouldShowDateMy: boolean}>`
  min-height: 48px;
  margin-top: ${({shouldShowDateMy}) => (shouldShowDateMy ? '8px' : '20px')};
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledMessageInfoView = styled.View`
  margin-right: 20px;
  margin-top: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledTextDate = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.textDisabled};
`;

const StyledMyTextMessage = styled.Text`
  font-size: 14px;
  color: black;
`;

const StyledMyMessage = styled.View`
  background-color: ${colors.messagePrimary};
  margin-right: 20px;
  margin-left: 28px;
  padding: 12px;
  border-radius: 3px;
`;

const StyledDeleteMessage = styled.Text`
  color: ${({theme}) => theme.disabled};
  font-size: 16px;
`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStyles = () =>
  StyleSheet.create({
    url: {
      color: colors.brand,
      textDecorationLine: 'underline',
    },
  });

interface ImageSenderProps {
  thumbURL?: string | null;
  isSamePeerMsg: boolean;
  fontColor: string;
}

function shouldShowDate(
  isPrevItemSameUser: boolean,
  isNextItemSameUser: boolean,
  currentDate: string | undefined,
  prevDate: string | undefined,
  nextDate: string | undefined,
): boolean {
  if (!nextDate) {
    return true;
  }

  if (!currentDate || !prevDate) {
    return false;
  }

  if (!isPrevItemSameUser && !isNextItemSameUser) {
    return true;
  }

  const currentMoment = moment(currentDate);
  const nextMoment = moment(nextDate);

  const diffNextMins = nextMoment.diff(currentMoment, 'minute');

  if (diffNextMins <= 1 && isNextItemSameUser) {
    return false;
  }

  return true;
}

const decorateDate = (createdAt: string): string => {
  const now = moment();
  const date = moment(createdAt);
  const diffYearCnt = now.year() - date.year();
  const diffMonthCnt = now.month() - date.month();
  const diffDays = now.diff(date, 'days');
  const diffHours = now.diff(date, 'hours');

  if (diffDays >= 1) {
    if (diffYearCnt >= 1) {
      return `${date.format('YYYY MMM Do, A hh:mm')}`;
    }

    if (diffMonthCnt >= 1) {
      return `${date.format('MMM Do, A hh:mm')}`;
    }

    return `${date.format('Do, A hh:mm')}`;
  }

  if (diffHours >= 1) {
    return `${date.format('A hh:mm')}`;
  }

  return date.fromNow();
};

const openURL = (url: string): void => {
  Linking.openURL(url);
};

const ImageSender: FC<ImageSenderProps> = ({thumbURL, isSamePeerMsg}) => {
  if (isSamePeerMsg) {
    return <View style={{width: 40}} />;
  } else if (thumbURL) {
    return (
      <StyledImageSender
        accessible
        accessibilityHint="sender image"
        source={{uri: thumbURL}}
      />
    );
  }

  return (
    <View
      style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StyledImage
        accessible
        accessibilityHint="no sender image"
        source={IC_NO_IMAGE}
      />
    </View>
  );
};

interface Props {
  userId?: string;
  item: MessageListItem_message$key;
  prevItemSender?: User | null;
  prevItemDate?: string;
  nextItemSender?: User | null;
  nextItemDate?: string;

  onPressPeerImage?: (sender: ProfileModal_user$key) => void;
  onPressMessageImage?: (index: number) => void;
  testID?: string;
}

const MessageListItem: FC<Props> = ({
  item,
  prevItemSender,
  prevItemDate,
  nextItemSender,
  nextItemDate,
  onPressPeerImage,
  onPressMessageImage,
  testID,
  userId,
}: Props) => {
  const {theme} = useTheme();
  const styles = useMemo(() => makeStyles(), []);
  const [mediaError, setMediaError] = useState('');

  const snackbar = useSnackbarContext();
  const data = useFragment(fragment, item);

  const {
    id,
    sender,
    text,
    createdAt,
    deletedAt,
    imageUrls,
    fileUrls,
    messageType,
  } = data || {id: nanoid()};

  const isPrevMessageSameUser = prevItemSender?.id === sender?.id;
  const isNextMessageSameUser = nextItemSender?.id === sender?.id;

  const [commitMessageDelete] =
    useMutation<MessageDeleteMutation>(deleteMessage);

  const showDate = shouldShowDate(
    isPrevMessageSameUser,
    isNextMessageSameUser,
    typeof createdAt === 'string' ? createdAt : undefined,
    prevItemDate,
    nextItemDate,
  );

  const displayImage = (): JSX.Element =>
    mediaError ? (
      <StyledMediaError>{mediaError}</StyledMediaError>
    ) : (
      <StyledPhotoContainer>
        <TouchableOpacity
          onPress={() => onPressMessageImage && onPressMessageImage(0)}
        >
          <Image
            testID="image-display"
            key={id || ''}
            width={240}
            source={{uri: `${imageUrls![0]}?id=${id || ''}`}}
            onError={(_error) => {
              setMediaError(
                getString('FAILED_FETCH', {media: getString('PHOTO')}),
              );
            }}
          />
        </TouchableOpacity>
      </StyledPhotoContainer>
    );

  const displayParsedURLText = (): JSX.Element => (
    <ParsedText
      parse={[
        {
          type: 'url',
          onPress: openURL,
          style: styles.url,
        },
      ]}
    >
      {text}
    </ParsedText>
  );

  const displayVideo = (): JSX.Element => {
    return mediaError ? (
      <StyledMediaError>{mediaError}</StyledMediaError>
    ) : (
      <StyledPhotoContainer>
        <VideoPlayer
          uri={`${fileUrls![0]}?id=${id || ''}`}
          setMediaError={setMediaError}
        />
      </StyledPhotoContainer>
    );
  };

  const messageDeleteAsync = async (): Promise<void> => {
    const mutationConfig = {
      variables: {
        id,
      },
      onError: (_error: Error): void => {
        snackbar?.openSnackbar({
          text: getString('ERROR_OCCURED'),
          type: 'warning',
          styles: {
            container: {
              minWidth: '85%',
              minHeight: '10%',
              marginBottom: 50,
              justifyContent: 'center',
            },
          },
        });
      },
    };
    commitMessageDelete(mutationConfig);
  };

  if (sender?.id !== userId) {
    return (
      <WrapperPeer shouldShowDatePeer={!!shouldShowDate}>
        <View style={{marginRight: 8, width: 40}}>
          <TouchableOpacity
            testID={testID}
            onPress={() => {
              if (sender && onPressPeerImage) {
                onPressPeerImage(sender);
              }
            }}
          >
            <ImageSender
              thumbURL={sender?.thumbURL || sender?.photoURL}
              isSamePeerMsg={!!isPrevMessageSameUser}
              fontColor={theme.text}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', maxWidth: '80%'}}>
          {isPrevMessageSameUser ? (
            <View />
          ) : (
            <StyledTextPeerName>
              {sender?.nickname || sender?.name || getString('NO_NAME')}
            </StyledTextPeerName>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <StyledTextPeerMessageContainer>
              {deletedAt ? (
                <StyledDeleteMessage>
                  {getString('DELETED_MESSAGE')}
                </StyledDeleteMessage>
              ) : messageType === 'file' && fileUrls && fileUrls.length > 0 ? (
                displayVideo()
              ) : messageType === 'photo' &&
                imageUrls &&
                imageUrls.length > 0 ? (
                displayImage()
              ) : (
                <StyledPeerTextMessage selectable>
                  {displayParsedURLText()}
                </StyledPeerTextMessage>
              )}
            </StyledTextPeerMessageContainer>
          </View>
          {showDate ? (
            <StyledTextPeerDate>
              {`${decorateDate(createdAt as string)}`}
            </StyledTextPeerDate>
          ) : null}
        </View>
      </WrapperPeer>
    );
  }

  return (
    <WrapperMy shouldShowDateMy={!!shouldShowDate}>
      <StyledMyMessage>
        {deletedAt ? (
          <StyledDeleteMessage>
            {getString('DELETED_MESSAGE')}
          </StyledDeleteMessage>
        ) : fileUrls && fileUrls.length > 0 ? (
          displayVideo()
        ) : imageUrls && imageUrls.length > 0 ? (
          displayImage()
        ) : (
          <StyledMyTextMessage selectable>
            {displayParsedURLText()}
          </StyledMyTextMessage>
        )}
      </StyledMyMessage>

      <StyledMessageInfoView>
        {showDate ? (
          <StyledTextDate>{`${decorateDate(
            createdAt as string,
          )}`}</StyledTextDate>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            messageDeleteAsync();
          }}
        >
          {!deletedAt && (
            <Icon
              name="trash-light"
              size={12}
              color={theme.danger}
              style={{marginLeft: 5}}
            />
          )}
        </TouchableOpacity>
      </StyledMessageInfoView>
    </WrapperMy>
  );
};

export default MessageListItem;
