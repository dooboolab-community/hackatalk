import {Channel, Maybe, Membership, Message, User} from '../../types/graphql';
import {Image, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {ReactElement} from 'react';

import {IC_NO_IMAGE} from '../../utils/Icons';
import {Typography} from 'dooboo-ui';
import {getString} from '../../../STRINGS';
import moment from 'moment';
import styled from '@emotion/native';
import {useAuthContext} from '../../providers/AuthProvider';

const StyledViewChatRoomListItem = styled.View`
  background-color: ${({theme}) => theme.card};
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
  background-color: ${({theme}) => theme.primary};
  right: 0;
  bottom: 0;
  border-width: 2px;
  border-color: ${({theme}) => theme.primary};
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

const StyledTextWrapper = styled.View`
  background-color: ${({theme}) => theme.secondary};
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
  color: ${({theme}) => theme.text};
  text-align: right;
`;

const StyledTextMembershipsCount = styled.Text`
  font-size: 10px;
  font-weight: bold;
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

const StyledNamesContainerView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const StyledMeCircleView = styled.View`
  height: 16px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.disabled};
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
interface Props {
  style?: ViewStyle;
  item: Channel;
  lastMessageCnt?: number;
  onPress?: () => void;
  fontColor?: string;
  onLongPress?: () => void;
}

const calculateUsers = (
  memberships: Maybe<Membership[]> | undefined,
  authUserId: string | undefined,
  channelType: string,
): (Maybe<User> | undefined)[] | undefined =>
  memberships
    ?.filter((member) => {
      if (channelType !== 'self') {
        return member?.user?.id !== authUserId;
      }

      return true;
    })
    .map((membership) => membership?.user);

const calculatePhotoUrls = (
  users: (Maybe<User> | undefined)[] | undefined,
): (Maybe<string> | undefined)[] | undefined =>
  users?.map((user) => user?.thumbURL || user?.photoURL);

const calculateOnlineStatus = (
  users: (Maybe<User> | undefined)[] | undefined,
): Maybe<Boolean> | undefined => users?.[0]?.isOnline;

const calculateDisplayNames = (
  users: (Maybe<User> | undefined)[] | undefined,
): Maybe<string> | undefined => {
  const userNames = users?.map((v) => v?.nickname || v?.name || '');

  return users?.length === 1
    ? users?.[0]?.nickname || users?.[0]?.name || getString('NO_NAME')
    : userNames?.join(', ');
};

function ChannelListItem(props: Props): React.ReactElement {
  const {
    item: {channelType, lastMessage, memberships},
    lastMessageCnt = 0,
    onPress,
    onLongPress,
  } = props;

  const {text, messageType, createdAt} = lastMessage as Message;
  const {user} = useAuthContext();

  if (channelType !== 'public') {
    const users = calculateUsers(memberships, user?.id, channelType);

    const photoURLs = calculatePhotoUrls(users);
    const isOnline = calculateOnlineStatus(users);

    const renderMultiImages = (): ReactElement | null => {
      const images = photoURLs?.slice(0, 4) || [];

      if (images.length === 0) {
        return null;
      }

      const renderImages = (): ReactElement => {
        switch (images.length) {
          case 2:
            const IMAGE_SIZE_2 = 24;

            return (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <StyledImageSmall
                  style={{
                    width: IMAGE_SIZE_2,
                    height: IMAGE_SIZE_2,
                    borderRadius: IMAGE_SIZE_2 / 2,
                  }}
                  source={images[0] ? {uri: images[0]} : IC_NO_IMAGE}
                />
                <StyledImageSmall
                  style={{
                    width: IMAGE_SIZE_2,
                    height: IMAGE_SIZE_2,
                    borderRadius: IMAGE_SIZE_2 / 2,
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}
                  source={images[1] ? {uri: images[1]} : IC_NO_IMAGE}
                />
              </View>
            );
          case 3:
            const IMAGE_SIZE_3 = 20;

            return (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                }}
              >
                <StyledImageSmall
                  style={{
                    width: IMAGE_SIZE_3,
                    height: IMAGE_SIZE_3,
                    borderRadius: IMAGE_SIZE_3 / 2,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                  }}
                  source={images[1] ? {uri: images[1]} : IC_NO_IMAGE}
                />
                <StyledImageSmall
                  style={{
                    width: IMAGE_SIZE_3,
                    height: IMAGE_SIZE_3,
                    borderRadius: IMAGE_SIZE_3 / 2,
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                  }}
                  source={images[1] ? {uri: images[1]} : IC_NO_IMAGE}
                />
                <StyledImageSmall
                  style={{
                    marginTop: 2,
                    width: IMAGE_SIZE_3,
                    height: IMAGE_SIZE_3,
                    borderRadius: IMAGE_SIZE_3 / 2,
                  }}
                  source={images[0] ? {uri: images[0]} : IC_NO_IMAGE}
                />
              </View>
            );

          case 4:
            const IMAGE_SIZE_4 = 20;

            return (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  flexWrap: 'wrap',

                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {photoURLs?.slice(0, 4).map((photo, i) => {
                  return (
                    <StyledImageSmall
                      key={i.toString()}
                      style={{
                        marginTop: 2,
                        width: IMAGE_SIZE_4,
                        height: IMAGE_SIZE_4,
                        borderRadius: IMAGE_SIZE_4 / 2,
                      }}
                      source={photo ? {uri: photo} : IC_NO_IMAGE}
                    />
                  );
                })}
              </View>
            );

          default:
            return (
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Image
                  style={{width: 48, height: 48, borderRadius: 24}}
                  source={images[0] ? {uri: images[0]} : IC_NO_IMAGE}
                />
              </View>
            );
        }
      };

      return (
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            {renderImages()}
          </View>
          {!!photoURLs && photoURLs.length > 4 && (
            <StyledCircleView>
              <StyledTextMembershipsCount>
                {`${
                  photoURLs.length > 1000
                    ? '+>1000'
                    : `+${photoURLs?.length - 4}`
                }`}
              </StyledTextMembershipsCount>
            </StyledCircleView>
          )}
        </View>
      );
    };

    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          accessibilityLabel={getString('GO_CHAT')}
          activeOpacity={0.5}
          delayPressIn={130}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <StyledViewChatRoomListItem>
            <View style={{marginHorizontal: 15}}>
              {renderMultiImages()}
              {isOnline ? <StyledStatus /> : <View />}
            </View>
            <StyledViewContent>
              <StyledViewTop>
                <StyledNamesContainerView>
                  {channelType === 'self' && (
                    <StyledMeCircleView>
                      <Typography.Body2
                        style={{
                          fontSize: 10,
                          fontWeight: 'bold',
                        }}
                      >
                        {getString('ME')}
                      </Typography.Body2>
                    </StyledMeCircleView>
                  )}
                  <Typography.Body2
                    style={{fontWeight: 'bold'}}
                    numberOfLines={2}
                  >
                    {calculateDisplayNames(users)}
                  </Typography.Body2>
                </StyledNamesContainerView>
                {lastMessageCnt !== 0 ? (
                  <StyledTextWrapper>
                    <StyledTextCount>{lastMessageCnt}</StyledTextCount>
                  </StyledTextWrapper>
                ) : null}
              </StyledViewTop>
              <StyledViewBottom>
                <StyledTextMessage
                  numberOfLines={2}
                  lastMessageCnt={lastMessageCnt}
                >
                  {messageType === 'file'
                    ? getString('VIDEO')
                    : messageType === 'photo'
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
