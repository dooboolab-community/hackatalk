import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  background-color: ${({ theme }): string => theme.background};
`;

export const HeaderContainer = styled.View`
  background-color: ${({ theme }): string => theme.background};
  height: 40px;
  justify-content: center;
  margin-left: 12px;
  border-bottom-width: 1;
  border-bottom-color: ${({ theme }): string => theme.lineColor};
`;

export const SectionHeader = styled.Text`
  color: ${({ theme }): string => theme.fontSubColor};
  margin-left: 2px;
`;

export const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  height: 52px;
  align-items: center;
  /* border-width: 1px; */
`;

export const ItemIcon = styled.Image`
  width: 32px;
  height: 32px;
  border-width: 1;
  border-color: ${({ theme }): string => theme.lineColor};
  border-radius: 4;
  margin-right: 10px;
`;

export const ItemLabel = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 16px;
  flex: 1;
`;
