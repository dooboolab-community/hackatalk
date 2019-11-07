import {
  ActivityIndicator,
  ImageSourcePropType,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { ReactText } from 'react';

import styled from 'styled-components/native';

interface StyledElement {
  white?: boolean;
  disabled?: boolean;
}

interface ButtonProps {
  width?: ReactText;
  height?: ReactText;
}

interface Props {
  testID: string;
  isWhite: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  style?: ViewStyle;
  onPress: (params?: any) => void | Promise<void>;
  imgLeftSrc?: ImageSourcePropType;
  indicatorColor: string;
  activeOpacity: number;
  children: string;
  width?: ReactText;
  height?: ReactText;
}

const ButtonContainer = styled.View<StyledElement>`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ white, disabled, theme }): string =>
    (disabled && theme.btnDisabled) ||
    (white && theme.btnPrimaryLight) ||
    theme.btnPrimary
  };
  border-color: ${({ white, disabled, theme }): string =>
    (disabled && theme.lineColor) ||
    (white && theme.btnPrimary) ||
    theme.btnPrimaryLight
  };
  border-radius: 4px;
  border-width: 1px;
`;

const StyledButtonContainer = styled.View<ButtonProps>`
  width: ${({ width }): ReactText | undefined => typeof width === 'number' ? `${width}px` : width};
  height: ${({ height }): ReactText | undefined => typeof height === 'number' ? `${height}px` : height};
  justify-content: center;
  align-self: stretch;
  align-items: center;
`;

const StyledButton = styled.View`
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

const StyledText = styled.Text<StyledElement>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ white, theme, disabled }): string =>
    (disabled && theme.btnPrimaryFont) ||
    (white && theme.btnPrimaryLightFont) ||
    theme.btnDisabled
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
    containerStyle,
  } = props;

  return (
    <ButtonContainer
      white={isWhite}
      style={containerStyle}
      disabled={isDisabled}
    >
      <TouchableOpacity
        testID={testID}
        activeOpacity={activeOpacity}
        onPress={onPress}
        disabled={isDisabled}
      >
        <StyledButton>
          <StyledButtonContainer width={width} height={height}>
            {(isLoading && !isDisabled) ? (
              <ActivityIndicator size="small" color={indicatorColor} />
            ) : (imgLeftSrc && !isDisabled) ? (
              <StyledImageLeft source={imgLeftSrc} />
            ) : (
              undefined
            )}
            {!isLoading ? (
              <StyledText disabled={isDisabled} white={isWhite}>{children}</StyledText>
            ) : (
              undefined
            )}
          </StyledButtonContainer>
        </StyledButton>
      </TouchableOpacity>
    </ButtonContainer>
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
