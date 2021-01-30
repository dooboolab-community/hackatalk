import {IC_SEARCH, IC_SEARCH_W} from '../../../utils/Icons';
import React, {ReactChildren, ReactElement} from 'react';
import {ThemeType, useThemeContext} from '@dooboo-ui/theme';

import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';

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
  color: ${({theme}): string => theme.text};
  background-color: ${({theme}): string => theme.searchBackground};
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
  children?: ReactChildren;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
}

function SearchTextInput(props: Props): ReactElement {
  const {testID, onChangeText, value, containerStyle, style} = props;
  const {themeType, theme} = useThemeContext();

  return (
    <StyledTextInputWrapper style={containerStyle}>
      <StyledTextInput
        testID={testID}
        onChangeText={onChangeText}
        style={style}
        value={value}
        underlineColorAndroid="transparent" // android fix
        selectionColor={theme.text}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={false}
        defaultValue={''}
      />
      <StyledSearchImage
        source={themeType === ThemeType.LIGHT ? IC_SEARCH : IC_SEARCH_W}
      />
    </StyledTextInputWrapper>
  );
}

export default SearchTextInput;
