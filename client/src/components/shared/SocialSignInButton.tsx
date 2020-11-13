import * as AuthSession from 'expo-auth-session';
import * as Config from '../../../config';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { Alert, Platform, View } from 'react-native';
import { AuthType, User } from '../../types/graphql';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import type {
  SocialSignInButtonFacebookSignInMutation,
  SocialSignInButtonFacebookSignInMutationResponse,
} from '../../__generated__/SocialSignInButtonFacebookSignInMutation.graphql';
import type {
  SocialSignInButtonGoogleSignInMutation,
  SocialSignInButtonGoogleSignInMutationResponse,
} from '../../__generated__/SocialSignInButtonGoogleSignInMutation.graphql';
import { graphql, useMutation } from 'react-relay/hooks';

import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'dooboo-ui';
import { getString } from '../../../STRINGS';
import { showAlertForError } from '../../utils/common';
import { useThemeContext } from '@dooboo-ui/theme';

const { facebookAppId, facebookSecret, googleAndroidClientId, googleIOSClientId, googleWebClientId } = Config;

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
  const [commitFacebook, isFacebookInFlight] =
  useMutation<SocialSignInButtonFacebookSignInMutation>(signInWithFacebook);

  const [commitGoogle, isGoogleInFlight] =
  useMutation<SocialSignInButtonGoogleSignInMutation>(signInWithGoogle);

  const {
    makeRedirectUri,
    useAuthRequest,
    ResponseType,
    Prompt,
    useAutoDiscovery,
    startAsync,
  } = AuthSession;

  const { theme } = useThemeContext();
  const useProxy = Platform.select({ web: false, default: true });
  const [signingIn, setSigningIn] = useState<boolean>(false);

  const redirectUri = makeRedirectUri(
    socialProvider === AuthType.Google
      ? {
        // native: 'hackatalk.dev',
        useProxy,
      }
      : {
        native: `${facebookAppId}://authorize`,
        useProxy,
      },
  );

  const [request, response, promptAsync] = socialProvider === AuthType.Google
    ? Google.useAuthRequest({
      expoClientId: googleWebClientId,
      iosClientId: googleIOSClientId,
      androidClientId: googleAndroidClientId,
      webClientId: googleWebClientId,
      redirectUri,
      prompt: Prompt.SelectAccount,
      scopes: ['openid', 'profile'],
      responseType: ResponseType.Token,
      usePKCE: false,
    })
    : Facebook.useAuthRequest({
      clientId: facebookAppId,
      clientSecret: facebookSecret,
      scopes: ['public_profile, email'],
      redirectUri,
      prompt: Prompt.SelectAccount,
      extraParams: {
        display: Platform.select({ web: 'popup' }) as string,
        // eslint-disable-next-line
          auth_type: 'rerequest',
      },
      responseType: ResponseType.Token,
    });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      const accessToken = authentication?.accessToken;

      if (accessToken) {
        if (socialProvider === AuthType.Google) {
          const mutationConfig = {
            variables: { accessToken },
            onCompleted: (response: SocialSignInButtonGoogleSignInMutationResponse) => {
              if (response.signInWithGoogle) {
                const { user, token } = response.signInWithGoogle;

                AsyncStorage.setItem('token', token as string);

                if (onUserCreated) onUserCreated(user as User);

                return;
              }

              Alert.alert(getString('ERROR'), getString('ERROR_OCCURED'));
            },
            onError: (error: any): void => {
              showAlertForError(error);
            },
          };

          commitGoogle(mutationConfig);

          return;
        }

        const mutationConfig = {
          variables: { accessToken },
          onCompleted: (response: SocialSignInButtonFacebookSignInMutationResponse) => {
            if (response.signInWithFacebook) {
              const { user, token } = response.signInWithFacebook;

              AsyncStorage.setItem('token', token as string);

              if (onUserCreated) onUserCreated(user as User);

              return;
            }

            Alert.alert(getString('ERROR'), getString('ERROR_OCCURED'));
          },
          onError: (error: any): void => {
            showAlertForError(error);
          },
        };

        commitFacebook(mutationConfig);
      }
    }
  }, [response]);

  const requestSignIn = async (): Promise<void> => {
    setSigningIn(true);

    try {
      await promptAsync();
    } catch (err) {
      Alert.alert(getString('ERROR'), err);
    } finally {
      setSigningIn(false);
    }
  };

  if (socialProvider === AuthType.Google) {
    return <Button
      testID="btn-google"
      disabled={!request}
      style={{
        button: {
          backgroundColor: theme.googleBackground,
          borderColor: theme.googleBackground,
          borderWidth: 1,
          width: '100%',
          height: 48,
          marginBottom: 12,
          borderRadius: 100,
        },
        text: {
          fontWeight: '700', color: theme.googleText,
        },
      }}
      leftElement={
        <View style={{ marginRight: 6 }}>{svgIcon}</View>
      }
      loading={isGoogleInFlight || signingIn}
      indicatorColor={theme.primary}
      onPress={requestSignIn}
      text={getString('SIGN_IN_WITH_GOOGLE')}
    />;
  }

  return <Button
    testID="btn-facebook"
    disabled={!request}
    style={{
      button: {
        backgroundColor: theme.facebookBackground,
        borderColor: theme.facebookBackground,
        borderWidth: 1,
        width: '100%',
        height: 48,
        marginBottom: 12,
        borderRadius: 100,
      },
      text: { fontWeight: '700', color: theme.facebookText },
    }}
    leftElement={
      <View style={{ marginRight: 6 }}>{svgIcon}</View>
    }
    loading={isFacebookInFlight || signingIn}
    indicatorColor={theme.primary}
    onPress={requestSignIn}
    text={getString('SIGN_IN_WITH_FACEBOOK')}
  />;
};

export default SocialSignInButton;
