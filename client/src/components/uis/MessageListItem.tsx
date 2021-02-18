import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {IC_NO_IMAGE} from '../../utils/Icons';
import Image from 'react-native-scalable-image';
import {Message} from '../../types/graphql';
import {getString} from '../../../STRINGS';
import moment from 'moment';
import styled from 'styled-components/native';
import {useTheme} from 'dooboo-ui';

const WrapperPeer = styled.View<{isSame: boolean}>`
  min-height: 48px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: ${({isSame}): number => (isSame ? 8 : 20)}px;
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
  background-color: ${({theme}) => theme.peerMessageBackground};
  padding: 12px;
`;

const StyledPeerTextMessage = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.peerMessageText};
`;

const StyledPhotoContainer = styled.View`
  border-color: ${({theme}) => theme.disabled};
  border-width: 1px;
`;

const StyledTextPeerName = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.text};
  margin-bottom: 2px;
`;

const StyledTextPeerDate = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.text};
  margin-right: 20px;
  margin-top: 4px;
`;

const WrapperMy = styled.View`
  min-height: 48px;
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledTextDate = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.text};
  margin-top: 4px;
  margin-right: 20px;
`;

const StyledMyTextMessage = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.myMessageText};
`;

const StyledMyMessage = styled.View`
  background-color: ${({theme}) => theme.myMessageBackground};
  margin-right: 20px;
  margin-left: 28px;
  padding: 12px;
  border-radius: 3px;
`;

interface Props<T> {
  userId?: string;
  item: T;
  prevItem?: T;
  nextItem?: T;
  onPressPeerImage?: () => void;
  onPressMessageImage?: (index: number) => void;
  testID?: string;
}

interface ImageSenderProps {
  thumbURL?: string | null;
  isSamePeerMsg: boolean;
  fontColor: string;
}

function shouldShowDate(
  currentDate: string | undefined,
  nextDate: string | undefined,
): boolean {
  if (!currentDate || !nextDate) return false;

  const currentMoment = moment(currentDate);
  const nextMoment = moment(nextDate);

  const diffNextSeconds = nextMoment.diff(currentMoment, 'seconds');

  return diffNextSeconds < 60 && nextMoment.minute === currentMoment.minute;
}

const ImageSender: FC<ImageSenderProps> = ({thumbURL, isSamePeerMsg}) => {
  if (isSamePeerMsg) return <View style={{width: 40}} />;
  else if (thumbURL) return <StyledImageSender source={{uri: thumbURL}} />;

  return (
    <View
      style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StyledImage source={IC_NO_IMAGE} />
    </View>
  );
};

function MessageListItem<T>(props: Props<T & Message>): React.ReactElement {
  const {theme} = useTheme();

  const {
    item: {id, sender, text, createdAt, imageUrls},
    prevItem,
    nextItem,
    onPressPeerImage,
    onPressMessageImage,
    testID,
    userId,
  } = props;

  const isSamePeerMsg = prevItem?.sender?.id === sender?.id;
  const showDate = shouldShowDate(createdAt, nextItem?.createdAt);

  if (sender?.id !== userId)
    return (
      <WrapperPeer isSame={!!isSamePeerMsg}>
        <View style={{marginRight: 8, width: 40}}>
          <TouchableOpacity testID={testID} onPress={onPressPeerImage}>
            <ImageSender
              thumbURL={sender?.thumbURL}
              isSamePeerMsg={!!isSamePeerMsg}
              fontColor={theme.text}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', maxWidth: '80%'}}>
          {isSamePeerMsg ? (
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
            }}>
            <StyledTextPeerMessageContainer>
              {imageUrls && imageUrls.length > 0 ? (
                <StyledPhotoContainer>
                  <TouchableOpacity
                    onPress={() =>
                      onPressMessageImage && onPressMessageImage(0)
                    }>
                    <Image
                      key={id}
                      width={240}
                      source={{uri: `${imageUrls[0]}?id=${id}`}}
                    />
                  </TouchableOpacity>
                </StyledPhotoContainer>
              ) : (
                <StyledPeerTextMessage>{text}</StyledPeerTextMessage>
              )}
            </StyledTextPeerMessageContainer>
          </View>
          {!showDate ? (
            <StyledTextPeerDate>
              {createdAt ? `${moment(createdAt).fromNow()}` : '0 : 0'}
            </StyledTextPeerDate>
          ) : null}
        </View>
      </WrapperPeer>
    );

  return (
    <WrapperMy>
      <StyledMyMessage>
        {imageUrls && imageUrls.length > 0 ? (
          <StyledPhotoContainer>
            <TouchableOpacity
              onPress={() => onPressMessageImage && onPressMessageImage(0)}>
              <Image
                key={id}
                width={240}
                source={{uri: `${imageUrls[0]}?id=${id}`}}
              />
            </TouchableOpacity>
          </StyledPhotoContainer>
        ) : (
          <StyledMyTextMessage>{text}</StyledMyTextMessage>
        )}
      </StyledMyMessage>
      <StyledTextDate>
        {createdAt ? `${moment(createdAt).fromNow()}` : '0 : 0'}
      </StyledTextDate>
    </WrapperMy>
  );
}

export default MessageListItem;
