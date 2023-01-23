import {Button, Typography, TypographyInverted, useTheme} from 'dooboo-ui';
import type {FC, ReactElement} from 'react';
import React, {useState} from 'react';
import {SectionList, TouchableHighlight, View} from 'react-native';
import {SvgApple, SvgFacebook, SvgGoogle} from '../../utils/Icons';
import styled, {css} from '@emotion/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import type {DoobooTheme} from 'dooboo-ui';
import {FontAwesome} from '@expo/vector-icons';
import type {MainStackNavigationProps} from '../navigations/MainStackNavigator';
import Modal from 'react-native-modalbox';
import type {NotificationDeleteNotificationMutation} from '../../__generated__/NotificationDeleteNotificationMutation.graphql';
import type {SectionListData} from 'react-native';
import type {UseMutationConfig} from 'react-relay';
import type {UserDeleteUserMutation} from '../../__generated__/UserDeleteUserMutation.graphql';
import {deleteNotification} from '../../relay/queries/Notification';
import {deleteUser} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import {useAuthContext} from '../../providers/AuthProvider';
import {useMutation} from 'react-relay';
import {useNavigation} from '@react-navigation/core';

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: 10px;
  background-color: ${({theme}) => theme.background};
`;

const HeaderContainer = styled.View`
  background-color: ${({theme}) => theme.background};
  border-bottom-color: ${({theme}) => theme.disabled};
  height: 40px;
  justify-content: center;
  margin-left: 12px;
  border-bottom-width: 1px;
`;

const SectionHeader = styled.Text`
  color: ${({theme}) => theme.primary};
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
  color: ${({theme}) => theme.text};
  font-size: 16px;
  flex: 1;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalViewContainer = styled.View`
  padding: 40px;
  background-color: ${({theme}) => theme.background};
  border: ${({theme}) => theme.primary};
  border-width: 0.3px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ModalBtnContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;

  justify-content: space-between;
`;

const ModalBtnStyle = styled.View`
  background-color: ${({theme}) => theme.primary};
  opacity: 0.8;
  width: 120px;
  height: 40px;

  justify-content: center;
  align-items: center;
`;

interface SettingsOption {
  label: string;
  icon?: ReactElement;
  onPress(): void;
  testID: string;
}

