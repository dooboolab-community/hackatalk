import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';

import {Alert, Platform} from 'react-native';
import {AuthPayload, User} from '../../types/graphql';
import React, {ReactElement, useState} from 'react';
import type {
  UserSignInAppleMutation,
  UserSignInAppleMutationResponse,
} from '../../__generated__/UserSignInAppleMutation.graphql';
import type {
  UserSignInEmailMutation,
  UserSignInEmailMutationResponse,
} from '../../__generated__/UserSignInEmailMutation.graphql';
import {showAlertForError, validateEmail} from '../../utils/common';
import {signInEmail, signInWithApple} from '../../relay/queries/User';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import type {NotificationCreateNotificationMutation} from '../../__generated__/NotificationCreateNotificationMutation.graphql';
import SignIn from '../templates/SignInTemp';
import {createNotification} from '../../relay/queries/Notification';
import {getString} from '../../../STRINGS';
import {useAuthContext} from '../../providers/AuthProvider';
import {useMutation} from 'react-relay/hooks';
import {useTheme} from 'dooboo-ui';

interface Props {
  navigation: AuthStackNavigationProps<'SignIn'>;
}

function SignInContainer(props: Props): ReactElement {
  const {changeThemeType} = useTheme();
  const {navigation} = props;
  const {setUser} = useAuthContext();

  const [signingInApple, setSigningInApple] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const [commitEmail, isSigningInFlight] = useMutation<UserSignInEmailMutation>(
    signInEmail,
  );

  const [commitApple, isAppleInFlight] = useMutation<UserSignInAppleMutation>(
    signInWithApple,
  );

  const [
    commitNotification,
  ] = useMutation<NotificationCreateNotificationMutation>(createNotification);

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

    if (!licenseAgreed) return navigation.navigate('LicenseAgreement');

    const mutationConfig = {
      variables: {
        email,
        password,
      },

      onCompleted: (response: UserSignInEmailMutationResponse) => {
        const {token, user} = response.signInEmail as AuthPayload;

        if (user && !user.verified)
          return navigation.navigate('VerifyEmail', {
            email,
          });

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
    props.navigation.navigate('WebView', {uri});
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
      } else
        Platform.select({
          // @ts-ignore
          // eslint-disable-next-line no-alert
          web: alert(`Apple Login Error: ${e.code} - ${e.message}`),
          default: Alert.alert(`Apple Login Error: ${e.code} - ${e.message}`),
        });
    } finally {
      setSigningInApple(false);
    }
  };

  return (
    <SignIn
      email={email}
      errorEmail={errorEmail}
      password={password}
      errorPassword={errorPassword}
      onAppIconPressed={(): void => changeThemeType()}
      isSigningIn={signingInApple || isSigningInFlight}
      isSigningInWithApple={isAppleInFlight}
      onSignInPressed={signIn}
      onSignInWithApplePressed={appleLogin}
      onSignUpPressed={goToSignUp}
      onFindPwPressed={goToFindPw}
      onChangeEmailText={(text: string) => {
        setEmail(text);
        setErrorEmail('');
      }}
      onChangePasswordText={(text: string) => {
        setPassword(text);
        setErrorPassword('');
      }}
      onAgreementPressed={() =>
        goToWebView('https://legacy.dooboolab.com/termsofservice')
      }
      onPrivacyPressed={() =>
        goToWebView('https://legacy.dooboolab.com/privacyandpolicy')
      }
      onUserCreated={(user) => {
        createNotificationIfPushTokenExists();
        setUser?.(user);
      }}
    />
  );
}

export default SignInContainer;
