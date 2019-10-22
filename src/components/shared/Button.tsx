import {
  ActivityIndicator,
  ImageSourcePropType,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

interface StyledElement {
  white?: boolean;
}

interface ButtonContainer {
  width: number;
  height: number;
}

interface Props {
  testID: string;
  containerStyle?: ViewStyle;
  isWhite: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  onPress: () => void;
  imgLeftSrc?: ImageSourcePropType;
  indicatorColor: string;
  activeOpacity: number;
  children: string;
  width: number;
  height: number;
}

const StyledButtonContainer = styled.View<ButtonContainer>`
  width: ${({ width }): string => `${width}px`};
  height: ${({ height }): string => `${height}px`};
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.View<StyledElement>`
  background-color: ${({ white, theme }): string =>
    white ? theme.btnPrimaryLight : theme.btnPrimary};
  border-color: ${({ white, theme }): string =>
    white ? theme.btnPrimary : theme.btnPrimaryLight};
  border-radius: 4px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const StyledButtonDisabled = styled.View`
  background-color: rgb(243, 243, 243);
  align-self: center;
  border-radius: 4px;
  border-width: 2px;
  border-color: #333;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text<StyledElement>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ white, theme }): string =>
    white ? theme.btnPrimaryLightFont : theme.btnPrimaryFont};
`;

const StyledImageLeft = styled.Image`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 16px;
`;

function Button(props: Props): React.ReactElement {
  const {
    testID,
    isDisabled,
    isWhite,
    activeOpacity,
    onPress,
    isLoading,
    width,
    height,
    indicatorColor,
    imgLeftSrc,
    children,
  } = props;

  return (
    <>
      {isDisabled ? (
        <StyledButtonDisabled testID={testID}>
          <StyledText>{children}</StyledText>
        </StyledButtonDisabled>
      ) : (
        <TouchableOpacity
          testID={testID}
          activeOpacity={activeOpacity}
          onPress={onPress}
        >
          <StyledButton white={isWhite}>
            <StyledButtonContainer width={width} height={height}>
              {isLoading ? (
                <ActivityIndicator size="small" color={indicatorColor} />
              ) : imgLeftSrc ? (
                <StyledImageLeft source={imgLeftSrc} />
              ) : (
                undefined
              )}
              {!isLoading ? (
                <StyledText white={isWhite}>{children}</StyledText>
              ) : (
                undefined
              )}
            </StyledButtonContainer>
          </StyledButton>
        </TouchableOpacity>
      )}
    </>
  );
}

Button.defaultProps = {
  isWhite: false,
  isLoading: false,
  isDisabled: false,
  indicatorColor: 'white',
  activeOpacity: 0.5,
  width: 136,
  height: 60,
};

export default Button;
