import {Button, EditText, useTheme} from 'dooboo-ui';
import React, {useState} from 'react';
import type {
  UserFindPwMutation,
  UserFindPwMutation$data,
} from '../../__generated__/UserFindPwMutation.graphql';
import {showAlertForError, validateEmail} from '../../utils/common';
import styled, {css} from '@emotion/native';

import {Alert} from 'react-native';
import type {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import type {FC} from 'react';
import {findPasswordMutation} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import {normalizeErrorString} from '../../relay/util';
import {useMutation} from 'react-relay';
import {useNavigation} from '@react-navigation/core';

const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  background-color: ${({theme}) => theme.background};
`;

const ButtonWrapper = styled.View`
  width: 100%;
`;

const Page: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProps<'FindPw'>>();
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  const [commitFindPassword, isInFlight] =
    useMutation<UserFindPwMutation>(findPasswordMutation);

  const {theme} = useTheme();

  const onFindPw = async (): Promise<void> => {
    if (!validateEmail(email)) {
      setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));

      return;
    }

    const mutationConfig = {
      variables: {email},
      onError: (error: Error) => {
        showAlertForError(normalizeErrorString(error));
      },
      onCompleted: (response: UserFindPwMutation$data) => {
        const result = response.findPassword;

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
    <Container>
      <EditText
        testID="input-email"
        style={{marginTop: 32, marginBottom: 20}}
        styles={{
          container: {borderColor: theme.text},
          input: {color: theme.text},
        }}
        colors={{focused: theme.text}}
        label={getString('EMAIL')}
        placeholder="hello@example.com"
        value={email}
        onChangeText={(text: string): void => {
          setEmail(text.trim());
          setErrorEmail('');
        }}
        error={errorEmail}
        onSubmitEditing={onFindPw}
      />
      <ButtonWrapper>
        <Button
          testID="btn-find-pw"
          loading={isInFlight}
          onPress={onFindPw}
          styles={{
            container: css`
              height: 52px;
              background-color: ${theme.button};
              border-width: 1px;
              border-radius: 0px;
            `,
            text: {color: 'black', fontSize: 14, fontWeight: 'bold'},
            hovered: {borderColor: theme.text},
          }}
          text={getString('FIND_PW')}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default Page;
