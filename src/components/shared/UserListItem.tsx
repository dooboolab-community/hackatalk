import { ImageSourcePropType, TouchableOpacity, View, ViewStyle } from 'react-native';

import CheckBox from './CheckBox';
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
  showCheckBox?: boolean;
  checked?: boolean;
}

const Container = styled.View`
  width: 100%;
`;

const Wrapper = styled.View`
  background-color: ${({ theme }): string => theme.itemBackground};
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({ theme }): string => theme.backgroundDark};
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
  width: 200px;
  font-size: 14px;
  color: ${({ theme }): string => theme.fontColor};
`;

const StyledRightText = styled.Text`
  position: absolute;
  right: 20px;
  font-size: 12px;
  color: ${({ theme }): string => theme.fontSubColor};
  max-width: 120px;
  border-width: 0.3px;
  border-color: ${({ theme }): string => theme.lineColor};
  padding: 4px 8px;
`;

function Shared({
  showCheckBox = false,
  checked = false,
  onPress,
  onLongPress,
  testID,
  user: { photoURL = '', nickname, statusMessage },
}: Props): React.ReactElement {
  const { theme } = useThemeContext();
  const photoURLObj: ImageSourcePropType =
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
          {
            photoURL
              ? <StyledImage source={photoURLObj} />
              : <View
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="ios-person" size={24} color={theme.fontColor} />
              </View>
          }
          <StyledText
            numberOfLines={1}
          >{nickname}</StyledText>
          {
            showCheckBox
              ? <CheckBox
                containerStyle={{
                  position: 'absolute',
                  right: 20,
                }}
                checkColor={theme.tintColor}
                hasChecked={checked}
                onToggle={onPress}
              />
              : statusMessage
                ? <StyledRightText>{statusMessage}</StyledRightText>
                : null
          }
        </Wrapper>
      </TouchableOpacity>
    </Container>
  );
}

Shared.defaultProps = {
  user: {
    id: '',
    nickname: '',
    photoURL: null,
    statusMessage: '',
    isOnline: false,
    friends: [],
    channels: [],
    created: undefined,
    updated: undefined,
  },
};
export default Shared;
