import React, {ReactElement, useState} from 'react';
import type {
  UserChangeEmailPasswordMutation,
  UserChangeEmailPasswordMutationResponse,
} from '../../__generated__/UserChangeEmailPasswordMutation.graphql';

import {Alert} from 'react-native';
import ChangePwTemp from '../templates/ChangePwTemp';
import {MainStackNavigationProps} from '../navigations/MainStackNavigator';
import {changeEmailPasswordMutation} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import {showAlertForError} from '../../utils/common';
import {useMutation} from 'react-relay/hooks';

export interface Props {
  navigation: MainStackNavigationProps<'ChangePw'>;
}

function ChangePwContainer(props: Props): ReactElement {
  const {navigation} = props;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const [
    commitChangePassword,
    isInFlight,
  ] = useMutation<UserChangeEmailPasswordMutation>(changeEmailPasswordMutation);

  const handleChangePassword = async (): Promise<void> => {
    if (newPassword !== newPasswordConfirm) {
      Alert.alert(getString('ERROR'), getString('PASSWORD_MUST_MATCH'));

      return;
    }

    const mutationConfig = {
      variables: {
        password: currentPassword,
        newPassword: newPassword,
      },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
      onCompleted: (response: UserChangeEmailPasswordMutationResponse) => {
        const resultBool = response.changeEmailPassword;

        if (resultBool) {
          Alert.alert(getString('SUCCESS'), getString('PASSWORD_IS_CHANGED'));
          navigation.goBack();

          return;
        }

        Alert.alert(
          getString('FAILED'),
          getString('CHANGE_PASSWORD_HAS_FAILED'),
        );
      },
    };

    commitChangePassword(mutationConfig);
  };

  return (
    <ChangePwTemp
      isChangingPassword={isInFlight}
      password={currentPassword}
      newPassword={newPassword}
      newPasswordConfirm={newPasswordConfirm}
      onChangePassword={(text: string) => {
        setCurrentPassword(text);
      }}
      onChangeNewPassword={(text: string) => {
        setNewPassword(text);
      }}
      onChangeConfirmPassword={(text: string) => {
        setNewPasswordConfirm(text);
      }}
      onChangePasswordButtonPressed={handleChangePassword}
    />
  );
}

export default ChangePwContainer;
