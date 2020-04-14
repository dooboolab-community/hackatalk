import { ImageSourcePropType, TouchableOpacity, View, ViewStyle } from 'react-native';

import CheckBox from './CheckBox';
import { IC_NO_IMAGE } from '../../utils/Icons';
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
  checked = false,
  onPress,
  onLongPress,
  testID,
  user: { photoURL = '', name, statusMessage },
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
                <StyledImage
                  source={IC_NO_IMAGE}
                />
              </View>
          }
          <StyledText
            numberOfLines={1}
          >{name}</StyledText>
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
