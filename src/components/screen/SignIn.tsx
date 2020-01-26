import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';

import { Alert, AsyncStorage, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { AuthPayload, User } from '../../types';
import { Button, EditText } from '@dooboo-ui/native';
import { IC_LOGO_D, IC_LOGO_W, SvgApple, SvgFacebook, SvgGoogle } from '../../utils/Icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { ThemeType, useThemeContext } from '@dooboo-ui/native-theme';
import {
  androidExpoClientId,
  iOSClientId,
  iOSExpoClientId,
} from '../../../config';

import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import Constants from 'expo-constants';
import { EditTextInputType } from '@dooboo-ui/native/lib/EditText';
import { MUTATION_SIGN_IN } from '../../graphql/mutations';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useMutation } from '@apollo/react-hooks';
import { validateEmail } from '../../utils/common';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background: ${({ theme }): string => theme.background};
`;

const Wrapper = styled.View`
  margin: 40px;
`;

const LogoWrapper = styled.View`
  margin-top: 44px;
  margin-bottom: 72px;
`;

const StyledLogoImage = styled.Image`
  width: 60px;
  height: 60px;
`;

const StyledLogoText = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 20px;
  font-weight: bold;
`;

const ButtonWrapper = styled.View`
  margin-top: 12px;
  width: 100%;
  flex-direction: row;
`;

const FindPwTouchOpacity = styled.TouchableOpacity`
  padding: 20px;
  margin-bottom: 44px;
  align-self: center;
`;

const FindPwText = styled.Text`
  color: ${({ theme }): string => theme.link};
  text-decoration-line: underline;
`;

const SocialButtonWrapper = styled.View`
  margin-bottom: 24px;
`;

interface Props {
  navigation: AuthStackNavigationProps<'SignIn'>;
}

const StyledAgreementTextWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 0 40px 0;
`;

const StyledAgreementText = styled.Text`
  line-height: 22px;
  color: #777;
`;

const StyledAgreementLinedText = styled.Text`
  line-height: 22px;
  color: ${({ theme }): string => theme.link};
  text-decoration-line: underline;
