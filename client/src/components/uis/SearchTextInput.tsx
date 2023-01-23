import {IC_SEARCH, IC_SEARCH_W} from '../../utils/Icons';
import type {ReactElement, ReactNode} from 'react';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';

import React from 'react';
import styled from '@emotion/native';
import {useTheme} from 'dooboo-ui';

const StyledTextInputWrapper = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  padding: 12px 0;
  color: ${({theme}) => theme.text.basic};
  background-color: ${({theme}) => theme.bg.paper};
  border-radius: 4px;
  padding-left: 40px;
  padding-right: 10px;
`;

const StyledSearchImage = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 30px;
`;

interface Props {
  testID?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}

function SearchTextInput(props: Props): ReactElement {
  const {testID, onChangeText, value, containerStyle, style} = props;
  const {themeType, theme} = useTheme();

  return (
    <StyledTextInputWrapper style={containerStyle}>
      <StyledTextInput
        testID={testID}
        onChangeText={onChangeText}
        style={style}
        value={value}
        underlineColorAndroid="transparent" // android fix
        selectionColor={theme.text.basic}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={false}
      />
      <StyledSearchImage
        source={themeType === 'light' ? IC_SEARCH : IC_SEARCH_W}
      />
    </StyledTextInputWrapper>
  );
}

export default SearchTextInput;
