import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { ChannelType } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const StyledViewChatRoomListItem = styled.View`
  background-color: ${({ theme }): string => theme.itemBackground};
  height: 92px;
  border-bottom-width: 1px;
  border-color: ${({ theme }): string => theme.underline};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledStatus = styled.View`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({ theme }): string => theme.tintColor};
  right: 0;
  bottom: 0;
  border-width: 2px;
  border-color: ${({ theme }): string => theme.lineColor};
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
  color: ${({ theme }): string => theme.fontColor};
`;

const StyledTextWrapper = styled.View`
  background-color: ${({ theme }): string => theme.tintColor};
  width: 16px;
  height: 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const StyledTextCount = styled.Text`
  font-size: 10px;
  color: ${({ theme }): string => theme.primary};
`;

const StyledViewBottom = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextMessage = styled.Text<{ lastMessageCnt: number }>`
  font-size: 12px;
  color: ${({ theme }): string => theme.fontColor};
  max-width: 150px;
  ${({ lastMessageCnt }): string => (lastMessageCnt ? 'font-weight: bold;' : '')}
`;

const StyledTextDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }): string => theme.fontSubColor};
  text-align: right;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
`;

interface Props {
  testID?: string;
  style?: ViewStyle;
  item: ChannelType;
  onPress?: () => void;
  fontColor?: string;
}

function ChannelListItem(props: Props): React.ReactElement {
  const {
    theme: { fontColor },
  } = useThemeContext();

  const {
    testID,
    item: {
      lastMessage: {
        sender: { photoURL, isOnline, nickname },
        // @ts-ignore
        message,
        created,
      },
      lastMessageCnt,
    },
    onPress,
  } = props;
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.5} onPress={onPress}
      >
        <StyledViewChatRoomListItem>
          <View style={{ marginHorizontal: 20 }}>
            {photoURL ? (
              <StyledImage source={{ uri: photoURL }} />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons
                  name="ios-person"
                  size={24}
                  color={fontColor || '#3d3d3d'}
                />
              </View>
            )}
            {isOnline ? <StyledStatus /> : <View />}
          </View>
          <StyledViewContent>
            <StyledViewTop>
              <StyledTextDisplayName>{nickname}</StyledTextDisplayName>
              {lastMessageCnt !== 0 ? (
                <StyledTextWrapper>
                  <StyledTextCount>{lastMessageCnt}</StyledTextCount>
                </StyledTextWrapper>
              ) : (
                <View />
              )}
            </StyledViewTop>
            <StyledViewBottom>
              <StyledTextMessage numberOfLines={2} lastMessageCnt={lastMessageCnt}>
                {message}
              </StyledTextMessage>
              <StyledTextDate>
                {created ? moment(created).fromNow() : 'nan'}
              </StyledTextDate>
            </StyledViewBottom>
          </StyledViewContent>
        </StyledViewChatRoomListItem>
      </TouchableOpacity>
    </View>
  );
}

ChannelListItem.defaultProps = {
  item: {
    id: 'room1',
    lastMessage: {
      id: 'id_3',
      sender: {
        id: 'uid_3',
        nickname: 'displayName3',
        thumbURL: '',
      },
      message: 'How are you doing?',
      created: '2020-01-01 12:00',
      updated: '2020-01-01 12:00',
    },
    lastMessageCnt: 3,
  },
};

export default ChannelListItem;
