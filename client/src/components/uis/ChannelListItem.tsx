import {Channel, Maybe, Membership, Message, User} from '../../types/graphql';
import React, {ReactElement} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

import {AuthProviderMeQueryResponse} from '../../__generated__/AuthProviderMeQuery.graphql';
import {IC_NO_IMAGE} from '../../utils/Icons';
import {getString} from '../../../STRINGS';
import moment from 'moment';
import styled from '@emotion/native';
import {useAuthContext} from '../../providers/AuthProvider';

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

const StyledMeCircleText = styled.Text`
  color: ${({theme}) => theme.text};
  font-size: 10px;
  font-weight: bold;
`;

interface Props {
  style?: ViewStyle;
  item: Channel;
  lastMessageCnt?: number;
  onPress?: () => void;
  fontColor?: string;
}

class FilteredMemberships {
  constructor(
    private memberships: Maybe<Membership[]> | undefined,
    private user: AuthProviderMeQueryResponse['me'] | null,
    private channelType: string,
  ) {
    this.memberships = memberships;
    this.channelType = channelType;
    this.user = user;
  }

  private get filtered(): (Maybe<Membership> | undefined)[] | undefined {
    return this.memberships?.filter((member) => {
      if (this.channelType !== 'self')
        return member?.user?.id !== this.user?.id;

      return true;
    });
  }

  get users(): (Maybe<User> | undefined)[] | undefined {
    return this.filtered?.map((membership) => membership?.user);
  }

  get userNames(): string[] | undefined {
    return this.users?.map((v) => v?.nickname || v?.name || '');
  }
  calculatedPhotoUrls(): (Maybe<string> | undefined)[] | undefined {
    return this.filtered?.map(
      (membership) => membership?.user?.thumbURL || membership?.user?.photoURL,
    );
  }

  calculateOnlineStatus(): Maybe<Boolean> | undefined {
    return this.filtered?.[0]?.user?.isOnline;
  }

  calculateDisplayName(): Maybe<string> | undefined {
    return this.users?.length === 1
      ? this.users?.[0]?.nickname ||
          this.users?.[0]?.name ||
          getString('NO_NAME')
      : this.userNames?.join(', ');
  }
}

function ChannelListItem(props: Props): React.ReactElement {
  const {
    item: {channelType, lastMessage, memberships},
    lastMessageCnt = 0,
    onPress,
  } = props;

  const {text, imageUrls, createdAt} = lastMessage as Message;
  const {user} = useAuthContext();

  if (channelType !== 'public') {
    const filteredMemberships = new FilteredMemberships(
      memberships,
      user,
      channelType,
    );

    const users = filteredMemberships.users;
    const photoURLs = filteredMemberships.calculatedPhotoUrls();
    const isOnline = filteredMemberships.calculateOnlineStatus();

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

    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          accessibilityLabel="Go chat room"
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
                <StyledNamesContainerView>
                  {channelType === 'self' && (
                    <StyledMeCircleView>
                      <StyledMeCircleText>{getString('ME')}</StyledMeCircleText>
                    </StyledMeCircleView>
                  )}
                  <StyledTextDisplayName numberOfLines={2}>
                    {filteredMemberships.calculateDisplayName()}
                  </StyledTextDisplayName>
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
