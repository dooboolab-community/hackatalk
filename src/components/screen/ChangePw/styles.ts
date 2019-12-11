import TextInput from '../../shared/TextInput';
import styled from 'styled-components/native';

export const Header = styled.View`
  height: 52px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

export const InnerContainer = styled.View`
  padding: 15px;
  flex: 1;
`;

export const StyledTextInput = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.placeholder,
}))``;
