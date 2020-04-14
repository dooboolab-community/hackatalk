import {
  AuthPayload,
  MUTATION_SEND_VERIFICATION,
  MUTATION_SIGN_UP,
  MutationSendVerificationInput,
  MutationSignUpInput,
} from '../../graphql/mutations';
import { Button, EditText } from '@dooboo-ui/native';
import React, { ReactElement, useState } from 'react';
import { showAlertForGrpahqlError, validateEmail, validatePassword } from '../../utils/common';

import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/react-hooks';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
`;

const Wrapper = styled.View`
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
  const [signingUp, setSigningUp] = useState<boolean>(false);

  const { theme } = useThemeContext();
  const [signUp] = useMutation<{ signUp: AuthPayload }, MutationSignUpInput>(MUTATION_SIGN_UP);
  const [sendVerification] =
    useMutation<{ sendVerification: boolean }, MutationSendVerificationInput>(MUTATION_SEND_VERIFICATION);

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

    setSigningUp(true);
    const variables = {
      user: {
        email,
        name,
        password,
        statusMessage,
      },
    };

    try {
      const { data } = await signUp({ variables });
      const { data: emailVerificationData } = await sendVerification({
        variables: {
          email,
        },
      });
      if (emailVerificationData?.sendVerification) {
        // email sent
      }
      const user = data?.signUp.user;

      if (user) {
        navigation.replace('VerifyEmail', {
          email,
        });
      }
    } catch ({ graphQLErrors }) {
      showAlertForGrpahqlError(graphQLErrors);
    } finally {
      setSigningUp(false);
    }
  };

  return (
    <Container>
      <StatusBar />
      <ScrollView style={{ alignSelf: 'stretch' }}>
        <Wrapper>
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
            onChangeText={(text: string): void => {
              setEmail(text);
              setErrorEmail('');
            }}
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
            onChangeText={(text: string): void => {
              setPassword(text);
              setErrorPassword('');
            }}
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
            onChangeText={(text: string): void => {
              setConfirmPassword(text);
              setErrorConfirmPassword('');
            }}
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
            onChangeText={(text: string): void => {
              setName(text);
              setErrorName('');
            }}
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
              isLoading={signingUp}
              onPress={requestSignUp}
              containerStyle={{ height: 52, width: '50%', backgroundColor: theme.btnPrimary }}
              textStyle={{ color: theme.btnPrimaryFont, fontSize: 16 }}
              text={getString('SIGN_UP')}
            />
          </ButtonWrapper>
        </Wrapper>
      </ScrollView>
    </Container>
  );
}

export default Page;
