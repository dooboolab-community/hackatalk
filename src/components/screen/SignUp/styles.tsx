import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { ReactElement } from 'react';
import { TextInput, View } from 'react-native';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import styled, {
  DefaultTheme,
  ThemeProps,
} from 'styled-components/native';

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
}

export interface ITextInput {
  error?: string;
  focused?: boolean;
  [s: string]: string | boolean | undefined;
}

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
  flex-direction: column;
`;

export const StyledScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flex: 1 },
  keyboardShouldPersistTaps: 'handled',
}))`
  flex: 1;
`;

export const StyledText = styled.Text`
  color: blue;
  font-size: 20px;
  font-weight: bold;
  margin-top: 8px;
`;

const ErrorText = styled.Text`
  color: lightcoral;
  font-size: 12px;
  font-weight: normal;
  margin-vertical: 2px;
`;

const FormikForm = withNextInputAutoFocusForm(View);

const CustomizedInput = ({ error, ...rest }: ITextInput): ReactElement => (
  <>
    <StyledTextInput {...rest} />
    <ErrorText>{error}</ErrorText>
  </>
);

export const FormikInput = compose<any, any>(
  handleTextInput,
  withNextInputAutoFocusInput,
)(CustomizedInput);

export const StyledForm = styled(FormikForm)`
  margin-top: 100px;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  padding: 0 44px;
`;

const StyledTextInput = styled(TextInput)<{ focused?: boolean }>`
  margin-bottom: 8px;
  align-self: stretch;
  color: ${({ theme }): string => theme.fontColor};
  font-size: 16px;
  padding: 22px 20px;
  border-width: 1px;
  border-color: ${({ focused, theme }): string =>
    focused ? theme.primary : theme.lineColor};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledButtonWrapper = styled.View`
  align-self: stretch;
  margin-top: 20px;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
