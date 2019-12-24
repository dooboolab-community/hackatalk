import { Alert, Text, View } from 'react-native';
import React, { ReactElement, useState } from 'react';

import Button from '../shared/Button';
import { DefaultNavigationProps } from '../../types';
import { EditText } from '@dooboo-ui/native';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
`;

const StyledWrapper = styled.View`
  margin: 44px;
`;

const StyledButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
  flex-direction: row;
`;

interface Props {
  navigation: DefaultNavigationProps<'SignUp'>;
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

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const re = /^.*(?=.{6,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    return re.test(password);
  };

  const onSignUp = (): void => {
    if (email === '' || password === '' || confirmPassword === '' || name === '') {
      if (email === '') {
        setErrorEmail(getString('EMAIL_REQUIRED'));
      }
      if (password === '') {
        setErrorPassword(getString('PASSWORD_REQUIRED'));
      }
      if (confirmPassword === '') {
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      }
      if (name === '') {
        setErrorName(getString('NAME_MIN'));
      }
      return;
    }

    setIsSignUp(true);
    timer = setTimeout(() => {
      setIsSignUp(false);
      clearTimeout(timer);
      if (props.navigation) {
        props.navigation.navigate('Login');
      }
    }, 1000);
  };

  return (
    <StyledSafeAreaView>
      <StyledWrapper>
        <EditText
          testID="EMAIL_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          label={getString('EMAIL')}
          placeholder="hello@example.com"
          placeholderTextColor="#ADB5BD"
          value={email}
          onChangeText={(text: string): void => {
            setEmail(text);
            if (!validateEmail(text)) {
              setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
              return;
            }
            setErrorEmail('');
          }}
          style={{ marginTop: 20 }}
          errorText={errorEmail}
          onSubmitEditing={onSignUp}
        />
        <EditText
          testID="PASSWORD_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          label={getString('PASSWORD')}
          value={password}
          onChangeText={(text: string): void => {
            setPassword(text);
            if (!validatePassword(text)) {
              setErrorPassword(getString('PASSWORD_MIN'));
              return;
            }
            setErrorPassword('');
          }}
          style={{ marginTop: 20 }}
          errorText={errorPassword}
          onSubmitEditing={onSignUp}
          secureTextEntry={true}
        />
        <EditText
          testID="CONFIRM_PASSWORD_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          label={getString('CONFIRM_PASSWORD')}
          value={confirmPassword}
          onChangeText={(text: string): void => {
            setConfirmPassword(text);
            if (text !== password) {
              setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
              return;
            }
            setErrorConfirmPassword('');
          }}
          style={{ marginTop: 20 }}
          errorText={errorConfirmPassword}
          onSubmitEditing={onSignUp}
          secureTextEntry={true}
        />
        <EditText
          testID="NAME_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          label={getString('NAME')}
          placeholder="Write email address"
          placeholderTextColor="#ADB5BD"
          value={name}
          onChangeText={(text: string): void => {
            setName(text);
            if (text.length < 3) {
              setErrorName(getString('NAME_MIN'));
              return;
            }
            setErrorName('');
          }}
          style={{ marginTop: 20 }}
          errorText={errorName}
          onSubmitEditing={onSignUp}
        />
        <EditText
          testID="STATUS_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          label={getString('STATUS')}
          placeholder="Write status"
          placeholderTextColor="#ADB5BD"
          value={status}
          onChangeText={(text: string): void => {
            setStatus(text);
          }}
          style={{ marginTop: 20 }}
          onSubmitEditing={onSignUp}
        />
        <StyledButtonWrapper>
          <View style={{ flex: 1 }}/>
          <Button
            testID="SIGN_UP_INPUT"
            isLoading={isSignUp}
            onPress={onSignUp}
            containerStyle={{ padding: 5, flex: 1 }}
          >
            {getString('SIGN_UP')}
          </Button>
        </StyledButtonWrapper>
      </StyledWrapper>
    </StyledSafeAreaView>
  );
}

export default Page;
