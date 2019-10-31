import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { ReactElement, useCallback, useState } from 'react';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import styled, {
  DefaultTheme,
  ThemeProps,
} from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenProps } from '../../navigation/SwitchNavigator';
import { compose } from 'recompose';

export interface Props extends ThemeProps<DefaultTheme> {
  displayName: string;
  screenProps: ScreenProps;
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface SignUpFormValues {
  email: string;
  password1: string;
  password2: string;
  name: string;
  status: string;
}

export interface ITextInput {
  error?: string;
  placeholder?: string;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: string;
}

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
  flex-direction: column;
`;

export const StyledScrollView = styled(KeyboardAwareScrollView).attrs(() => ({
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

const LabelText = styled.Text<{ isFocused: boolean }>`
  align-self: flex-start;
  color: ${({ isFocused, theme }): string => isFocused ? theme.primary : theme.labelColor};
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 6px;
`;

export const StyledText = styled.Text`
  color: blue;
  font-size: 20px;
  font-weight: bold;
  margin-top: 8px;
`;

const ErrorText = styled.Text<{ isError: boolean }>`
  color: lightcoral;
  font-size: 12px;
  font-weight: normal;
  margin-bottom: ${({ isError }): number => isError ? 8 : 0}px;
`;

const FormikForm = withNextInputAutoFocusForm(View);

const CustomizedInput = ({ error, value, placeholder, onBlur: propBlur, ...rest }: ITextInput): ReactElement => {
  const [isFocused, setFocus] = useState(false);
  return (
    <>
      <LabelText isFocused={isFocused}>{placeholder}</LabelText>
      <StyledTextInputContainer isFocused={isFocused}>
        <StyledTextInput
          {...rest}
          placeholder={placeholder}
          onFocus={useCallback(() => {
            setFocus(true);
          }, [])}
          value={value}
          onBlur={useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setFocus(false);
            if (propBlur && typeof propBlur === 'function') {
              propBlur(e);
            }
          }, [propBlur])}
        />
        {(!!value && !error && !isFocused) && <StyledStatusMark />}
      </StyledTextInputContainer>
      <ErrorText isError={!!error}>{error}</ErrorText>
    </>
  );
};

export const FormikInput = compose<any, any>(
  handleTextInput,
  withNextInputAutoFocusInput,
)(CustomizedInput);

export const StyledForm = styled(FormikForm)`
  margin-top: 30px;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  padding: 0 44px 30px 44px;
`;

const StyledTextInputContainer = styled.View<{ isFocused?: boolean }>`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${({ isFocused, theme }): string =>
    isFocused ? theme.primary : theme.lineColor};
  border-radius: 3px;
  margin-bottom: 8px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  color: ${({ theme }): string => theme.fontColor};
  font-size: 16px;
  padding: 22px 20px;
  border: none;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;  
`;

const StyledStatusMark = styled(Ionicons).attrs(({ theme }) => ({
  name: 'md-checkmark',
  size: 24,
  color: theme.status,
}))`
  padding-right: 5%;
`;

export const StyledButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
  height: 60px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
