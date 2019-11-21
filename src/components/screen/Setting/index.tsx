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
import React, { useRef } from 'react';
import ChangePwView from './ChangePw';
import { FontAwesome } from '@expo/vector-icons';
import { IC_FACEBOOK } from '../../../utils/Icons';
import Modal from 'react-native-modalbox';
import { getString } from '../../../../STRINGS';
import { useThemeContext } from '../../../providers/ThemeProvider';

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
}

function SettingScreen(props: Props): React.ReactElement {
  const { theme } = useThemeContext();
  const modal: React.MutableRefObject<Modal | null> = useRef(null);

  const settings: SectionListData<SettingsOption>[] = [
    {
      title: getString('LOGIN_INFORMATION'),
      data: [{
        icon: IC_FACEBOOK,
        label: getString('SIGNED_IN_WITH_FACEBOOK'),
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
        renderItem={({ item }): React.ReactElement => SectionItem(item, theme)}
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
          }}
          validateCurrentPw={async (text: string): Promise<boolean> => {
            // TODO: check current password.
            return (text === 'right');
          }} />
      </Modal>
    </Container>
  );
}

export default withTheme(SettingScreen);
