import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';

import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Button,
  EditText,
  StatusBarBrightness,
  Typography,
  useTheme,
} from 'dooboo-ui';
import {
  IC_LOGO_D,
  IC_LOGO_W,
  SvgApple,
  SvgFacebook,
  SvgGoogle,
} from '../../../utils/Icons';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import type {
  UserSignInAppleMutation,
  UserSignInAppleMutationResponse,
} from '../../../__generated__/UserSignInAppleMutation.graphql';
import type {
  UserSignInEmailMutation,
  UserSignInEmailMutationResponse,
} from '../../../__generated__/UserSignInEmailMutation.graphql';
import {showAlertForError, validateEmail} from '../../../utils/common';
import {signInEmail, signInWithApple} from '../../../relay/queries/User';
import styled, {css} from '@emotion/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthPayload} from '../../../types/graphql';
import {AuthStackNavigationProps} from '../../navigations/AuthStackNavigator';
import type {NotificationCreateNotificationMutation} from '../../../__generated__/NotificationCreateNotificationMutation.graphql';
import SocialSignInButton from './SocialSignInButton';
import {colors} from '../../../theme';
import {createNotification} from '../../../relay/queries/Notification';
import {getString} from '../../../../STRINGS';
import {useAuthContext} from '../../../providers/AuthProvider';
import {useMutation} from 'react-relay';
import {useNavigation} from '@react-navigation/core';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background: ${({theme}) => theme.background};
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
  color: ${({theme}) => theme.text};
  font-size: 20px;
  font-weight: bold;
  margin-left: 6px;
`;

const ButtonWrapper = styled.View`
  margin-top: 4px;
  height: 52px;
  width: 100%;
  flex-direction: row;
`;

const FindPwTouchOpacity = styled.TouchableOpacity`
  padding: 16px;
  margin-bottom: 28px;
  align-self: center;
`;

const FindPwText = styled.Text`
  color: ${({theme}) => theme.button};
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

const StyledScrollView = styled.ScrollView`
  align-self: center;
  width: 100%;

  /* ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      width: 50%;
      max-width: 800;
    `} */
