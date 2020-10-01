import { ImageSourcePropType, TouchableOpacity, View, ViewStyle } from 'react-native';

import CheckBox from './CheckBox';
import { IC_NO_IMAGE } from '../../utils/Icons';
import React from 'react';
import { User } from '../../types/graphql';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

interface Props {
  testID?: string;
  style?: ViewStyle;
  user: User;
  onPress?: () => void;
  onLongPress?: () => void;
  showCheckBox?: boolean;
  showStatus?: boolean;
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

const ImageWrapper = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const StatusTag = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 25px;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const StyledText = styled.Text`
  margin-left: 12px;
  width: 200px;
  font-size: 14px;
  font-weight: bold;
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
  showStatus = false,
  checked = false,
  onPress,
  onLongPress,
  testID,
  user: { photoURL = '', email, nickname, name, statusMessage, isOnline },
}: Props): React.ReactElement {
  const { theme } = useThemeContext();

  const photoURLObj: ImageSourcePropType | null =
    typeof photoURL === 'string'
      ? { uri: photoURL }
      : photoURL;

  return (
    <Container>
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.5}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Wrapper>
          <ImageWrapper>
            <StyledImage
              source={
                photoURL && photoURLObj
                  ? photoURLObj
                  : IC_NO_IMAGE
              }
            />
            {
              showStatus
                ? <StatusTag style={{ backgroundColor: isOnline ? '#00D4AB' : '#AFB4C3' }} />
                : null
            }
          </ImageWrapper>
          <StyledText numberOfLines={1}>{name || nickname}</StyledText>
          {
            showCheckBox
              ? <CheckBox
                containerStyle={{
                  position: 'absolute',
                  right: 20,
                }}
                backgroundColor={theme.background}
                checkColor={theme.font}
                inActiveColor={theme.inactiveColor}
                activeColor={theme.checkBackground}
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
    name: '',
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
