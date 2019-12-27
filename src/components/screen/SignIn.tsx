import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';

import { Alert, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { DefaultNavigationProps, User } from '../../types';
import { Button as DoobooButton, EditText } from '@dooboo-ui/native';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  androidExpoClientId,
  iOSClientId,
  iOSExpoClientId,
} from '../../../config';

import Button from '../shared/Button';
import Constants from 'expo-constants';
import { IC_ICON } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '../shared/StatusBar';
import { colors } from '../../theme';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background: ${({ theme }): string => theme.background};
`;

const LogoWrapper = styled.View`
  margin-top: 104px;
  margin-bottom: 60px;
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

const Wrapper = styled.View`
  margin: 0 40px;
`;

const ButtonWrapper = styled.View`
  margin-top: 16px;
  width: 100%;
  flex-direction: row;
`;

const StyledFindPwTouchOpacity = styled.TouchableOpacity`
  padding: 20px;
  margin-bottom: 16px;
  align-self: center;
`;

const StyledFindPwText = styled.Text`
  color: ${({ theme }): string => theme.tintColor};
  text-decoration-line: underline;
`;

const SocialButtonWrapper = styled.View`
  margin-bottom: 40px;
`;

interface Props {
  navigation: DefaultNavigationProps<'SignIn'>;
}

function Page(props: Props): ReactElement {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [signingInFacebook, setSigningInFacebook] = useState<boolean>(false);
  const [signingInGoogle, setSigningInGoogle] = useState<boolean>(false);
  const [googleUser, setGoogleUser] = useState<User | null | unknown>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  let timer: number;

  const { theme, changeThemeType } = useThemeContext();

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const goToSignUp = (): void => {
    props.navigation.navigate('SignUp');
  };

  const goToFindPw = (): void => {
    props.navigation.navigate('FindPw');
  };

  const onSignIn = (): void => {
    setIsSignIn(true);
    timer = setTimeout(() => {
      setIsSignIn(false);
      clearTimeout(timer);
      if (!validateEmail(email)) {
        setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
        return;
      }

      if (props.navigation) {
        props.navigation.resetRoot({
          index: 0,
          routes: [{ name: 'MainStack' }],
        });
      }
    }, 1000);
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
          }),
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
            <TouchableOpacity onPress={(): void => changeThemeType()} style={{ width: 60 }}>
              <StyledLogoImage source={IC_ICON} />
              <View style={{ height: 16 }} />
              <StyledLogoText>Hello!</StyledLogoText>
            </TouchableOpacity>
          </LogoWrapper>
          <EditText
            testID="EMAIL_INPUT"
            textStyle={{
              color: theme.fontColor,
            }}
            style={{ marginBottom: 20 }}
            isRow={true}
            label={getString('EMAIL')}
            placeholder="hello@example.com"
            placeholderTextColor={theme.placeholder}
            value={email}
            onChangeText={(text: string): void => {
              setEmail(text);
              setErrorEmail('');
            }}
            errorText={errorEmail}
            onSubmitEditing={onSignIn}
          />
          <EditText
            testID="PASSWORD_INPUT"
            textStyle={{
              color: theme.fontColor,
            }}
            style={{ marginBottom: 20 }}
            isRow={true}
            label={getString('PASSWORD')}
            placeholder="******"
            placeholderTextColor={theme.placeholder}
            value={password}
            onChangeText={(text: string): void => {
              setPassword(text);

              if (text === '') {
                setErrorPassword(getString('PASSWORD_REQUIRED'));
                return;
              }
              setErrorPassword('');
            }}
            errorText={errorPassword}
            onSubmitEditing={onSignIn}
            secureTextEntry={true}
          />
          <ButtonWrapper>
            <Button
              testID="SIGN_UP_BUTTON"
              onPress={goToSignUp}
              containerStyle={{ flex: 1, flexDirection: 'row' }}
              isWhite
            >
              {getString('SIGN_UP')}
            </Button>
            <View style={{ width: 8 }} />
            <Button
              testID="SIGN_IN_BUTTON"
              isLoading={isSignIn}
              onPress={onSignIn}
              containerStyle={{ flex: 1, flexDirection: 'row' }}
            >
              {getString('LOGIN')}
            </Button>
          </ButtonWrapper>
          <StyledFindPwTouchOpacity onPress={goToFindPw}>
            <StyledFindPwText>
              {getString('FORGOT_PW')}
            </StyledFindPwText>
          </StyledFindPwTouchOpacity>
          <SocialButtonWrapper>
            <DoobooButton
              testID="FACEBOOK_SIGN_IN_BUTTON"
              style={[
                {
                  backgroundColor: colors.facebook,
                  borderColor: theme.background,
                  borderRadius: 4,
                  width: '100%',
                  height: 60,
                },
              ]}
              iconLeft={
                <View
                  style={{
                    marginLeft: 16,
                  }}
                >
                  <Ionicons name="logo-facebook" size={20} color="white" />
                </View>
              }
              isLoading={signingInFacebook}
              indicatorColor={theme.primary}
              onClick={facebookLogin}
              text={getString('SIGN_IN_WITH_FACEBOOK')}
              textStyle={{ fontWeight: '700', color: 'white' }}
            />
            <View style={{ width: '100%', height: 5 }} />
            <DoobooButton
              testID="GOOGLE_SIGN_IN_BUTTON"
              style={[
                {
                  backgroundColor: colors.google,
                  borderColor: theme.background,
                  borderRadius: 4,
                  width: '100%',
                  height: 60,
                },
              ]}
              iconLeft={
                <View
                  style={{
                    marginLeft: 16,
                  }}
                >
                  <Ionicons name="logo-google" size={20} color="white" />
                </View>
              }
              isLoading={signingInGoogle}
              indicatorColor={theme.primary}
              onClick={googleSignInAsync}
              text={getString('SIGN_IN_WITH_GOOGLE')}
              textStyle={{ fontWeight: '700', color: 'white' }}
            />
          </SocialButtonWrapper>
        </Wrapper>
      </ScrollView>
    </Container>
  );
}

export default Page;
