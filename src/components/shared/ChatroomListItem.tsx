import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { Chatroom } from '../../types';
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
  width: 16;
  height: 16;
  border-radius: 8;
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

const StyledTextMessage = styled.Text<{ lastChatCnt: number }>`
  font-size: 12px;
  color: ${({ theme }): string => theme.fontColor};
  max-width: 150px;
  ${({ lastChatCnt }): string => (lastChatCnt ? 'font-weight: bold;' : '')}
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
  item: Chatroom;
  onPress?: () => void;
  fontColor?: string;
}

function Shared(props: Props): React.ReactElement {
  const {
    theme: { fontColor },
  } = useThemeContext();

  const {
    item: {
      lastChat: {
        sender: { photoURL, online, displayName },
        // @ts-ignore
        message,
        messageType,
        created,
      },
      lastChatCnt,
    },
    onPress,
  } = props;
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
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
            {online ? <StyledStatus /> : <View />}
          </View>
          <StyledViewContent>
            <StyledViewTop>
              <StyledTextDisplayName>{displayName}</StyledTextDisplayName>
              {lastChatCnt !== 0 ? (
                <StyledTextWrapper>
                  <StyledTextCount>{lastChatCnt}</StyledTextCount>
                </StyledTextWrapper>
              ) : (
                <View />
              )}
            </StyledViewTop>
            <StyledViewBottom>
              <StyledTextMessage numberOfLines={2} lastChatCnt={lastChatCnt}>
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

Shared.defaultProps = {
  item: {
    id: 'room1',
    lastChat: {
      id: 'id_3',
      sender: {
        uid: 'uid_3',
        displayName: 'displayName3',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
        online: false,
      },
      message: 'How are you doing?',
      created: new Date(0),
      updated: new Date(0),
    },
    lastChatCnt: 3,
  },
};

export default Shared;
