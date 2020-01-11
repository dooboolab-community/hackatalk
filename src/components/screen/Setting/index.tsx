import {
  Container,
  HeaderContainer,
  ItemContainer,
  ItemLabel,
  SectionHeader,
} from './styles';
import React, { ReactElement } from 'react';
import { SectionList, SectionListData } from 'react-native';
import { SvgApple, SvgFacebook, SvgGoogle } from '../../../utils/Icons';

import { DefaultTheme } from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../../navigation/MainStackNavigator';
import { SocialType } from '../../../types';
import { getString } from '../../../../STRINGS';
import { useAuthUserContext } from '../../../providers/AuthUserProvider';
import { useThemeContext } from '@dooboo-ui/native-theme';

interface SettingsOption {
  label: string;
  icon?: ReactElement;
  onPress(): void;
  testID: string;
}

function SectionItem(
  option: SettingsOption,
  theme: DefaultTheme,
): React.ReactElement {
  return (
    <ItemContainer onPress={option.onPress} testID={option.testID}>
      {option.icon || null}
      <ItemLabel>{option.label}</ItemLabel>
      <FontAwesome name="angle-right" size={24} color={theme.fontColor} />
    </ItemContainer>
  );
}

export interface Props {
  navigation: MainStackNavigationProps;
}

function SettingScreen(props: Props): React.ReactElement {
  const { theme } = useThemeContext();
  const { navigation } = props;
  const {
    state: { user },
  } = useAuthUserContext();

  let signInInfoOption: SettingsOption;

  switch (user && user.social) {
    case SocialType.Google:
      signInInfoOption = {
        icon: <SvgGoogle width={24} fill={theme.googleIcon}/>,
        label: getString('SIGNED_IN_WITH_GOOGLE'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'changePwItem',
      };
      break;
    case SocialType.Facebook:
      signInInfoOption = {
        icon: <SvgFacebook width={24} fill={theme.facebookIcon}/>,
        label: getString('SIGNED_IN_WITH_FACEBOOK'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'changePwItem',
      };
      break;
    case SocialType.Apple:
      signInInfoOption = {
        icon: <SvgApple width={24} fill={theme.appleIcon}/>,
        label: getString('SIGNED_IN_WITH_APPLE'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'changePwItem',
      };
      break;
    case SocialType.Email:
    default:
      signInInfoOption = {
        label: getString('SIGNED_IN_WITH_EMAIL'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'changePwItem',
      };
      break;
  }

  const settings: SectionListData<SettingsOption>[] = [
    {
      title: getString('LOGIN_INFORMATION'),
      data: [signInInfoOption],
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
    </Container>
  );
}

export default SettingScreen;
