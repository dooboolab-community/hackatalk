import { Alert, SectionListData, SectionList } from 'react-native';
import { DefaultNavigationProps, SettingsOption } from '../../types';
import styled, {
  DefaultTheme, withTheme,
} from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { IC_FACEBOOK } from '../../utils/Icons';
import React from 'react';

const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  background-color: ${({ theme }): string => theme.background};
`;

const HeaderContainer = styled.View`
  height: 52px;
  justify-content: center;
  margin-left: 10px;
  border-bottom-width: 1;
  border-bottom-color: ${({ theme }): string => theme.lineColor};
`;

const SectionHeader = styled.Text`
  color: ${({ theme }): string => theme.fontSubColor};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  height: 52px;
  align-items: center;
  /* border-width: 1px; */
`;

const ItemIcon = styled.Image`
  width: 32px;
  height: 32px;
  resize-mode: contain;
  border-width: 1;
  border-color: ${({ theme }): string => theme.lineColor};
  border-radius: 4;
  margin-right: 10px;
`;

const ItemLabel = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 16px;
  flex: 1;
`;

const settings: SectionListData<SettingsOption>[] = [
  {
    title: '계정정보',
    data: [{ icon: IC_FACEBOOK, label: 'facebook으로 로그인 됨', onPress: (): void => Alert.alert('test') }],
  },
];

function SectionItem(option: SettingsOption, theme: DefaultTheme): React.ReactElement {
  return (
    <ItemContainer onPress={option.onPress}>
      {option.icon ? <ItemIcon source={option.icon} /> : null}
      <ItemLabel>{option.label}</ItemLabel>
      <FontAwesome name="angle-right" size={32} color={theme.fontColor} />
    </ItemContainer>
  );
}

interface Props {
  navigation?: DefaultNavigationProps<'Setting'>;
  theme: DefaultTheme;
}

function SettingScreen(props: Props): React.ReactElement {
  return (
    <Container>
      <SectionList
        testID="mySectionList"
        sections={settings}
        renderItem={({ item }): React.ReactElement => SectionItem(item, props.theme)}
        renderSectionHeader={({ section: { title } }): React.ReactElement => (
          <HeaderContainer>
            <SectionHeader>{title}</SectionHeader>
          </HeaderContainer>
        )}
      />
    </Container>
  );
}

export default withTheme(SettingScreen);
