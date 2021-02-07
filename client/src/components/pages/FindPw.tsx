import {Button, EditText, useTheme} from 'dooboo-ui';
import type {
  FindPwMutation,
  FindPwMutationResponse,
} from '../../__generated__/FindPwMutation.graphql';
import React, {ReactElement, useState} from 'react';
import {graphql, useMutation} from 'react-relay/hooks';
import {showAlertForError, validateEmail} from '../../utils/common';

import {Alert} from 'react-native';
import {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import {PayloadError} from 'relay-runtime';
import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  background-color: ${({theme}) => theme.background};
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
`;

interface Props {
  navigation: AuthStackNavigationProps<'FindPw'>;
}

const findPasswordMutation = graphql`
  mutation FindPwMutation($email: String!) {
    findPassword(email: $email)
  }
`;

function Page({navigation}: Props): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  const [commitFindPassword, isInFlight] = useMutation<FindPwMutation>(
    findPasswordMutation,
  );

  const {theme} = useTheme();

  const onFindPw = async (): Promise<void> => {
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
        response: FindPwMutationResponse,
        errors: PayloadError[],
      ) => {
        const result = response.findPassword;

        if (errors && errors.length > 0) {
          Alert.alert(getString('FAILED'), getString('EMAIL_USER_NOT_EXISTS'),);

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
}

export default Page;
