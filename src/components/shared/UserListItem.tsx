import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { User } from '../../types';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

interface Props {
  testID?: string;
  style?: ViewStyle;
  user: User;
  onPress?: () => void;
  onLongPress?: () => void;
}

const Container = styled.View`
  width: 100%;
`;

const Wrapper = styled.View`
  background-color: ${({ theme }): string => theme.background};
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({ theme }): string => theme.lineColor};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const StyledText = styled.Text`
  margin-left: 12px;
  width: 100px;
  font-size: 14px;
  color: ${({ theme }): string => theme.fontColor};
`;

const StyledRightText = styled.Text`
  position: absolute;
  right: 20px;
  font-size: 12px;
  color: ${({ theme }): string => theme.fontSubColor};
  max-width: 134.2px;
  border-width: 0.3px;
  border-color: ${({ theme }): string => theme.lineColor};
  padding: 4px 8px;
`;

function Shared({
  onPress,
  onLongPress,
  testID,
  user: { photoURL, displayName, statusMsg },
}: Props): React.ReactElement {
  const { theme } = useThemeContext();
  const photoURLObj =
    typeof photoURL === 'string' ? { uri: photoURL } : photoURL;
  return (
    <Container>
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.5}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Wrapper>
          {photoURL ? (
            <StyledImage source={photoURLObj} />
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="ios-person" size={24} color={theme.fontColor} />
            </View>
          )}
          <StyledText>{displayName}</StyledText>
          {statusMsg ? (
            <StyledRightText>{statusMsg}</StyledRightText>
          ) : (
            <View />
          )}
        </Wrapper>
      </TouchableOpacity>
    </Container>
  );
}

Shared.defaultProps = {
  user: {
    uid: '',
    displayName: '',
    photoURL: null,
    statusMsg: '',
    online: false,
    friends: [],
    chatrooms: [],
    created: undefined,
    updated: undefined,
  },
};
export default Shared;
