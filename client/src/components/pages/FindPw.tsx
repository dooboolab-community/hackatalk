import {Button, EditText, useTheme} from 'dooboo-ui';
import React, {FC, useState} from 'react';
import type {
  UserFindPwMutation,
  UserFindPwMutationResponse,
} from '../../__generated__/UserFindPwMutation.graphql';
import {showAlertForError, validateEmail} from '../../utils/common';

import {Alert} from 'react-native';
import {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import {findPasswordMutation} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';
import {useMutation} from 'react-relay';
import {useNavigation} from '@react-navigation/core';

const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  background-color: ${({theme}) => theme.background};
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
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
        let errorMsg: string = error.message.toLowerCase();

        if (errorMsg.includes('not a valid email address'))
          errorMsg = getString('EMAIL_FORMAT_NOT_VALID');
        else if (errorMsg.includes('user does not exists'))
          errorMsg = getString('EMAIL_USER_NOT_EXISTS');
        else errorMsg = getString('EMAIL_SENT_FAILED');

        showAlertForError(errorMsg);
      },
      onCompleted: (response: UserFindPwMutationResponse) => {
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
        style={{marginVertical: 20}}
        styles={{
          container: {
            borderColor: theme.text,
          },
          input: {
            color: 'red',
          },
        }}
        focusColor={theme.focused}
        labelText={getString('EMAIL')}
        placeholderTextColor={theme.placeholder}
        placeholder="hello@example.com"
        value={email}
        onChangeText={(text: string): void => {
          setEmail(text);
          setErrorEmail('');
        }}
        errorText={errorEmail}
        onSubmitEditing={onFindPw}
      />
      <ButtonWrapper>
        <Button
          testID="btn-find-pw"
          loading={isInFlight}
          onPress={onFindPw}
          styles={{
            container: {
              height: 52,
              backgroundColor: theme.btnPrimary,
              borderWidth: 1,
            },
            text: {
              color: theme.btnPrimaryFont,
            },
            hovered: {
              borderColor: theme.text,
            },
          }}
          text={getString('FIND_PW')}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default Page;
