import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../shared/TextInput';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
  flex-direction: column;
`;

export const StyledScrollView = styled(KeyboardAwareScrollView).attrs(() => ({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
}))``;

export const InnerContainer = styled.View`
  align-self: stretch;
  flex-direction: column;
  align-items: center;
  padding: 0 44px 30px 44px;
`;

export const StyledText = styled.Text`
  font-size: 16;
  color: blue;
`;

export const ErrorText = styled.Text<{ isError: boolean }>`
  color: lightcoral;
  font-size: 12px;
  font-weight: normal;
  margin-bottom: ${({ isError }): number => isError ? 8 : 0}px;
`;

export const StyledTextInput = styled(TextInput)
  .attrs(({ theme }) => ({
    placeholderTextColor: theme.placeholder,
  }))``;

export const StyledButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
  height: 60px;
  padding: 0px;
`;