`;

function SignIn(props: Props): ReactElement {
  const { navigation } = props;
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [signingInFacebook, setSigningInFacebook] = useState<boolean>(false);
  const [signingInGoogle, setSigningInGoogle] = useState<boolean>(false);
  const [googleUser, setGoogleUser] = useState<User | null | unknown>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const { theme, changeThemeType, themeType } = useThemeContext();
  const [signInEmail] = useMutation<{ signInEmail: AuthPayload }, {}>(MUTATION_SIGN_IN);

  const goToSignUp = (): void => {
    props.navigation.navigate('SignUp');
  };

  const goToFindPw = (): void => {
    props.navigation.navigate('FindPw');
  };

  const onSignIn = async (): Promise<void> => {
    if (!validateEmail(email)) {
      setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      return;
    }

    if (!password) {
      setErrorPassword(getString('PASSWORD_REQUIRED'));
      return;
    }
    setIsLoggingIn(true);
    const variables = {
      email,
      password,
    };

    try {
      const { data } = await signInEmail({ variables });
      AsyncStorage.setItem('token', data?.signInEmail.token || '');
      navigation.resetRoot({
        index: 0,
        routes: [{ name: 'MainStack' }],
      });
    } catch (err) {
      Alert.alert(getString('ERROR'), err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const goToWebView = (uri: string): void => {
    props.navigation.navigate('WebView', { uri });
  };

  const initAsync = async (): Promise<void> => {
    await GoogleSignIn.initAsync({
      clientId: iOSClientId,
    });
  };

  // const googleSignOutAsync = async (): Promise<void> => {
  //   await GoogleSignIn.signOutAsync();
  //   setGoogleUser(null);
  // };

  const googleSignInAsync = async (): Promise<void> => {
    setSigningInGoogle(true);
    if (Constants.appOwnership === 'expo') {
      try {
        const response = await AppAuth.authAsync({
          issuer: 'https://accounts.google.com',
          scopes: ['profile'],
          clientId: Platform.select({
            ios: iOSExpoClientId,
            android: androidExpoClientId,
          }) as string,
        });
        Alert.alert('login:' + JSON.stringify(response.accessToken));
      } catch ({ message }) {
        Alert.alert(`Google Login Error: ${message}`);
      } finally {
        setSigningInGoogle(false);
      }
      return;
    }
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        setGoogleUser(user);
        Alert.alert('login:' + JSON.stringify(user));
        onSignIn();
      }
    } catch ({ message }) {
      Alert.alert(`Google Login Error: ${message}`);
    } finally {
      setSigningInGoogle(false);
    }
  };

  const facebookLogin = async (): Promise<void> => {
    setSigningInFacebook(true);
    try {
      await Facebook.initializeAsync(
        Constants.manifest.facebookAppId,
        undefined,
      );
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['email', 'public_profile'],
      });

      if (result.type === 'success') {
        const { token, expires, permissions, declinedPermissions } = result;

        const response = await fetch(
          `https://graph.facebook.com/me?fields=
            id,name,email,birthday,gender,first_name,last_name,picture
            &access_token=${token}`,
        );
        // console.log('success', response);
        const responseObject = JSON.parse(await response.text());
      } else {
        // type === 'cancel'
        // console.log('cancel', token);
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    } finally {
      setSigningInFacebook(false);
    }
  };

  const appleLogin = async (): Promise<void> => {
    console.log('apple login');
  };

  useEffect(() => {
    initAsync();
    // console.log('appOwnership', Constants.appOwnership);
  }, []);

  return (
    <Container>
      <StatusBar />
      <ScrollView style={{ alignSelf: 'stretch' }}>
        <Wrapper>
          <LogoWrapper>
            <TouchableOpacity testID="theme-test"
              onPress={(): void => changeThemeType()}
              style={{
                width: 60, alignItems: 'center',
              }}>
              <StyledLogoImage source={themeType === ThemeType.DARK ? IC_LOGO_D : IC_LOGO_W} />
              <View style={{ height: 12 }} />
              <StyledLogoText>{getString('HELLO')}</StyledLogoText>
            </TouchableOpacity>
          </LogoWrapper>
          <EditText
            testID="input-email"
            errorTestID="error-email"
            type={EditTextInputType.ROW}
            textStyle={{
              color: theme.fontColor,
            }}
            style={{ marginBottom: 20 }}
            isRow={true}
            label={getString('EMAIL')}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            placeholder="hello@example.com"
            value={email}
            onChangeText={(text: string): void => {
              setEmail(text);
              setErrorEmail('');
            }}
            errorText={errorEmail}
            onSubmitEditing={onSignIn}
          />
          <EditText
            testID="input-password"
            errorTestID="error-password"
            type={EditTextInputType.ROW}
            textStyle={{
              color: theme.fontColor,
            }}
            style={{ marginBottom: 20 }}
            isRow={true}
            label={getString('PASSWORD')}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholder="******"
            placeholderTextColor={theme.placeholder}
            value={password}
            onChangeText={(text: string): void => {
              setPassword(text);
              setErrorPassword('');
            }}
            errorText={errorPassword}
            onSubmitEditing={onSignIn}
            secureTextEntry={true}
          />
          <ButtonWrapper>
            <Button
              testID="btn-sign-up"
              onPress={goToSignUp}
              containerStyle={{
                flex: 1,
                flexDirection: 'row',
                height: 52,
                justifyContent: 'center',
              }}
              style={{
                width: '100%',
                backgroundColor: theme.btnPrimaryLight,
                borderColor: theme.btnPrimary,
                borderWidth: 1,
              }}
              textStyle={{
                color: theme.btnPrimary,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              text={getString('SIGN_UP')}
            />
            <View style={{ width: 20 }} />
            <Button
              testID="btn-sign-in"
              isLoading={isLoggingIn}
              onPress={onSignIn}
              containerStyle={{
                flex: 1,
                flexDirection: 'row',
                height: 52,
                justifyContent: 'center',
                backgroundColor: theme.btnPrimary,
              }}
              textStyle={{
                color: theme.btnPrimaryFont,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              text={getString('LOGIN')}
            />
          </ButtonWrapper>
          <FindPwTouchOpacity testID="btn-find-pw" onPress={goToFindPw}>
            <FindPwText>
              {getString('FORGOT_PW')}
            </FindPwText>
          </FindPwTouchOpacity>
          <SocialButtonWrapper>
            {
              Platform.select({
                ios: <Button
                  testID="btn-apple"
                  style={{
                    backgroundColor: theme.appleBackground,
                    borderColor: theme.appleText,
                    width: '100%',
                    height: 48,
                    borderWidth: 1,
                    marginBottom: 6,
                  }}
                  leftElement={
                    <View style={{ marginRight: 6 }}>
                      <SvgApple width={24} fill={theme.appleIcon}/>
                    </View>
                  }
                  isLoading={signingInFacebook}
                  indicatorColor={theme.primary}
                  onPress={appleLogin}
                  text={getString('SIGN_IN_WITH_APPLE')}
                  textStyle={{ fontWeight: '700', color: theme.appleText }}
                />,
              })
            }
            <Button
              testID="btn-facebook"
              style={{
                backgroundColor: theme.facebookBackground,
                borderColor: theme.facebookBackground,
                borderWidth: 1,
                width: '100%',
                height: 48,
                marginBottom: 6,
              }}
              leftElement={
                <View style={{ marginRight: 6 }}>
                  <SvgFacebook width={24} fill={theme.facebookIcon}/>
                </View>
              }
              isLoading={signingInFacebook}
              indicatorColor={theme.primary}
              onPress={facebookLogin}
              text={getString('SIGN_IN_WITH_FACEBOOK')}
              textStyle={{ fontWeight: '700', color: theme.facebookText }}
            />
            <Button
              testID="btn-google"
              style={{
                backgroundColor: theme.googleBackground,
                borderColor: theme.googleBackground,
                borderWidth: 1,
                width: '100%',
                height: 48,
              }}
              leftElement={
                <View style={{ marginRight: 6 }}>
                  <SvgGoogle width={24} fill={theme.googleIcon}/>
                </View>
              }
              isLoading={signingInGoogle}
              indicatorColor={theme.primary}
              onPress={googleSignInAsync}
              text={getString('SIGN_IN_WITH_GOOGLE')}
              textStyle={{ fontWeight: '700', color: theme.googleText }}
            />
          </SocialButtonWrapper>
          <StyledAgreementTextWrapper>
            <StyledAgreementText>{getString('AGREEMENT1')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-terms"
              onPress={(): void => goToWebView('https://dooboolab.com/termsofservice')}
            >
              {getString('AGREEMENT2')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT3')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-privacy"
              onPress={(): void => goToWebView('https://dooboolab.com/privacyandpolicy')}
            >
              {getString('AGREEMENT4')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT5')}</StyledAgreementText>
          </StyledAgreementTextWrapper>
        </Wrapper>
      </ScrollView>
    </Container>
  );
}

export default SignIn;