const Settings: FC = () => {
  let signInInfoOption: SettingsOption;

  const [showModal, setShowModal] = useState(false);
  const {user, signOutAsync} = useAuthContext();
  const {theme} = useTheme();
  const navigation = useNavigation<MainStackNavigationProps<'Settings'>>();

  const [commitNotification] =
    useMutation<NotificationDeleteNotificationMutation>(deleteNotification);

  const [commitDeleteAccount] = useMutation<UserDeleteUserMutation>(deleteUser);

  const renderSectionItem = (
    option: SettingsOption,
    themeProps: DoobooTheme,
  ): React.ReactElement => {
    const isEmailUser = (user?.profile?.authType || 'email') === 'email';

    return (
      <ItemContainer
        onPress={isEmailUser ? option.onPress : undefined}
        testID={option.testID}
      >
        {option.icon || null}
        <ItemLabel style={{marginLeft: 8, marginTop: 2}}>
          {option.label}
        </ItemLabel>
        {isEmailUser ? (
          <FontAwesome
            name="angle-right"
            size={24}
            color={themeProps.text.basic}
          />
        ) : null}
      </ItemContainer>
    );
  };

  const logout = async (): Promise<void> => {
    if (navigation) {
      AsyncStorage.removeItem('token');

      const pushToken = await AsyncStorage.getItem('push_token');

      if (pushToken) {
        const deleteNotificationMutationConfig: UseMutationConfig<NotificationDeleteNotificationMutation> =
          {variables: {token: pushToken}};

        commitNotification(deleteNotificationMutationConfig);
      }

      signOutAsync();
    }
  };

  const deleteAccount = async (): Promise<void> => {
    if (navigation) {
      const pushToken = await AsyncStorage.getItem('push_token');

      const deleteAccountMutationConfig: UseMutationConfig<UserDeleteUserMutation> =
        {
          variables: {id: user?.id || ''},
          onCompleted: () => {
            AsyncStorage.removeItem('token');

            if (pushToken) {
              const deleteNotificationMutationConfig: UseMutationConfig<NotificationDeleteNotificationMutation> =
                {variables: {token: pushToken}};
              commitNotification(deleteNotificationMutationConfig);
              signOutAsync();
            }
          },
        };

      commitDeleteAccount(deleteAccountMutationConfig);
    }

    setShowModal(false);
  };

  switch (user?.profile?.authType) {
    case 'google':
      signInInfoOption = {
        icon: <SvgGoogle width={24} fill={theme.text} />,
        label: getString('SIGNED_IN_WITH_GOOGLE'),
        onPress: (): void => {
          navigation.navigate('ChangePw');
        },
        testID: 'change-pw-item',
      };

      break;
    case 'facebook':
      signInInfoOption = {
        icon: <SvgFacebook width={24} fill={theme.text} />,
        label: getString('SIGNED_IN_WITH_FACEBOOK'),
        onPress: () => {
          navigation.navigate('ChangePw');
        },
        testID: 'change-pw-item',
      };

      break;
    case 'apple':
      signInInfoOption = {
        icon: <SvgApple width={24} fill={theme.text} />,
        label: getString('SIGNED_IN_WITH_APPLE'),
        onPress: () => {
          navigation.navigate('ChangePw');
        },
        testID: 'change-pw-item',
      };

      break;
    case 'email':
    default:
      signInInfoOption = {
        label: getString('SIGNED_IN_WITH_EMAIL'),
        onPress: () => {
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
        renderItem={({item}): React.ReactElement =>
          renderSectionItem(item, theme)
        }
        keyExtractor={(item: SettingsOption): string => item.label}
        renderSectionHeader={({section: {title}}): React.ReactElement => (
          <HeaderContainer>
            <SectionHeader>{title}</SectionHeader>
          </HeaderContainer>
        )}
      />
      <Button
        testID="button-logout"
        style={{
          paddingHorizontal: 20,
        }}
        styles={{
          container: [
            css`
              height: 44px;
              border-width: 1px;
              border-radius: 0px;
            `,
            {
              backgroundColor: theme.button,
              borderColor: theme.button,
            },
          ],
          text: {
            color: theme.textContrast,
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
        onPress={logout}
        text={getString('LOGOUT')}
      />
      <Button
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        styles={{
          container: [
            css`
              height: 44px;
              border-width: 1px;
              border-radius: 0px;
              border-color: ${theme.role.danger};
            `,
            {
              backgroundColor: theme.role.danger,
            },
          ],
          text: {
            color: theme.textContrast,
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
        onPress={() => {
          setShowModal(true);
        }}
        text={getString('DELETE_ACCOUNT')}
      />
      <Modal
        isOpen={showModal}
        backdropOpacity={0.075}
        entry={'top'}
        position={'center'}
        style={{
          backgroundColor: 'transparent',
          alignSelf: 'stretch',
          height: 320,
          width: '90%',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ModalContainer>
          <ModalViewContainer>
            <Typography.Heading2>
              {getString('DELETE_ACCOUNT_WARING')}
            </Typography.Heading2>
            <ModalBtnContainer>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => {
                  deleteAccount();
                }}
              >
                <ModalBtnStyle>
                  <TypographyInverted.Body1>
                    {getString('YES')}
                  </TypographyInverted.Body1>
                </ModalBtnStyle>
              </TouchableHighlight>
              <View style={{width: 8}} />
              <TouchableHighlight
                underlayColor="none"
                onPress={() => setShowModal(false)}
              >
                <ModalBtnStyle>
                  <TypographyInverted.Body1>
                    {getString('NO')}
                  </TypographyInverted.Body1>
                </ModalBtnStyle>
              </TouchableHighlight>
            </ModalBtnContainer>
          </ModalViewContainer>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Settings;