`;

const SignIn: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProps<'SignIn'>>();
  const {loadMeQuery} = useAuthContext();
  const {theme, changeThemeType, themeType} = useTheme();

  const [signingInApple, setSigningInApple] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const [commitEmail, isInFlight] =
    useMutation<UserSignInEmailMutation>(signInEmail);

  const [commitApple, isAppleInFlight] =
    useMutation<UserSignInAppleMutation>(signInWithApple);

  const [commitNotification] =
    useMutation<NotificationCreateNotificationMutation>(createNotification);

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

    if (!licenseAgreed && Platform.OS === 'ios') {
      return navigation.navigate('LicenseAgreement');
    }

    const mutationConfig = {
      variables: {
        email,
        password,
      },

      onCompleted: (response: UserSignInEmailMutationResponse) => {
        const {token, user} = response.signInEmail as AuthPayload;

        if (user && !user.verified) {
          return navigation.navigate('VerifyEmail', {
            email,
          });
        }

        if (user && token) {
          createNotificationIfPushTokenExists();

          AsyncStorage.setItem('token', token).then(() => {
            loadMeQuery({}, {fetchPolicy: 'network-only'});
          });
        }
      },

      onError: (error: Error): void => {
        setErrorPassword(error.message);
        setErrorPassword(getString('PASSWORD_INCORRECT'));
      },
    };

    commitEmail(mutationConfig);
  };

  const renderAgreements = (texts: string): (ReactElement | string)[] => {
    return texts.split('**').map((str, i) =>
      i % 2 === 0 ? (
        str
      ) : (
        <Typography.Body2
          key={str}
          onPress={() => {
            if (str === getString('PRIVACY_AND_POLICY')) {
              return Linking.openURL(
                'https://legacy.dooboolab.com/privacyandpolicy',
              );
            }

            Linking.openURL('https://legacy.dooboolab.com/termsofservice');
          }}
          style={{textDecorationLine: 'underline'}}
        >
          {str}
        </Typography.Body2>
      ),
    );
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

      const {identityToken} = appleCredential;

      if (identityToken) {
        const mutationConfig = {
          variables: {
            accessToken: identityToken,
          },
          onCompleted: (response: UserSignInAppleMutationResponse) => {
            const {token, user} = response.signInWithApple as AuthPayload;

            if (user && token) {
              createNotificationIfPushTokenExists();

              AsyncStorage.setItem('token', token).then(() => {
                loadMeQuery({}, {fetchPolicy: 'network-only'});
              });
            }
          },
          onError: (err: Error) => {
            showAlertForError(err);
          },
        };

        commitApple(mutationConfig);
      }
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        Platform.select({
          // eslint-disable-next-line no-alert
          web: alert(`Apple Login Error: ${e.code} - ${e.message}`),
          default: Alert.alert(`Apple Login Error: ${e.code} - ${e.message}`),
        });
      }
    } finally {
      setSigningInApple(false);
    }
  };

  const LOGO_SIZE = 80;
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
  const logoAnimValue = useSharedValue(0);

  useEffect(() => {
    let timer = setTimeout(
      () => (logoAnimValue.value = withSpring(1, {stiffness: 36, mass: 1.5})),
      100,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [logoAnimValue]);

  const logoAnimStyle = useAnimatedStyle(() => {
    const left = interpolate(
      logoAnimValue.value,
      [0, 1],
      [screenWidth * 0.7, 30],
    );

    const top = interpolate(
      logoAnimValue.value,
      [0, 1],
      [screenHeight * 0.3, 80],
    );

    const width =
      Platform.OS !== 'web'
        ? withSpring(
            interpolate(
              logoAnimValue.value,
              [0, 1],
              [LOGO_SIZE * 2, LOGO_SIZE],
            ),
          )
        : interpolate(logoAnimValue.value, [0, 1], [LOGO_SIZE * 2, LOGO_SIZE]);

    const height =
      Platform.OS !== 'web'
        ? withSpring(
            interpolate(
              logoAnimValue.value,
              [0, 1],
              [LOGO_SIZE * 2, LOGO_SIZE],
            ),
          )
        : interpolate(logoAnimValue.value, [0, 1], [LOGO_SIZE * 2, LOGO_SIZE]);

    return {
      position: 'absolute',
      zIndex: 15,
      top,
      left,
      width,
      height,
    };
  });

  return (
    <Container>
      <StatusBarBrightness />
      <StyledScrollView>
        <AnimatedTouchableOpacity
          testID="theme-test"
          style={logoAnimStyle}
          onPress={(): void => {
            changeThemeType();
          }}
        >
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            source={themeType === 'dark' ? IC_LOGO_D : IC_LOGO_W}
          />
        </AnimatedTouchableOpacity>
        <Wrapper>
          <LogoWrapper>
            <View style={{height: 12 + 60}} />
            <StyledLogoText>{getString('HELLO')}</StyledLogoText>
          </LogoWrapper>
          <EditText
            type="row"
            testID="input-email"
            styles={{
              container: {borderColor: theme.text},
              labelText: {width: 80},
              input: {
                color: theme.text,
                height: 52,
              },
            }}
            style={{marginBottom: 4}}
            labelText={getString('EMAIL')}
            focusColor={theme.text}
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
            type="row"
            styles={{
              container: {borderColor: theme.text},
              labelText: {width: 80},
              input: {
                color: theme.text,
                height: 52,
              },
            }}
            style={{marginBottom: 20}}
            labelText={getString('PASSWORD')}
            focusColor={theme.text}
            placeholder="******"
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
              onPress={() => navigation.navigate('SignUp')}
              style={{flex: 1}}
              styles={{
                container: css`
                  border-width: 1px;
                  border-radius: 0px;
                  background-color: ${theme.paper};
                  border-color: ${theme.button};
                  border-width: 1px;

                  flex: 1;
                  flex-direction: row;
                  justify-content: center;
                `,
                text: css`
                  color: ${theme.button};
                  font-size: 14px;
                  font-weight: bold;
                `,
                hovered: css`
                  border-color: ${theme.text};
                `,
              }}
              text={getString('SIGN_UP')}
            />
            <View style={{width: 12}} />
            <Button
              testID="btn-sign-in"
              loading={isInFlight}
              onPress={signIn}
              style={{flex: 1}}
              styles={{
                container: css`
                  border-width: 1px;
                  border-radius: 0px;
                  height: 52px;
                  background-color: ${theme.button};
                  border-color: ${theme.button};

                  flex: 1;
                  align-self: stretch;

                  flex-direction: row;
                  justify-content: center;
                `,
                text: css`
                  font-size: 14px;
                  font-weight: bold;
                  color: ${theme.textContrast};
                `,
                hovered: css`
                  border-color: ${theme.text};
                `,
              }}
              text={getString('LOGIN')}
            />
          </ButtonWrapper>
          <FindPwTouchOpacity
            testID="btn-find-pw"
            onPress={() => navigation.navigate('FindPw')}
          >
            <FindPwText>{getString('FORGOT_PW')}</FindPwText>
          </FindPwTouchOpacity>
          <SocialButtonWrapper>
            {Platform.select({
              ios: (
                <Button
                  testID="btn-apple"
                  style={{marginBottom: 12}}
                  styles={{
                    container: css`
                      background-color: ${colors.light};
                      width: 100%;
                      height: 48px;
                      border-radius: 0px;
                    `,
                    text: {
                      fontWeight: '700',
                      color: 'black',
                    },
                  }}
                  leftElement={
                    <View style={{marginRight: 6}}>
                      <SvgApple width={18} height={18} fill={colors.apple} />
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
                <SvgFacebook width={18} height={18} fill={colors.facebook} />
              }
              onUserCreated={() => {
                createNotificationIfPushTokenExists();
                loadMeQuery({}, {fetchPolicy: 'network-only'});
              }}
              socialProvider={'facebook'}
            />
            <SocialSignInButton
              svgIcon={
                <SvgGoogle width={20} height={20} fill={colors.google} />
              }
              onUserCreated={() => {
                createNotificationIfPushTokenExists();
                loadMeQuery({}, {fetchPolicy: 'network-only'});
              }}
              socialProvider="google"
            />
          </SocialButtonWrapper>
          <StyledAgreementTextWrapper>
            <Typography.Body2 style={{textAlign: 'center'}}>
              {renderAgreements(
                getString('SIGN_UP_POLICY_AGREEMENT', {
                  termsForAgreement: `**${getString('TERMS_FOR_AGREEMENT')}**`,
                  privacyAndPolicy: `**${getString('PRIVACY_AND_POLICY')}**`,
                }),
              )}
            </Typography.Body2>
          </StyledAgreementTextWrapper>
        </Wrapper>
      </StyledScrollView>
    </Container>
  );
};

export default SignIn;
