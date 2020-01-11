import Constants from 'expo-constants';
import TextInput from '../../shared/TextInput';
import styled from 'styled-components/native';

export const Header = styled.View`
  height: ${52 + Constants.statusBarHeight}px;
  padding-top: ${Constants.statusBarHeight}px;
  background-color: ${({ theme }): string => theme.background};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  height: 52px;
  padding: 8px;
  position: absolute;
  right: 10px;
  top: ${Constants.statusBarHeight}px;
  justify-content: center;
`;

export const InnerContainer = styled.View`
  padding: 0 24px;
  flex: 1;
  width: 100%;
`;

export const StyledTextInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.placeholder,
}))``;
