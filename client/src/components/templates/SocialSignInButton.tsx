import * as AuthSession from 'expo-auth-session';
import * as Config from '../../../config';
import * as WebBrowser from 'expo-web-browser';

import {Alert, Platform, View} from 'react-native';
import {AuthType, User} from '../../types/graphql';
import {Button, useTheme} from 'dooboo-ui';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import type {
  UserFacebookSignInMutation,
  UserFacebookSignInMutationResponse,
} from '../../__generated__/UserFacebookSignInMutation.graphql';
import type {
  UserGoogleSignInMutation,
  UserGoogleSignInMutationResponse,
} from '../../__generated__/UserGoogleSignInMutation.graphql';
import {signInWithFacebook, signInWithGoogle} from '../../relay/queries/User';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getString} from '../../../STRINGS';
import {showAlertForError} from '../../utils/common';
import {useMutation} from 'react-relay/hooks';

const {facebookAppId, facebookSecret, googleWebClientId} = Config;

WebBrowser.maybeCompleteAuthSession();

interface Props {
  svgIcon: ReactElement;
  socialProvider: AuthType;
  onUserCreated?: (user?: User) => void;
}

const SocialSignInButton: FC<Props> = ({
  svgIcon,
  socialProvider,
  onUserCreated,
}) => {
  const [
    commitFacebook,
    isFacebookInFlight,
  ] = useMutation<UserFacebookSignInMutation>(signInWithFacebook);

  const [
    commitGoogle,
    isGoogleInFlight,
  ] = useMutation<UserGoogleSignInMutation>(signInWithGoogle);

  const {theme} = useTheme();
  const useProxy = Platform.select({web: false, default: true});

  const {
    makeRedirectUri,
    useAuthRequest,
    ResponseType,
    Prompt,
    useAutoDiscovery,
  } = AuthSession;

  const googleDiscovery = useAutoDiscovery('https://accounts.google.com');
  const [signingIn, setSigningIn] = useState<boolean>(false);

  const discovery =
    socialProvider === 'google'
      ? googleDiscovery
      : {
          authorizationEndpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
          tokenEndpoint: 'https://graph.facebook.com/v6.0/oauth/access_token',
        };

  const redirectUri = makeRedirectUri(
    socialProvider === 'google'
      ? {
          // native: 'com.dooboolab.hackatalk',
          useProxy,
        }
      : {
          // native: `fb${facebookAppId}://authorize`,
          useProxy,
        },
  );

  const [request, response, promptAsync] = useAuthRequest(
    socialProvider === 'google'
      ? {
          clientId: googleWebClientId,
          // iosClientId: googleIOSClientId,
          // androidClientId: googleAndroidClientId,
          // webClientId: googleWebClientId,
          redirectUri,
          prompt: Prompt.SelectAccount,
          scopes: ['openid', 'profile', 'email'],
          responseType: ResponseType.Token,
          usePKCE: false,
        }
      : {
          clientId: facebookAppId,
          clientSecret: facebookSecret,
          // scopes: ['public_profile, email'],
          redirectUri,
          prompt: Prompt.SelectAccount,
          extraParams: {
            display: Platform.select({web: 'popup'}) as string,
            auth_type: 'rerequest',
          },
          responseType: ResponseType.Token,
        },
    discovery,
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const {authentication} = response;

      const accessToken = authentication?.accessToken;

      if (accessToken) {
        if (socialProvider === 'google') {
          const mutationConfig = {
            variables: {accessToken},
            onCompleted: (googleResponse: UserGoogleSignInMutationResponse) => {
              if (googleResponse.signInWithGoogle) {
                const {user, token} = googleResponse.signInWithGoogle;

                AsyncStorage.setItem('token', token as string);

                if (onUserCreated) onUserCreated(user as User);
              }
            },
            onError: (error: Error): void => {
              showAlertForError(error);
            },
          };

          commitGoogle(mutationConfig);

          return;
        }

        const mutationConfig = {
          variables: {accessToken},
          onCompleted: (fbResponse: UserFacebookSignInMutationResponse) => {
            if (fbResponse.signInWithFacebook) {
              const {user, token} = fbResponse.signInWithFacebook;

              AsyncStorage.setItem('token', token as string);

              if (onUserCreated) onUserCreated(user as User);
            }
          },
          onError: (error: Error): void => {
            showAlertForError(error);
          },
        };

        commitFacebook(mutationConfig);
      }
    }
  }, [response, onUserCreated, commitFacebook, commitGoogle, socialProvider]);

  const requestSignIn = async (): Promise<void> => {
    setSigningIn(true);

    try {
      await promptAsync({useProxy});
    } catch (err) {
      Alert.alert(getString('ERROR'), err);
    } finally {
      setSigningIn(false);
    }
  };

  if (socialProvider === 'google')
    return (
      <Button
        testID="btn-google"
        disabled={!request}
        style={{marginBottom: 12}}
        styles={{
          container: {
            backgroundColor: theme.googleBackground,
            borderColor: theme.googleBackground,
            borderWidth: 1,
            height: 48,
            borderRadius: 100,
          },
          text: {
            fontWeight: '700',
            color: theme.googleText,
          },
        }}
        leftElement={<View style={{marginRight: 6}}>{svgIcon}</View>}
        loading={isGoogleInFlight || signingIn}
        indicatorColor={theme.primary}
        onPress={requestSignIn}
        text={getString('SIGN_IN_WITH_GOOGLE')}
      />
    );

  return (
    <Button
      testID="btn-facebook"
      disabled={!request}
      styles={{
        container: {
          backgroundColor: theme.facebookBackground,
          borderColor: theme.facebookBackground,
          borderWidth: 1,
          height: 48,
          borderRadius: 100,
        },
        text: {fontWeight: '700', color: theme.facebookText},
      }}
      style={{marginBottom: 12}}
      leftElement={<View style={{marginRight: 6}}>{svgIcon}</View>}
      loading={isFacebookInFlight || signingIn}
      indicatorColor={theme.primary}
      onPress={requestSignIn}
      text={getString('SIGN_IN_WITH_FACEBOOK')}
    />
  );
};

export default SocialSignInButton;
