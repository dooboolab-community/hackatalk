import React, {ReactElement, useState} from 'react';
import type {
  UserFindPwMutation,
  UserFindPwMutationResponse,
} from '../../__generated__/UserFindPwMutation.graphql';
import {showAlertForError, validateEmail} from '../../utils/common';

import {Alert} from 'react-native';
import {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import FindPwTemp from '../templates/FindPwTemp';
import {PayloadError} from 'relay-runtime';
import {findPasswordMutation} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import {useMutation} from 'react-relay/hooks';
import {useTheme} from 'dooboo-ui';

interface Props {
  navigation: AuthStackNavigationProps<'FindPw'>;
}

function Page({navigation}: Props): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  const [commitFindPassword, isInFlight] = useMutation<UserFindPwMutation>(
    findPasswordMutation,
  );

  const findPw = async (): Promise<void> => {
    if (!validateEmail(email)) {
      setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));

      return;
    }

    const mutationConfig = {
      variables: {email},
      onError: (error: Error): void => {
        showAlertForError(error);
      },
      onCompleted: (
        response: UserFindPwMutationResponse,
        errors: PayloadError[],
      ) => {
        const result = response.findPassword;

        if (errors && errors.length > 0) {
          Alert.alert(getString('FAILED'), getString('EMAIL_USER_NOT_EXISTS'));

          return;
        }

        if (result) {
          Alert.alert(
            getString('SUCCESS'),
            getString('PASSWORD_RESET_EMAIL_SENT'),
          );

          navigation.goBack();
        }
      },
    };

    commitFindPassword(mutationConfig);
  };

  return (
    <FindPwTemp
      email={email}
      setEmail={(str) => setEmail(str)}
      errorEmail={errorEmail}
      setErrorEmail={setErrorEmail}
      onFindPassword={findPw}
      isFindingPassword={isInFlight}
      onChangePassword={(text: string): void => {
        setEmail(text);
        setErrorEmail('');
      }}
    />
  );
}

export default Page;
