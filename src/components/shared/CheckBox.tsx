import React, { ReactElement } from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

import styled from 'styled-components/native';

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

const StyledCheckBox = styled.View`
  height: 12px;
  width: 12px;
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
}

function Shared(props: Props): ReactElement {
  const {
    containerStyle,
    checkStyle,
    checkColor = '#707070',
    text = '',
    hasChecked,
    onToggle,
    testID,
  } = props;
  return (
    <Container style={containerStyle}>
      <TouchableOpacity
        testID={testID}
        style={{ flexDirection: 'row' }}
        onPress={onToggle}
      >
        <StyledCheck
          style={[
            checkStyle,
            {
              borderColor: checkColor,
            },
          ]}
        >
          <StyledCheckBox
            style={{ backgroundColor: hasChecked ? checkColor : 'transparent' }}
          ></StyledCheckBox>
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
