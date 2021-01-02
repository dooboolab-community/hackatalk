import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';

import {
  Alert,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  block,
  clockRunning,
  cond,
  not,
  set,
  useCode,
} from 'react-native-reanimated';
import { AuthPayload, AuthType, User } from '../../types/graphql';
import { Button, EditText } from 'dooboo-ui';
import {
  IC_LOGO_D,
  IC_LOGO_W,
  SvgApple,
  SvgFacebook,
  SvgGoogle,
} from '../../utils/Icons';
import React, { ReactElement, useEffect, useState } from 'react';
import type {
  SignInAppleMutation,
  SignInAppleMutationResponse,
} from '../../__generated__/SignInAppleMutation.graphql';
import type {
  SignInEmailMutation,
  SignInEmailMutationResponse,
} from '../../__generated__/SignInEmailMutation.graphql';
import { ThemeType, useThemeContext } from '@dooboo-ui/theme';
import { delay, spring, useClock, useValue } from 'react-native-redash';
import { graphql, useMutation } from 'react-relay/hooks';
import { showAlertForError, validateEmail } from '../../utils/common';
import styled, { css } from 'styled-components/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import { EditTextInputType } from 'dooboo-ui/EditText';
import type { SignInCreateNotificationMutation } from '../../__generated__/SignInCreateNotificationMutation.graphql';
import SocialSignInButton from '../shared/SocialSignInButton';
import StatusBar from '../shared/StatusBar';
import { getString } from '../../../STRINGS';
import { useAuthContext } from '../../providers/AuthProvider';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

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

const StyledLogoText = styled.Text`
  align-self: flex-start;
  color: ${({ theme }): string => theme.fontColor};
  font-size: 20px;
  font-weight: bold;
  margin-left: 6px;
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

const StyledScrollView = styled.ScrollView`
  align-self: center;
  width: 100%;

  /* ${({ theme: { desktop } }) =>
    desktop &&
    css`
      width: 50%;
      max-width: 800;
    `} */
`;

interface Props {
  navigation: AuthStackNavigationProps<'SignIn'>;
}

const signInEmail = graphql`
  mutation SignInEmailMutation($email: String!, $password: String!) {
    signInEmail(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        photoURL
        verified
        profile {
          authType
        }
      }
    }
  }
`;

const signInWithApple = graphql`
  mutation SignInAppleMutation($accessToken: String!) {
    signInWithApple(accessToken: $accessToken) {
      token
      user {
        id
        email
        name
        photoURL
        verified
        profile {
          authType
        }
      }
    }
  }
`;

const createNotification = graphql`
  mutation SignInCreateNotificationMutation(
    $token: String!
    $device: String
    $os: String
  ) {
    createNotification(token: $token, device: $device, os: $os) {
      id
      token
      device
      createdAt
    }
  }
