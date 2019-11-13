import { Alert, SectionList, SectionListData } from 'react-native';
import {
  Container,
  HeaderContainer,
  ItemContainer,
  ItemIcon,
  ItemLabel,
  SectionHeader,
} from './styles';
import { DefaultNavigationProps, SettingsOption } from '../../../types';
import {
  DefaultTheme, withTheme,
} from 'styled-components/native';
import React, { useRef, useState } from 'react';
import ChangePwView from './ChangePwView';
import { FontAwesome } from '@expo/vector-icons';
import { IC_FACEBOOK } from '../../../utils/Icons';
import Modal from 'react-native-modalbox';
import { getString } from '../../../../STRINGS';

function SectionItem(option: SettingsOption, theme: DefaultTheme): React.ReactElement {
  return (
    <ItemContainer onPress={option.onPress} testID={option.testID}>
      {option.icon ? <ItemIcon source={option.icon} /> : null}
      <ItemLabel>{option.label}</ItemLabel>
      <FontAwesome name="angle-right" size={32} color={theme.fontColor} />
    </ItemContainer>
  );
}

interface Props {
  navigation: DefaultNavigationProps<'Setting'>;
  theme: DefaultTheme;
}

function SettingScreen(props: Props): React.ReactElement {
  const { theme } = props;
  const modal: React.MutableRefObject<Modal|null> = useRef(null);

  const settings: SectionListData<SettingsOption>[] = [
    {
      title: '계정정보',
      data: [{
        icon: IC_FACEBOOK,
        label: 'facebook으로 로그인 됨',
        onPress: (): void => {
          modal.current && modal.current.open();
        },
        testID: 'changePwItem',
      }],
    },
  ];
  return (
    <Container>
      <SectionList
        testID="mySectionList"
        sections={settings}
        renderItem={({ item }): React.ReactElement => SectionItem(item, props.theme)}
        keyExtractor={(item: SettingsOption): string => item.label}
        renderSectionHeader={({ section: { title } }): React.ReactElement => (
          <HeaderContainer>
            <SectionHeader>{title}</SectionHeader>
          </HeaderContainer>
        )}
      />
      <Modal
        ref={modal}
        keyboardTopOffset={0}
        coverScreen
        backButtonClose
        style={{ backgroundColor: theme.background }}>
        <ChangePwView
          close={(): void => {
            if (modal.current) {
              modal.current.close();
            }
          }} />
      </Modal>
    </Container>
  );
}

export default withTheme(SettingScreen);
