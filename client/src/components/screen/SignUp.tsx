import { Button, EditText } from 'dooboo-ui';
import React, { ReactElement, useState } from 'react';
import { SignUpMutation, SignUpMutationResponse, UserCreateInput } from '../../__generated__/SignUpMutation.graphql';
import {
  SignUpSendVerificationMutation,
  SignUpSendVerificationMutationResponse,
} from '../../__generated__/SignUpSendVerificationMutation.graphql';
import { graphql, useMutation } from 'react-relay/hooks';
import { showAlertForError, validateEmail, validatePassword } from '../../utils/common';

import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
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
  mutation SignUpMutation($user: UserCreateInput) {
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
  const { navigation } = props;
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

  const [commitSendVerification, isVerificationInFlight] =
    useMutation<SignUpSendVerificationMutation>(sendVerification);

  const { theme } = useThemeContext();
  // const [signUp] = useMutation<{ signUp: AuthPayload }, MutationSignUpInput>(MUTATION_SIGN_UP);
  // const [sendVerification] =
  //   useMutation<{ sendVerification: boolean }, MutationSendVerificationInput>(MUTATION_SEND_VERIFICATION);

  const requestSignUp = async (): Promise<void> => {
    if (!validateEmail(email) || !validatePassword(password) || name.length < 2 || password !== confirmPassword) {
      if (!validateEmail(email)) {
        setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      }

      if (!validatePassword(password)) {
        setErrorPassword(getString('PASSWORD_MIN'));
      }

      if (name.length < 2) {
        setErrorName(getString('NAME_MIN'));
      }

      if (password !== confirmPassword) {
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      }

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
      onCompleted: (response: SignUpMutationResponse) => {
        const sendVerificationMutationConfig = {
          variables: {
            email,
          },
        };

        commitSendVerification(sendVerificationMutationConfig);

        return navigation.replace('VerifyEmail', { email });
      },
      onError: (error: any): void => {
        showAlertForError(error);
      },
    };

    commitSignUp(mutationConfig);
  };

  const inputChangeHandlers: Record<string, (value: string) => void> = {
    emailInput: (email: string): void => {
      setEmail(email);

      if (!validateEmail(email)) {
        setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      } else {
        setErrorEmail('');
      }
    },
    passwordInput: (password: string): void => {
      setPassword(password);

      if (!validatePassword(password)) {
        setErrorPassword(getString('PASSWORD_MIN'));
      } else if (confirmPassword && password !== confirmPassword) {
        setErrorPassword('');
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      } else {
        setErrorPassword('');
      }
    },
    confirmPasswordInput: (confirmPassword: string): void => {
      setConfirmPassword(confirmPassword);

      if (password !== confirmPassword) {
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      } else {
        setErrorConfirmPassword('');
      }
    },
    nameInput: (name: string): void => {
      setName(name);

      if (name.length < 2) {
        setErrorName(getString('NAME_MIN'));
      } else {
        setErrorName('');
      }
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
        keyboardVerticalOffset={100}
      >
        <ScrollView style={{ alignSelf: 'stretch' }}>
          <ContentsWrapper>
            <EditText
              testID="input-email"
              errorTestID="error-email"
              textStyle={{
                color: theme.fontColor,
              }}
              borderColor={theme.font}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              label={getString('EMAIL')}
              placeholder="hello@example.com"
              value={email}
              onChangeText={inputChangeHandlers.emailInput}
              errorText={errorEmail}
              onSubmitEditing={requestSignUp}
            />
            <EditText
              testID="input-password"
              errorTestID="error-password"
              textStyle={{
                color: theme.fontColor,
              }}
              borderColor={theme.font}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              placeholder="********"
              label={getString('PASSWORD')}
              value={password}
              onChangeText={inputChangeHandlers.passwordInput}
              style={{ marginTop: 32 }}
              errorText={errorPassword}
              onSubmitEditing={requestSignUp}
              secureTextEntry={true}
            />
            <EditText
              testID="input-confirm-password"
              errorTestID="error-confirm-password"
              textStyle={{
                color: theme.fontColor,
              }}
              placeholder="********"
              label={getString('CONFIRM_PASSWORD')}
              value={confirmPassword}
              onChangeText={inputChangeHandlers.confirmPasswordInput}
              style={{ marginTop: 32 }}
              borderColor={theme.font}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              errorText={errorConfirmPassword}
              onSubmitEditing={requestSignUp}
              secureTextEntry={true}
            />
            <EditText
              testID="input-name"
              errorTestID="error-name"
              textStyle={{
                color: theme.fontColor,
              }}
              label={getString('NAME')}
              placeholder={getString('NAME_HINT')}
              borderColor={theme.font}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              value={name}
              onChangeText={inputChangeHandlers.nameInput}
              style={{ marginTop: 32 }}
              errorText={errorName}
              onSubmitEditing={requestSignUp}
            />
            <EditText
              testID="input-status"
              errorTestID="error-status"
              textStyle={{
                color: theme.fontColor,
              }}
              borderColor={theme.font}
              focusColor={theme.focused}
              placeholderTextColor={theme.placeholder}
              label={getString('STATUS')}
              placeholder={getString('STATUS_MSG_HINT')}
              value={statusMessage}
              onChangeText={(text: string): void => {
                setStatusMessage(text);
              }}
              style={{ marginTop: 32 }}
              onSubmitEditing={requestSignUp}
            />
            <ButtonWrapper>
              <Button
                testID="btn-sign-up"
                loading={isInFlight}
                onPress={requestSignUp}
                style={{
                  root: {
                    height: 52, width: '50%', backgroundColor: theme.btnPrimary,
                  },
                  text: {
                    color: theme.btnPrimaryFont, fontSize: 16,
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
