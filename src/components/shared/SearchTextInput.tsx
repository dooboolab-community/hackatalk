import { IC_SEARCH, IC_SEARCH_W } from '../../utils/Icons';
import React, { ReactChildren, ReactElement } from 'react';
import { ThemeType, useThemeContext } from '@dooboo-ui/native-theme';

import styled from 'styled-components/native';

const StyledSearchView = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  overflow: hidden;
  align-items: center;
  margin-bottom: 4px;
`;

const StyledTextInputWrapper = styled.View`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;
const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 36px;
  color: ${({ theme }): string => theme.fontColor};
  background-color: ${({ theme }): string => theme.searchBackground};
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
}

function SearchTextInput(props: Props): ReactElement {
  const { testID, onChangeText, value } = props;
  const { themeType, theme } = useThemeContext();

  return <StyledSearchView>
    <StyledTextInputWrapper>
      <StyledTextInput
        testID={testID}
        onChangeText={onChangeText}
        value={value}
        underlineColorAndroid="transparent" // android fix
        selectionColor={theme.fontColor}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={false}
        defaultValue={''}
      />
      <StyledSearchImage source={
        themeType === ThemeType.LIGHT ? IC_SEARCH : IC_SEARCH_W}
      />
    </StyledTextInputWrapper>
  </StyledSearchView>;
}

export default SearchTextInput;
