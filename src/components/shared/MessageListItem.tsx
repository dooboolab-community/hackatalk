import React, { SFC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { MessageProps } from '../../types';
import moment from 'moment';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const WrapperPeer = styled.View<{ isSame: boolean }>`
  min-height: 48px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: ${({ isSame }): number => (isSame ? 8 : 20)}px;
`;

const StyledImageSender = styled.Image`
  width: 32px;
  height: 32px;
`;

const StyledTextPeerMessageContainer = styled.View`
  margin-right: 8px;
  background-color: ${({ theme }): string => theme.peerMessageBackground};
  padding: 12px;
  width: 100%;
`;

const StyledPeerTextMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }): string => theme.peerMessageText};
`;

const StyledTextPeerName = styled.Text`
  font-size: 12px;
  color: ${({ theme }): string => theme.fontColor};
  margin-bottom: 2px;
`;

const StyledTextPeerDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }): string => theme.fontColor};
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
  color: ${({ theme }): string => theme.fontColor};
  margin-top: 4px;
  margin-right: 20px;
`;

const StyledMyTextMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }): string => theme.myMessageText};
`;

const StyledMyMessage = styled.View`
  background-color: ${({ theme }): string => theme.myMessageBackground};
  margin-right: 20px;
  margin-left: 28px;
  padding: 12px;
  border-radius: 3px;
`;

interface Props {
  item: MessageProps;
  prevItem?: MessageProps;
  nextItem?: MessageProps;
  onPressPeerImage?: () => void;
  testID?: string;
}

interface ImageSenderProps {
  thumbURL?: string;
  isSamePeerMsg: boolean;
  fontColor: string;
}

const myFakeId = '2'; // TODO: temporary

function shouldShowDate(
  currentDate: string | undefined,
  nextDate: string | undefined,
): boolean {
  if (!currentDate || !nextDate) return false;

  const currentMoment = moment(currentDate);
  const nextMoment = moment(nextDate);

  const diffNextSeconds = nextMoment.diff(currentMoment, 'seconds');

  return diffNextSeconds < 60 && (nextMoment.minute === currentMoment.minute);
}

const ImageSenderComp: SFC<ImageSenderProps> = ({
  thumbURL,
  isSamePeerMsg,
  fontColor,
}) => {
  if (isSamePeerMsg) {
    return <View style={{ width: 40 }} />;
  } else if (thumbURL) {
    return <StyledImageSender source={{ uri: thumbURL }} />;
  }
  return (
    <View style={{ width: 40 }}>
      <Ionicons name="ios-person" size={40} color={fontColor} />
    </View>
  );
};

function MessageListItem(props: Props): React.ReactElement {
  const { theme } = useThemeContext();
  const {
    item: {
      id,
      sender: { id: senderId, nickname, photoURL: thumbURL },
      messageType,
      // @ts-ignore
      message,
      created,
    },
    prevItem,
    nextItem,
    onPressPeerImage,
    testID,
  } = props;
  const isSamePeerMsg = prevItem && prevItem.sender.id === senderId;
  const showDate = shouldShowDate(created, nextItem?.created);
  if (senderId !== myFakeId) {
    return (
      <WrapperPeer isSame={!!isSamePeerMsg}>
        <View style={{ marginRight: 8, width: 40 }}>
          <TouchableOpacity testID={testID} onPress={onPressPeerImage}>
            <ImageSenderComp
              thumbURL={thumbURL}
              isSamePeerMsg={!!isSamePeerMsg}
              fontColor={theme.fontColor}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', maxWidth: '90%' }}>
          {isSamePeerMsg ? (
            <View />
          ) : (
            <StyledTextPeerName>{nickname}</StyledTextPeerName>
          )}
          <StyledTextPeerMessageContainer>
            <StyledPeerTextMessage>{message}</StyledPeerTextMessage>
          </StyledTextPeerMessageContainer>
          {
            !showDate
              ? <StyledTextPeerDate>
                {created
                  ? `${moment(created).hour()} : ${moment(created).minutes()}`
                  : '0 : 0'}
              </StyledTextPeerDate>
              : null
          }
        </View>
      </WrapperPeer>
    );
  }
  return (
    <WrapperMy>
      <StyledMyMessage>
        <StyledMyTextMessage>{message}</StyledMyTextMessage>
      </StyledMyMessage>
      <StyledTextDate>
        {created
          ? `${moment(created).hour()} : ${moment(created).minutes()}`
          : '0 : 0'}
      </StyledTextDate>
    </WrapperMy>
  );
}

MessageListItem.defaultProps = {
  item: {
    id: '',
    sender: {
      id: '0',
      nickname: 'sender111',
      thumbURL: '',
      photoURL: '',
      statusMessage: '',
    },
    message: 'hello1',
    created: '2020-01-01 12:00',
    updated: '2020-01-01 12:00',
  },
};

export default MessageListItem;
