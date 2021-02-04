import * as AuthSession from 'expo-auth-session';
import * as Config from '../../../config';
import * as WebBrowser from 'expo-web-browser';

import {Alert, Platform, View} from 'react-native';
import {AuthType, User} from '../../types/graphql';
import {Button, useTheme} from 'dooboo-ui';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import type {
  SocialSignInButtonFacebookSignInMutation,
  SocialSignInButtonFacebookSignInMutationResponse,
} from '../../__generated__/SocialSignInButtonFacebookSignInMutation.graphql';
import type {
  SocialSignInButtonGoogleSignInMutation,
  SocialSignInButtonGoogleSignInMutationResponse,
} from '../../__generated__/SocialSignInButtonGoogleSignInMutation.graphql';
import {graphql, useMutation} from 'react-relay/hooks';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getString} from '../../../STRINGS';
import {showAlertForError} from '../../utils/common';

const {facebookAppId, facebookSecret, googleWebClientId} = Config;

WebBrowser.maybeCompleteAuthSession();

interface Props {
  svgIcon: ReactElement;
  socialProvider: AuthType;
  onUserCreated?: (user?: User) => void;
}

const signInWithFacebook = graphql`
  mutation SocialSignInButtonFacebookSignInMutation($accessToken: String!) {
    signInWithFacebook(accessToken: $accessToken) {
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

const signInWithGoogle = graphql`
  mutation SocialSignInButtonGoogleSignInMutation($accessToken: String!) {
    signInWithGoogle(accessToken: $accessToken) {
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

const SocialSignInButton: FC<Props> = ({
  svgIcon,
  socialProvider,
  onUserCreated,
}) => {
  const [
    commitFacebook,
    isFacebookInFlight,
  ] = useMutation<SocialSignInButtonFacebookSignInMutation>(signInWithFacebook);

  const [
    commitGoogle,
    isGoogleInFlight,
  ] = useMutation<SocialSignInButtonGoogleSignInMutation>(signInWithGoogle);

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
    socialProvider === AuthType.Google
      ? googleDiscovery
      : {
          authorizationEndpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
          tokenEndpoint: 'https://graph.facebook.com/v6.0/oauth/access_token',
        };

  const redirectUri = makeRedirectUri(
    socialProvider === AuthType.Google
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
    socialProvider === AuthType.Google
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
        if (socialProvider === AuthType.Google) {
          const mutationConfig = {
            variables: {accessToken},
            onCompleted: (
              googleResponse: SocialSignInButtonGoogleSignInMutationResponse,
            ) => {
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
          onCompleted: (
            fbResponse: SocialSignInButtonFacebookSignInMutationResponse,
          ) => {
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

  if (socialProvider === AuthType.Google)
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
