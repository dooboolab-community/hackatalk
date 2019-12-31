import {
  Container,
  HeaderContainer,
  ItemContainer,
  ItemIcon,
  ItemLabel,
  SectionHeader,
} from './styles';
import { IC_FACEBOOK, IC_GOOGLE } from '../../../utils/Icons';
import { SectionList, SectionListData } from 'react-native';
import {
  SettingsOption,
  SignInType,
} from '../../../types';

import { DefaultTheme } from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../../navigation/MainStackNavigator';
import React from 'react';
import { getString } from '../../../../STRINGS';
import { useAuthUserContext } from '../../../providers/AuthUserProvider';
import { useThemeContext } from '@dooboo-ui/native-theme';

function SectionItem(
  option: SettingsOption,
  theme: DefaultTheme,
): React.ReactElement {
  return (
    <ItemContainer onPress={option.onPress} testID={option.testID}>
      {option.icon ? (
        <ItemIcon resizeMode="contain" source={option.icon} />
      ) : null}
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

  switch (user && user.signedInWith) {
    case SignInType.Google:
      signInInfoOption = {
        icon: IC_GOOGLE,
        label: getString('SIGNED_IN_WITH_GOOGLE'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'changePwItem',
      };
      break;
    case SignInType.Facebook:
      signInInfoOption = {
        icon: IC_FACEBOOK,
        label: getString('SIGNED_IN_WITH_FACEBOOK'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'changePwItem',
      };
      break;
    case SignInType.Email:
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
