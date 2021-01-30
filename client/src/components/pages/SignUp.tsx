import {Button, EditText} from 'dooboo-ui';
import React, {ReactElement, useState} from 'react';
import {graphql, useMutation} from 'react-relay/hooks';
import {
  showAlertForError,
  validateEmail,
  validatePassword,
} from '../../utils/common';

import {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import {Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SignUpMutation} from '../../__generated__/SignUpMutation.graphql';
import {SignUpSendVerificationMutation} from '../../__generated__/SignUpSendVerificationMutation.graphql';
import StatusBar from '../UI/atoms/StatusBar';
import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';
import {useThemeContext} from '@dooboo-ui/theme';

const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({theme}): string => theme.background};
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

interface Props {
  navigation: AuthStackNavigationProps<'SignUp'>;
}

const signUp = graphql`
  mutation SignUpMutation($user: UserCreateInput!) {
    signUp(user: $user) {
      id
      email
      name
      photoURL
      verified
    }
  }
`;

const sendVerification = graphql`
  mutation SignUpSendVerificationMutation($email: String!) {
    sendVerification(email: $email)
  }
`;

function Page(props: Props): ReactElement {
  const {navigation} = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');

  const [commitSignUp, isInFlight] = useMutation<SignUpMutation>(signUp);

  const [commitSendVerification] = useMutation<SignUpSendVerificationMutation>(
    sendVerification,
  );

  const {theme} = useThemeContext();
  // const [signUp] = useMutation<{ signUp: AuthPayload }, MutationSignUpInput>(MUTATION_SIGN_UP);
  // const [sendVerification] =
  //   useMutation<{ sendVerification: boolean }, MutationSendVerificationInput>(MUTATION_SEND_VERIFICATION);

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
      <StatusBar />
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
              labelText={getString('STATUS')}
              placeholder={getString('STATUS_MSG_HINT')}
              value={statusMessage}
              onChangeText={(text: string): void => {
                setStatusMessage(text);
              }}
              style={{marginTop: 32}}
              onSubmitEditing={requestSignUp}
            />
            <ButtonWrapper>
              <Button
                testID="btn-sign-up"
                loading={isInFlight}
                onPress={requestSignUp}
                style={{
                  width: '100%',
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
                }}
                text={getString('SIGN_UP')}
              />
            </ButtonWrapper>
          </ContentsWrapper>
        </ScrollView>
      </Wrapper>
    </Container>
  );
}

export default Page;
