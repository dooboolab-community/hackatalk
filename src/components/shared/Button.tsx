import {
  ActivityIndicator,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, { ReactText } from 'react';

import styled from 'styled-components/native';

interface StyledElement {
  white?: boolean;
  disabled?: boolean;
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

const StyledButton = styled.TouchableOpacity<StyledElement>`
  background-color: ${
  ({ white, disabled, theme }): string =>
    (disabled && theme.btnDisabled) ||
    (white && theme.btnPrimaryLight) ||
    theme.btnPrimary
  };
  border-color: ${({ white, disabled, theme }): string =>
    (disabled && theme.lineColor) ||
    (white && theme.btnPrimary) ||
    theme.btnPrimaryLight
  };
  width: ${({ width }): ReactText | undefined => typeof width === 'number' ? `${width}px` : width};
  height: ${({ height }): ReactText | undefined => typeof height === 'number' ? `${height}px` : height};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border-width: 1px;
`;

const StyledText = styled.Text<StyledElement>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ white, theme, disabled }): string =>
    (disabled && theme.textDisabled) ||
    (white && theme.btnPrimaryLightFont) ||
    theme.btnPrimaryFont
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
    <StyledButton
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onPress}
      white={isWhite}
      style={StyleSheet.flatten(containerStyle)}
      disabled={isDisabled}
      width={width}
      height={height}
    >
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
    </StyledButton>
  );
}

Button.defaultProps = {
  isWhite: false,
  isLoading: false,
  isDisabled: false,
  indicatorColor: 'white',
  activeOpacity: 0.5,
  width: 'auto',
  height: 60,
};

export default Button;
