import type {TextStyle, ViewStyle} from 'react-native';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import React from 'react';
import type {ReactElement} from 'react';
import {SvgCheck} from '../../utils/Icons';
import styled from '@emotion/native';

const Container = styled.View`
  height: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledCheck = styled.View`
  height: 20px;
  width: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #707070;

  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 14px;
  margin-left: 8px;
`;

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  checkStyle?: ViewStyle;
  textStyle?: TextStyle;
  onToggle?: () => void;
  hasChecked?: boolean;
  text?: string;
  checkColor?: string;
  activeColor?: string;
  inActiveColor?: string;
  backgroundColor?: string;
}

function Shared(props: Props): ReactElement {
  const {
    containerStyle,
    checkStyle,
    checkColor = '#000',
    activeColor = '#707070',
    inActiveColor = '#000',
    backgroundColor = 'white',
    text = '',
    hasChecked,
    onToggle,
    testID,
  } = props;

  return (
    <Container style={containerStyle}>
      <TouchableOpacity
        testID={testID}
        style={{flexDirection: 'row'}}
        onPress={onToggle}
      >
        <StyledCheck
          style={[
            checkStyle,
            {
              backgroundColor: hasChecked ? activeColor : backgroundColor,
              borderColor: inActiveColor,
              borderWidth: hasChecked ? 0 : 2,
            },
          ]}
        >
          {hasChecked ? (
            <SvgCheck width={14} height={14} fill={checkColor} />
          ) : null}
        </StyledCheck>
      </TouchableOpacity>
      <TouchableWithoutFeedback testID={`${testID}-nofeed`} onPress={onToggle}>
        <StyledText
          style={{
            color: checkColor,
          }}
        >
          {text}
        </StyledText>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default Shared;
