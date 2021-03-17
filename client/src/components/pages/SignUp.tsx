import {Button, EditText, useTheme} from 'dooboo-ui';
import {Platform, ScrollView} from 'react-native';
import React, {FC, useState} from 'react';
import {sendVerification, signUp} from '../../relay/queries/User';
import {
  showAlertForError,
  validateEmail,
  validatePassword,
} from '../../utils/common';

import {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import {UserSignUpMutation} from '../../__generated__/UserSignUpMutation.graphql';
import {UserVerifyEmailMutation} from '../../__generated__/UserVerifyEmailMutation.graphql';
import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';
import {useMutation} from 'react-relay/hooks';
import {useNavigation} from '@react-navigation/core';

const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({theme}) => theme.background};
`;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
`;

const ContentsWrapper = styled.View`
  margin: 44px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 32px;
  flex-direction: row-reverse;
`;

const Page: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProps<'SignUp'>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');

  const [commitSignUp, isInFlight] = useMutation<UserSignUpMutation>(signUp);

  const [commitSendVerification] = useMutation<UserVerifyEmailMutation>(
    sendVerification,
  );

  const {theme} = useTheme();

  const requestSignUp = async (): Promise<void> => {
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      name.length < 2 ||
      password !== confirmPassword
    ) {
      if (!validateEmail(email))
        setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));

      if (!validatePassword(password))
        setErrorPassword(getString('PASSWORD_MIN'));

      if (name.length < 2) setErrorName(getString('NAME_MIN'));

      if (password !== confirmPassword)
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));

      return;
    }

    const mutationConfig = {
      variables: {
        user: {
          email,
          password,
          name,
          statusMessage,
        },
      },
      onCompleted: () => {
        const sendVerificationMutationConfig = {
          variables: {
            email,
          },
        };

        commitSendVerification(sendVerificationMutationConfig);

        return navigation.replace('VerifyEmail', {email});
      },
      onError: (error: any): void => {
        showAlertForError(error);
      },
    };

    commitSignUp(mutationConfig);
  };

  const inputChangeHandlers: Record<string, (value: string) => void> = {
    emailInput: (emailStr: string): void => {
      setEmail(emailStr);

      if (!validateEmail(emailStr))
        setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      else setErrorEmail('');
    },
    passwordInput: (passwordStr: string): void => {
      setPassword(passwordStr);

      if (!validatePassword(passwordStr))
        setErrorPassword(getString('PASSWORD_MIN'));
      else if (confirmPassword && passwordStr !== confirmPassword) {
        setErrorPassword('');
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      } else setErrorPassword('');
    },
    confirmPasswordInput: (confirmPasswordStr: string): void => {
      setConfirmPassword(confirmPasswordStr);

      if (password !== confirmPasswordStr)
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      else setErrorConfirmPassword('');
    },
    nameInput: (nameStr: string): void => {
      setName(nameStr);

      if (nameStr.length < 2) setErrorName(getString('NAME_MIN'));
      else setErrorName('');
    },
  };

  return (
    <Container>
      <Wrapper
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}
        keyboardVerticalOffset={100}>
        <ScrollView style={{alignSelf: 'stretch'}}>
          <ContentsWrapper>
            <EditText
              testID="input-email"
              styles={{
                input: {
                  color: theme.text,
                },
                container: {
                  borderBottomColor: theme.text,
                },
              }}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              labelText={getString('EMAIL')}
              placeholder="hello@example.com"
              value={email}
              onChangeText={inputChangeHandlers.emailInput}
              errorText={errorEmail}
              onSubmitEditing={requestSignUp}
            />
            <EditText
              testID="input-password"
              styles={{
                input: {
                  color: theme.text,
                },
                container: {
                  borderColor: theme.text,
                },
              }}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              placeholder="********"
              labelText={getString('PASSWORD')}
              value={password}
              onChangeText={inputChangeHandlers.passwordInput}
              style={{marginTop: 32}}
              errorText={errorPassword}
              onSubmitEditing={requestSignUp}
              secureTextEntry={true}
            />
            <EditText
              testID="input-confirm-password"
              styles={{
                input: {
                  color: theme.text,
                },
                container: {
                  borderBottomColor: theme.text,
                  paddingVertical: 8,
                },
              }}
              placeholder="********"
              labelText={getString('CONFIRM_PASSWORD')}
              value={confirmPassword}
              onChangeText={inputChangeHandlers.confirmPasswordInput}
              style={{marginTop: 32}}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              errorText={errorConfirmPassword}
              onSubmitEditing={requestSignUp}
              secureTextEntry={true}
            />
            <EditText
              testID="input-name"
              styles={{
                input: {
                  color: theme.text,
                },
                container: {
                  borderColor: theme.text,
                },
              }}
              labelText={getString('NAME')}
              placeholder={getString('NAME_HINT')}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              value={name}
              onChangeText={inputChangeHandlers.nameInput}
              style={{marginTop: 32}}
              errorText={errorName}
              onSubmitEditing={requestSignUp}
            />
            <EditText
              testID="input-status"
              type="column"
              styles={{
                input: {
                  marginTop: 12,
                  color: theme.text,
                },
                container: {
                  borderColor: theme.text,
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                },
              }}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              labelText={getString('STATUS')}
              placeholder={getString('STATUS_MSG_HINT')}
              value={statusMessage}
              onChangeText={(text: string): void => {
                setStatusMessage(text);
              }}
              style={{marginTop: 32}}
              onSubmitEditing={requestSignUp}
              textInputProps={{
                multiline: true,
              }}
            />
            <ButtonWrapper>
              <Button
                testID="btn-sign-up"
                loading={isInFlight}
                onPress={requestSignUp}
                style={{
                  alignSelf: 'stretch',
                  borderWidth: 1,
                }}
                styles={{
                  container: {
                    height: 52,
                    backgroundColor: theme.btnPrimary,
                  },
                  text: {
                    color: theme.btnPrimaryFont,
                    fontSize: 16,
                  },
                  hovered: {
                    borderColor: theme.text,
                  },
                }}
                text={getString('SIGN_UP')}
              />
            </ButtonWrapper>
          </ContentsWrapper>
        </ScrollView>
      </Wrapper>
    </Container>
  );
};

export default Page;
