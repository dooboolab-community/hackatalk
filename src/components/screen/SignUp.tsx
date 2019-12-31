import React, { ReactElement, useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/common';

import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import Button from '../shared/Button';
import { EditText } from '@dooboo-ui/native';
import { ScrollView } from 'react-native-gesture-handler';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
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
  margin-top: 20px;
  flex-direction: row-reverse;
`;

interface Props {
  navigation: AuthStackNavigationProps<'SignUp'>;
}

function Page(props: Props): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  let timer: number;

  const { theme } = useThemeContext();

  const onSignUp = (): void => {
    if (!validateEmail(email) || !validatePassword(password) || name.length < 4 || password !== confirmPassword) {
      if (!validateEmail(email)) {
        setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      }
      if (!validatePassword(password)) {
        setErrorPassword(getString('PASSWORD_MIN'));
      }
      if (name.length < 4) {
        setErrorName(getString('NAME_MIN'));
      }
      if (password !== confirmPassword) {
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      }
      return;
    }

    setIsSignUp(true);
    timer = setTimeout(() => {
      setIsSignUp(false);
      clearTimeout(timer);
      if (props.navigation) {
        props.navigation.navigate('SignIn');
      }
    }, 1000);
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
            label={getString('EMAIL')}
            placeholder="hello@example.com"
            placeholderTextColor={theme.placeholder}
            value={email}
            onChangeText={(text: string): void => {
              setEmail(text);
              setErrorEmail('');
            }}
            style={{ marginTop: 20 }}
            errorText={errorEmail}
            onSubmitEditing={onSignUp}
          />
          <EditText
            testID="input-password"
            errorTestID="error-password"
            textStyle={{
              color: theme.fontColor,
            }}
            label={getString('PASSWORD')}
            value={password}
            onChangeText={(text: string): void => {
              setPassword(text);
              setErrorPassword('');
            }}
            style={{ marginTop: 20 }}
            errorText={errorPassword}
            onSubmitEditing={onSignUp}
            secureTextEntry={true}
          />
          <EditText
            testID="input-confirm-password"
            errorTestID="error-confirm-password"
            textStyle={{
              color: theme.fontColor,
            }}
            label={getString('CONFIRM_PASSWORD')}
            value={confirmPassword}
            onChangeText={(text: string): void => {
              setConfirmPassword(text);
              setErrorConfirmPassword('');
            }}
            style={{ marginTop: 20 }}
            errorText={errorConfirmPassword}
            onSubmitEditing={onSignUp}
            secureTextEntry={true}
          />
          <EditText
            testID="input-name"
            errorTestID="error-name"
            textStyle={{
              color: theme.fontColor,
            }}
            label={getString('NAME')}
            placeholder="Write email address"
            placeholderTextColor={theme.placeholder}
            value={name}
            onChangeText={(text: string): void => {
              setName(text);
              setErrorName('');
            }}
            style={{ marginTop: 20 }}
            errorText={errorName}
            onSubmitEditing={onSignUp}
          />
          <EditText
            testID="input-status"
            errorTestID="error-status"
            textStyle={{
              color: theme.fontColor,
            }}
            label={getString('STATUS')}
            placeholder="Write status"
            placeholderTextColor={theme.placeholder}
            value={status}
            onChangeText={(text: string): void => {
              setStatus(text);
            }}
            style={{ marginTop: 20 }}
            onSubmitEditing={onSignUp}
          />
          <ButtonWrapper>
            <Button
              testID="btn-sign-up"
              isLoading={isSignUp}
              onPress={onSignUp}
              containerStyle={{ padding: 5, width: '50%' }}
            >
              {getString('SIGN_UP')}
            </Button>
          </ButtonWrapper>
        </Wrapper>
      </ScrollView>
    </Container>
  );
}

export default Page;
