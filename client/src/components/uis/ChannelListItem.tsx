import {Channel, Message} from '../../types/graphql';
import React, {ReactElement} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

import {IC_NO_IMAGE} from '../../utils/Icons';
import {getString} from '../../../STRINGS';
import moment from 'moment';
import styled from '@emotion/native';

const StyledViewChatRoomListItem = styled.View`
  background-color: ${({theme}) => theme.itemBackground};
  min-height: 92px;
  padding: 8px 0;
  border-bottom-width: 0.3px;
  border-color: ${({theme}) => theme.disabled};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledStatus = styled.View`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({theme}) => theme.tintColor};
  right: 0;
  bottom: 0;
  border-width: 2px;
  border-color: ${({theme}) => theme.lineColor};
`;

const StyledViewContent = styled.View`
  flex-direction: column;
  flex: 1;
  padding-right: 20px;
`;

const StyledViewTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextDisplayName = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${({theme}) => theme.text};
`;

const StyledTextWrapper = styled.View`
  background-color: ${({theme}) => theme.tintColor};
  width: 16px;
  height: 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const StyledTextCount = styled.Text`
  font-size: 10px;
  color: ${({theme}) => theme.primary};
`;

const StyledViewBottom = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextMessage = styled.Text<{lastMessageCnt: number}>`
  font-size: 12px;
  color: ${({theme}) => theme.text};
  max-width: 200px;
  ${({lastMessageCnt}): string => (lastMessageCnt ? 'font-weight: bold;' : '')}
`;

const StyledTextDate = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.textSecondaryColor};
  text-align: right;
`;

const StyledTextMembershipsCount = styled.Text`
  font-size: 10px;
  font-weight: bold;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const StyledImageSmall = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 2px;
  margin-bottom: 2px;
`;

const StyledCircleView = styled.View`
  position: absolute;
  right: -5px;
  bottom: -10px;
  padding-right: 5px;
  padding-left: 5px;
  height: 20px;
  border-radius: 10px;
  margin-right: 2px;
  margin-bottom: 2px;
  background-color: ${({theme}) => theme.secondary};
  align-items: center;
  justify-content: center;
`;

interface Props {
  testID?: string;
  style?: ViewStyle;
  item: Channel;
  lastMessageCnt?: number;
  onPress?: () => void;
  fontColor?: string;
}

function ChannelListItem(props: Props): React.ReactElement {
  const {
    testID,
    item: {
      channelType = 'private',
      lastMessage,
      memberships,

      // lastMessage: {
      //   sender: { photoURL, isOnline, nickname },
      //   // @ts-ignore
      //   message,
      //   created,
      // },
    },
    lastMessageCnt = 0,
    onPress,
  } = props;

  const {text, imageUrls, createdAt} = lastMessage as Message;

  if (channelType === 'private') {
    const users = memberships?.map((membership) => membership?.user);

    const photoURLs = memberships?.map(
      (membership) => membership?.user?.thumbURL || membership?.user?.photoURL,
    );

    const isOnline = memberships?.[0]?.user?.isOnline;

    const renderSingleImage = (
      photoURL: string | null | undefined,
    ): ReactElement => {
      if (photoURL) return <StyledImage source={{uri: photoURL}} />;

      return (
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <StyledImage source={IC_NO_IMAGE} />
        </View>
      );
    };

    const renderMultiImages = (
      photoStrs: (string | null | undefined)[] | undefined,
    ): ReactElement => {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 44,
              height: 44,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}>
            {photoStrs?.slice(0, 4).map((photo, i) => {
              if (i > 3) return null;

              if (!photo)
                return <StyledImageSmall key={i} source={IC_NO_IMAGE} />;

              return <StyledImageSmall key={i} source={{uri: photo}} />;
            })}
          </View>
          {!!photoStrs && photoStrs.length > 4 && (
            <StyledCircleView>
              <StyledTextMembershipsCount>
                {`${
                  photoStrs.length > 1000
                    ? '+>1000'
                    : `+${photoStrs?.length - 4}`
                }`}
              </StyledTextMembershipsCount>
            </StyledCircleView>
          )}
        </View>
      );
    };

    const userNames = users?.map((v) => v?.nickname || v?.name || '');

    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          testID={testID}
          activeOpacity={0.5}
          delayPressIn={130}
          onPress={onPress}>
          <StyledViewChatRoomListItem>
            <View style={{marginHorizontal: 15}}>
              {!users || users.length === 1
                ? renderSingleImage(photoURLs?.[0])
                : renderMultiImages(photoURLs)}
              {isOnline ? <StyledStatus /> : <View />}
            </View>
            <StyledViewContent>
              <StyledViewTop>
                <StyledTextDisplayName numberOfLines={2}>
                  {users?.length === 1
                    ? users?.[0]?.nickname ||
                      users?.[0]?.name ||
                      getString('NO_NAME')
                    : userNames?.join(', ')}
                </StyledTextDisplayName>
                {lastMessageCnt !== 0 ? (
                  <StyledTextWrapper>
                    <StyledTextCount>{lastMessageCnt}</StyledTextCount>
                  </StyledTextWrapper>
                ) : null}
              </StyledViewTop>
              <StyledViewBottom>
                <StyledTextMessage
                  numberOfLines={2}
                  lastMessageCnt={lastMessageCnt}>
                  {imageUrls && imageUrls.length > 0
                    ? getString('PHOTO')
                    : text}
                </StyledTextMessage>
                <StyledTextDate>
                  {createdAt ? moment(createdAt).fromNow() : 'nan'}
                </StyledTextDate>
              </StyledViewBottom>
            </StyledViewContent>
          </StyledViewChatRoomListItem>
        </TouchableOpacity>
      </View>
    );
  }

  return <View />;
}

export default ChannelListItem;
