import { TouchableOpacity, View, ViewStyle } from 'react-native';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import { Chat } from '../../models/Chat';
import { Chatroom } from '../../models/Chatroom';
import Icon5 from '@expo/vector-icons/FontAwesome5';
import React from 'react';
import { User } from '../../models/User';
import moment from 'moment';

const StyledViewChatRoomListItem = styled.View`
  background: ${({ theme }) => theme.colors.background};
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledStatus = styled.View`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${({
    theme: {
      colors: { greenishCyan },
    },
  }) => greenishCyan};
  right: 0;
  bottom: 0;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.border};
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
  color: ${({ theme }) => theme.colors.text};
`;

const StyledTextCount = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledViewBottom = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledTextMessage = styled.Text<{ lastChatCnt: number }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  max-width: 150px;
  ${({ lastChatCnt }) => (lastChatCnt ? 'font-weight: bold;' : '')}
`;

const StyledTextDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subText};
  text-align: right;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
`;

interface Props extends ThemeProps<DefaultTheme> {
  testID?: string;
  style?: ViewStyle;
  item: Chatroom;
  onPress?: () => void;
}

function Shared({
  item: {
    lastChat: {
      sender: { photoURL, isOnline, displayName },
      message,
      created,
    },
    lastChatCnt,
  },
  onPress,
  theme: {
    colors: { text },
  },
}: Props) {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <StyledViewChatRoomListItem>
          <View style={{ marginHorizontal: 20 }}>
            {photoURL ? (
              <StyledImage source={{ uri: photoURL }} />
            ) : (
              <Icon5 name='meh' size={40} color={text} light />
            )}
            {isOnline ? <StyledStatus /> : <View />}
          </View>
          <StyledViewContent>
            <StyledViewTop>
              <StyledTextDisplayName>{displayName}</StyledTextDisplayName>
              {lastChatCnt !== 0 ? (
                <StyledViewContent>
                  <StyledTextCount>{lastChatCnt}</StyledTextCount>
                </StyledViewContent>
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
  item: new Chatroom('', new Chat('', new User('', '', '', ''), '')),
};

export default withTheme(Shared);
