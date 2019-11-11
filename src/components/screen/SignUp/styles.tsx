import styled, {
  DefaultTheme,
  ThemeProps,
} from 'styled-components/native';

import { DefaultNavigationProps } from '../../../types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../shared/TextInput';

export interface Props extends ThemeProps<DefaultTheme> {
  displayName: string;
  navigation?: DefaultNavigationProps<'SignUp'>;
}

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  status: string;
}

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
  flex-direction: column;
`;

export const StyledScrollView = styled(KeyboardAwareScrollView).attrs(() => ({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 30,
  },
}))`
  
`;

export const ErrorText = styled.Text<{ isError: boolean }>`
  color: lightcoral;
  font-size: 12px;
  font-weight: normal;
  margin-bottom: ${({ isError }): number => isError ? 8 : 0}px;
`;

export const InnerContainer = styled.View`
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  padding: 0 44px 8px 44px;
`;

export const StyledTextInput = styled(TextInput)
  .attrs(({ theme }) => ({
    placeholderTextColor: theme.placeholder,
  }))``;

export const StyledButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
  padding-right: 44px;
  height: 60px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ButtonToRight = styled.View`
  width: 48%;
`;
