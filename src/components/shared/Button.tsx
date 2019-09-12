import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
  containerStyle: ViewStyle;
  isWhite: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  onPress: () => void;
  imgLeftSrc: any;
  indicatorColor: string;
  activeOpacity: number;
  children: any;
  width: number;
  height: number;
}

const StyledContainer = styled.View`
  flex: 1;
`;

const StyledButtonContainer = styled.View<IButtonContainer>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.View<IStyledElement>`
  background-color: ${({
    white,
    theme: {
      colors: { primaryButton, secondaryButton },
    },
  }) => (white ? secondaryButton : primaryButton)};
  border-color: ${({
    white,
    theme: {
      colors: { primaryButtonBorder, secondaryButtonBorder },
    },
  }) => (white ? secondaryButtonBorder : primaryButtonBorder)};
  border-radius: 4px;
  border-width: 1px;
  shadow-color: ${({
    theme: {
      colors: { primaryButton },
    },
  }) => primaryButton};
  shadow-radius: ${({ white }) => (white ? 0 : 4)};
  shadow-opacity: ${({ white }) => (white ? 0.0 : 0.3)};
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

const StyledText = styled.Text<IStyledElement>`
  font-size: 14px;
  font-weight: bold;
  color: ${({
    white,
    theme: {
      colors: { primaryButtonText, secondaryButtonText },
    },
  }) => (white ? secondaryButtonText : primaryButtonText)};
`;

const StyledImageLeft = styled.Image`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 16px;
`;

function Button({
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
}: Partial<Props>) {
  return (
    <StyledContainer>
      {isDisabled ? (
        <StyledButtonDisabled>
          <StyledText>{children}</StyledText>
        </StyledButtonDisabled>
      ) : (
        <TouchableOpacity
          testID='press_id'
          activeOpacity={activeOpacity}
          onPress={onPress}
        >
          <StyledButton white={isWhite}>
            <StyledButtonContainer width={width} height={height}>
              {isLoading ? (
                <ActivityIndicator size='small' color={indicatorColor} />
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
    </StyledContainer>
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
