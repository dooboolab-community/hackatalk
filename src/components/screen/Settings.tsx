import React, { ReactElement } from 'react';
import { SectionList, SectionListData } from 'react-native';
import { SvgApple, SvgFacebook, SvgGoogle } from '../../utils/Icons';
import styled, { DefaultTheme } from 'styled-components/native';

import AsyncStorage from '@react-native-community/async-storage';
import { AuthType } from '../../types';
import { Button } from '@dooboo-ui/native';
import { FontAwesome } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { getString } from '../../../STRINGS';
import { useAuthContext } from '../../providers/AuthProvider';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 10px;
  background-color: ${({ theme }): string => theme.background};
`;

const HeaderContainer = styled.View`
  background-color: ${({ theme }): string => theme.background};
  border-bottom-color: ${({ theme }): string => theme.lineColor};
  height: 40px;
  justify-content: center;
  margin-left: 12px;
  border-bottom-width: 1px;
`;

const SectionHeader = styled.Text`
  color: ${({ theme }): string => theme.fontSubColor};
  margin-left: 2px;
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  height: 52px;
  align-items: center;
`;

const ItemLabel = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 16px;
  flex: 1;
`;

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

function Settings(props: Props): React.ReactElement {
  const { setUser } = useAuthContext();
  const { theme } = useThemeContext();
  const { navigation } = props;
  const { state: { user } } = useAuthContext();

  let signInInfoOption: SettingsOption;

  const logout = (): void => {
    if (navigation) {
      AsyncStorage.removeItem('token');
      setUser(undefined);
    }
  };

  switch (user && user.authType) {
    case AuthType.GOOGLE:
      signInInfoOption = {
        icon: <SvgGoogle width={24} fill={theme.googleIcon}/>,
        label: getString('SIGNED_IN_WITH_GOOGLE'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'change-pw-item',
      };
      break;
    case AuthType.FACEBOOK:
      signInInfoOption = {
        icon: <SvgFacebook width={24} fill={theme.facebookIcon}/>,
        label: getString('SIGNED_IN_WITH_FACEBOOK'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'change-pw-item',
      };
      break;
    case AuthType.APPLE:
      signInInfoOption = {
        icon: <SvgApple width={24} fill={theme.appleIcon}/>,
        label: getString('SIGNED_IN_WITH_APPLE'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'change-pw-item',
      };
      break;
    case AuthType.EMAIL:
    default:
      signInInfoOption = {
        label: getString('SIGNED_IN_WITH_EMAIL'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'change-pw-item',
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
        testID="test-section-list"
        sections={settings}
        renderItem={({ item }): React.ReactElement => SectionItem(item, theme)}
        keyExtractor={(item: SettingsOption): string => item.label}
        renderSectionHeader={({ section: { title } }): React.ReactElement => (
          <HeaderContainer>
            <SectionHeader>{title}</SectionHeader>
          </HeaderContainer>
        )}
      />
      <Button
        testID="button-logout"
        containerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        style={{
          width: '100%',
          height: 48,
          backgroundColor: theme.btnPrimaryLight,
          borderColor: theme.btnPrimary,
          borderWidth: 0.3,
        }}
        textStyle={{
          color: theme.btnPrimary,
          fontSize: 14,
          fontWeight: 'bold',
        }}
        onPress={logout}
        text={getString('LOGOUT')}
      />
    </Container>
  );
}

export default Settings;
