import * as AuthSession from 'expo-auth-session';
import * as Config from '../../../../config';
import * as WebBrowser from 'expo-web-browser';

import {Alert, Platform, View} from 'react-native';
import {Button, useTheme} from 'dooboo-ui';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import {UseMutationConfig, useMutation} from 'react-relay';
import type {
  UserFacebookSignInMutation,
  UserFacebookSignInMutation$data,
} from '../../../__generated__/UserFacebookSignInMutation.graphql';
import type {
  UserGoogleSignInMutation,
  UserGoogleSignInMutation$data,
} from '../../../__generated__/UserGoogleSignInMutation.graphql';
import {
  signInWithFacebook,
  signInWithGoogle,
} from '../../../relay/queries/User';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../../../types/graphql';
import {colors} from '../../../theme';
import {css} from '@emotion/native';
import {getString} from '../../../../STRINGS';
import {normalizeErrorString} from '../../../relay/util';
import {showAlertForError} from '../../../utils/common';

const {facebookAppId, googleWebClientId} = Config;

WebBrowser.maybeCompleteAuthSession();

type AuthType = 'google' | 'apple' | 'facebook' | 'emails';

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
  const [commitFacebook, isFacebookInFlight] =
    useMutation<UserFacebookSignInMutation>(signInWithFacebook);

  const [commitGoogle, isGoogleInFlight] =
    useMutation<UserGoogleSignInMutation>(signInWithGoogle);

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
          authorizationEndpoint: 'https://www.facebook.com/v10.0/dialog/oauth',
          tokenEndpoint: 'https://graph.facebook.com/v10.0/oauth/access_token',
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
          const mutationConfig: UseMutationConfig<UserGoogleSignInMutation> = {
            variables: {accessToken},
            onCompleted: (googleResponse: UserGoogleSignInMutation$data) => {
              if (googleResponse.signInWithGoogle) {
                const {user, token} = googleResponse.signInWithGoogle;

                AsyncStorage.setItem('token', token).then(() => {
                  if (onUserCreated) {
                    onUserCreated(user as User);
                  }
                });
              }
            },
            onError: (error) => {
              showAlertForError(normalizeErrorString(error));
            },
          };

          commitGoogle(mutationConfig);

          return;
        }

        const mutationConfig = {
          variables: {accessToken},
          onCompleted: (fbResponse: UserFacebookSignInMutation$data) => {
            if (fbResponse.signInWithFacebook) {
              const {user, token} = fbResponse.signInWithFacebook;

              AsyncStorage.setItem('token', token).then(() => {
                if (onUserCreated) {
                  onUserCreated(user as User);
                }
              });
            }
          },
          onError: (error: any) => {
            showAlertForError(normalizeErrorString(error));
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
    } catch (err: any) {
      Alert.alert(getString('ERROR'), err);
    } finally {
      setSigningIn(false);
    }
  };

  if (socialProvider === 'google') {
    return (
      <Button
        testID="btn-google"
        disabled={!request}
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
        leftElement={<View style={{marginRight: 6}}>{svgIcon}</View>}
        loading={isGoogleInFlight || signingIn}
        indicatorColor={theme.primary}
        onPress={requestSignIn}
        text={getString('SIGN_IN_WITH_GOOGLE')}
      />
    );
  }

  return (
    <Button
      testID="btn-facebook"
      disabled={!request}
      styles={{
        container: css`
          background-color: ${colors.light};
          width: 100%;
          height: 48px;
          border-width: 0px;
          border-radius: 0px;
        `,
        text: {fontWeight: '700', color: 'black'},
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
