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
  disabled?: boolean;
}

interface ButtonContainer {
  width: number;
  height: number;
}

interface Props {
  testID: string;
  isWhite: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
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
  background-color: ${({ theme }): string => theme.btnDisabled};
  border-color: ${({ theme }): string => theme.lineColor};
  align-self: center;
  border-radius: 4px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text<StyledElement>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ white, theme, disabled }): string =>
    white
      ? theme.btnPrimaryLightFont
      : (
        disabled
          ? theme.btnPrimaryFont
          : theme.btnDisabled
      )
  };
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
          <StyledButtonContainer width={width} height={height}>
            <StyledText disabled>{children}</StyledText>
          </StyledButtonContainer>
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
