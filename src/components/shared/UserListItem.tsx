import { TouchableOpacity, View, ViewStyle } from 'react-native';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import { User as Friend } from '../../models/User';
import Icon5 from '@expo/vector-icons/FontAwesome5';
// @flow
import React from 'react';

interface Props extends ThemeProps<DefaultTheme> {
  testID?: string;
  testObj?: any;
  style?: ViewStyle;
  user: Friend;
  onPress?: () => void;
  onLongPress?: () => void;
}

const StyledWrapperView = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

const StyledContainerView = styled.View`
  width: 100%;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const StyledText = styled.Text`
  margin-left: 12px;
  width: 100px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledRightText = styled.Text`
  position: absolute;
  right: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  max-width: 134.2px;
  border-width: 0.3px;
  border-color: ${({ theme }) => theme.colors.subBorder};
  padding: 4px 8px;
`;

function Shared({
  onPress,
  onLongPress,
  user: { photoURL, displayName, statusMsg },
  theme,
}: Props) {
  const photoURLObj =
    typeof photoURL === 'string' ? { uri: photoURL } : photoURL;
  return (
    <StyledContainerView>
      <TouchableOpacity
        testID='press_id'
        activeOpacity={0.5}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <StyledWrapperView>
          {photoURL ? (
            <StyledImage source={photoURLObj} />
          ) : (
            <Icon5 name='meh' size={40} color={theme.colors.text} light />
          )}
          <StyledText>{displayName}</StyledText>
          {statusMsg ? (
            <StyledRightText>{statusMsg}</StyledRightText>
          ) : (
            <View />
          )}
        </StyledWrapperView>
      </TouchableOpacity>
    </StyledContainerView>
  );
}

Shared.defaultProps = {
  user: {
    uid: '',
    displayName: '',
    photoURL: null,
    statusMsg: '',
    isOnline: false,
    friends: [],
    chatrooms: [],
    created: undefined,
    updated: undefined,
  },
};
export default withTheme(Shared);