`;

function SignIn(props: Props): ReactElement {
  const { navigation } = props;
  const { setUser } = useAuthContext();
  const { theme, changeThemeType, themeType } = useThemeContext();

  const [signingInApple, setSigningInApple] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const [commitEmail, isInFlight] = useMutation<SignInEmailMutation>(
    signInEmail,
  );

  const [commitApple, isAppleInFlight] = useMutation<SignInAppleMutation>(
    signInWithApple,
  );

  const [commitNotification] = useMutation<SignInCreateNotificationMutation>(
    createNotification,
  );

  const createNotificationIfPushTokenExists = async (): Promise<void> => {
    const pushToken = await AsyncStorage.getItem('push_token');

    if (pushToken) {
      const createNotificationMutationConfig = {
        variables: {
          token: pushToken,
          device: Device.modelName,
          os: Device.osName,
        },
      };

      commitNotification(createNotificationMutationConfig);
    }
  };

  const goToSignUp = (): void => {
    navigation.navigate('SignUp');
  };

  const goToFindPw = (): void => {
    navigation.navigate('FindPw');
  };

  const signIn = async (): Promise<void> => {
    if (!validateEmail(email)) {
      setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));

      return;
    }

    if (!password) {
      setErrorPassword(getString('PASSWORD_REQUIRED'));

      return;
    }

    const licenseAgreed = JSON.parse(
      (await AsyncStorage.getItem('license_agreed')) as string,
    );

    if (!licenseAgreed) {
      return navigation.navigate('LicenseAgreement');
    }

    const mutationConfig = {
      variables: {
        email,
        password,
      },

      onCompleted: (response: SignInEmailMutationResponse) => {
        const { token, user } = response.signInEmail as AuthPayload;

        if (user && !user.verified) {
          return navigation.navigate('VerifyEmail', {
            email,
          });
        }

        AsyncStorage.setItem('token', token);

        createNotificationIfPushTokenExists();

        setUser(user as User);
      },

      onError: (error: Error): void => {
        setErrorPassword(error.message);
        setErrorPassword(getString('PASSWORD_INCORRECT'));
      },
    };

    commitEmail(mutationConfig);
  };

  const goToWebView = (uri: string): void => {
    props.navigation.navigate('WebView', { uri });
  };

  const appleLogin = async (): Promise<void> => {
    setSigningInApple(true);

    try {
      const csrf = Math.random().toString(36).substring(2, 15);
      const nonce = Math.random().toString(36).substring(2, 10);

      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce,
      );

      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        state: csrf,
        nonce: hashedNonce,
      });

      const { identityToken } = appleCredential;

      if (identityToken) {
        const mutationConfig = {
          variables: {
            accessToken: identityToken,
          },
          onCompleted: (response: SignInAppleMutationResponse) => {
            const { token, user } = response.signInWithApple as AuthPayload;

            AsyncStorage.setItem('token', token);

            createNotificationIfPushTokenExists();

            setUser(user as User);
          },
          onError: (err: Error) => {
            showAlertForError(err);
          },
        };

        commitApple(mutationConfig);
      }
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        Platform.select({
          // @ts-ignore
          web: alert(`Apple Login Error: ${e.code} - ${e.message}`),
          default: Alert.alert(`Apple Login Error: ${e.code} - ${e.message}`),
        });
      }
    } finally {
      setSigningInApple(false);
    }
  };

  useEffect(() => {
    // console.log('appOwnership', Constants.appOwnership);
  }, []);

  const logoSize = 80;
  const logoTransformAnimValue = useValue(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const logoInitialPosition = {
    x: (screenWidth - logoSize) * 0.5,
    y: screenHeight * 0.5 - logoSize,
  };

  const logoFinalPosition = {
    x: 30,
    y: 80,
  };

  const logoScale = logoTransformAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 1],
  });

  const logoPositionX = logoTransformAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [logoInitialPosition.x, logoFinalPosition.x],
  });

  const logoPositionY = logoTransformAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [logoInitialPosition.y, logoFinalPosition.y],
  });

  const animating = useValue<number>(0);
  const clock = useClock();

  useCode(() => block([delay(set(animating, 1), 100)]), []);

  useCode(
    () =>
      block([
        cond(animating, [
          set(
            logoTransformAnimValue,
            spring({
              clock,
              to: 1,
              from: 0,
              config: { mass: 1.5, stiffness: 36 },
            }),
          ),
        ]),
        cond(not(clockRunning(clock)), set(animating, 0)),
      ]),
    [],
  );

  return (
    <Container>
      <StatusBar />

      <StyledScrollView>
        <AnimatedTouchableOpacity
          testID="theme-test"
          onPress={(): void => changeThemeType()}
          // @ts-ignore
          style={{
            zIndex: 15,
            position: 'absolute',
            left: logoPositionX,
            top: logoPositionY,
            transform: [{ scale: logoScale }],
          }}
        >
          <Image
            style={{ width: logoSize, height: logoSize, resizeMode: 'cover' }}
            source={themeType === ThemeType.DARK ? IC_LOGO_D : IC_LOGO_W}
          />
        </AnimatedTouchableOpacity>
        <Wrapper>
          <LogoWrapper>
            <View style={{ height: 12 + 60 }} />
            <StyledLogoText>{getString('HELLO')}</StyledLogoText>
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
            onSubmitEditing={signIn}
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
            onSubmitEditing={signIn}
            secureTextEntry={true}
          />
          <ButtonWrapper>
            <Button
              testID="btn-sign-up"
              onPress={goToSignUp}
              style={{
                root: {
                  flex: 1,
                  flexDirection: 'row',
                  height: 52,
                  justifyContent: 'center',
                },
                button: {
                  width: '100%',
                  backgroundColor: theme.btnPrimaryLight,
                  borderColor: theme.btnPrimary,
                  borderWidth: 1,
                  borderRadius: 0,
                },
                text: {
                  color: theme.btnPrimary,
                  fontSize: 14,
                  fontWeight: 'bold',
                },
              }}
              text={getString('SIGN_UP')}
            />
            <View style={{ width: 12 }} />
            <Button
              testID="btn-sign-in"
              loading={isInFlight}
              onPress={signIn}
              style={{
                root: {
                  flex: 1,
                  flexDirection: 'row',
                  height: 52,
                  justifyContent: 'center',
                },
                button: {
                  backgroundColor: theme.btnPrimary,
                  width: '100%',
                  borderRadius: 0,
                },
                text: {
                  color: theme.btnPrimaryFont,
                  fontSize: 14,
                  fontWeight: 'bold',
                },
              }}
              text={getString('LOGIN')}
            />
          </ButtonWrapper>
          <FindPwTouchOpacity testID="btn-find-pw" onPress={goToFindPw}>
            <FindPwText>{getString('FORGOT_PW')}</FindPwText>
          </FindPwTouchOpacity>
          <SocialButtonWrapper>
            {Platform.select({
              ios: (
                <Button
                  testID="btn-apple"
                  style={{
                    button: {
                      backgroundColor: theme.appleBackground,
                      borderColor: theme.appleText,
                      width: '100%',
                      height: 48,
                      borderWidth: 1,
                      marginBottom: 12,
                      borderRadius: 100,
                    },
                    text: {
                      fontWeight: '700',
                      color: theme.appleText,
                    },
                  }}
                  leftElement={
                    <View style={{ marginRight: 6 }}>
                      <SvgApple width={18} height={18} fill={theme.appleIcon} />
                    </View>
                  }
                  loading={signingInApple || isAppleInFlight}
                  indicatorColor={theme.primary}
                  onPress={appleLogin}
                  text={getString('SIGN_IN_WITH_APPLE')}
                />
              ),
            })}
            <SocialSignInButton
              svgIcon={
                <SvgFacebook width={18} height={18} fill={theme.facebookIcon} />
              }
              onUserCreated={(user?: User): void => {
                createNotificationIfPushTokenExists();
                setUser?.(user);
              }}
              socialProvider={AuthType.Facebook}
            />
            <SocialSignInButton
              svgIcon={
                <SvgGoogle width={20} height={20} fill={theme.googleIcon} />
              }
              onUserCreated={(user?: User): void => {
                createNotificationIfPushTokenExists();
                setUser?.(user);
              }}
              socialProvider={AuthType.Google}
            />
          </SocialButtonWrapper>
          <StyledAgreementTextWrapper>
            <StyledAgreementText>{getString('AGREEMENT1')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-terms"
              onPress={(): void =>
                goToWebView('https://legacy.dooboolab.com/termsofservice')
              }
            >
              {getString('AGREEMENT2')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT3')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-privacy"
              onPress={(): void =>
                goToWebView('https://legacy.dooboolab.com/privacyandpolicy')
              }
            >
              {getString('AGREEMENT4')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT5')}</StyledAgreementText>
          </StyledAgreementTextWrapper>
        </Wrapper>
      </StyledScrollView>
    </Container>
  );
}

export default SignIn;
