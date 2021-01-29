import {ActivityIndicator, TouchableOpacity} from 'react-native';
import type {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

const StyledButton = styled.View`
  background-color: ${({theme}): string => theme.link};
  align-self: center;
  border-radius: 4px;
  border-width: 2px;
  width: 320px;
  height: 52px;
  border-color: ${({theme}): string => theme.link};

  align-items: center;
  justify-content: center;
`;

const StyledButtonDisabled = styled(StyledButton)`
  background-color: ${({theme}): string => theme.disabled};
  border-color: rgb(200, 200, 200);
`;

const StyledText = styled.Text`
  font-size: 14px;
  color: ${({theme}): string => theme.textContrast};
`;

const StyledTextDisabled = styled(StyledText)`
  color: ${({theme}): string => theme.disabled};
`;

const StyledImage = styled.Image`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 16px;
`;

interface Props {
  testID?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  style?: ViewStyle;
  disabledStyle?: ViewStyle;
  textStyle?: TextStyle;
  imgLeftSrc?: ImageSourcePropType;
  imgLeftStyle?: ImageStyle;
  indicatorColor?: string;
  activeOpacity?: number;
  text?: string;
}

function Button(props: Props): React.ReactElement {
  if (props.isDisabled)
    return (
      <StyledButtonDisabled style={props.disabledStyle}>
        <StyledTextDisabled style={props.textStyle}>
          {props.text}
        </StyledTextDisabled>
      </StyledButtonDisabled>
    );

  if (props.isLoading)
    return (
      <StyledButton style={props.style}>
        <ActivityIndicator size="small" color={props.indicatorColor} />
      </StyledButton>
    );

  return (
    <TouchableOpacity
      testID={props.testID}
      activeOpacity={props.activeOpacity}
      onPress={props.onClick}>
      <StyledButton style={props.style}>
        {props.imgLeftSrc ? (
          <StyledImage style={props.imgLeftStyle} source={props.imgLeftSrc} />
        ) : null}
        <StyledText style={props.textStyle}>{props.text}</StyledText>
      </StyledButton>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  isLoading: false,
  isDisabled: false,
  indicatorColor: 'white',
  activeOpacity: 0.5,
};

export default Button;
