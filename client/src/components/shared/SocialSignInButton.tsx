import * as AuthSession from 'expo-auth-session';

import { Alert, Platform, View } from 'react-native';
import { AuthType, User } from '../../types/graphql';
import React, { FC, ReactElement, useState } from 'react';
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

interface Props {
  svgIcon: ReactElement;
  clientId: string;
  clientSecret: string;
  socialProvider: AuthType;
  onUserCreated?: (user?: User) => void;
}

const signInWithFacebook = graphql`
  mutation SocialSignInButtonFacebookSignInMutation($token: String!) {
    signInWithFacebook(accessToken: $token) {
      token
      user {
        id
        email
        name
        nickname
        
      }
    }
  }
`;

const signInWithGoogle = graphql`
  mutation SocialSignInButtonGoogleSignInMutation($token: String!) {
    signInWithGoogle(accessToken: $token) {
      token
      user {
        id
      }
    }
  }
`;

const SocialSignInButton: FC<Props> = ({
  svgIcon,
  clientId,
  clientSecret,
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

  const discovery = socialProvider === AuthType.Google
    ? useAutoDiscovery('https://accounts.google.com')
    : {
      authorizationEndpoint: 'https://www.facebook.com/v8.0/dialog/oauth',
      tokenEndpoint: 'https://graph.facebook.com/v8.0/oauth/access_token',
    };

  const redirectUri = makeRedirectUri(
    socialProvider === AuthType.Google
      ? {
        native: 'hackatalk.dev',
        useProxy,
      }
      : {
        native: 'hackatalk.dev',
        useProxy,
      },
  );

  const [request, response, promptAsync] = useAuthRequest(
    socialProvider === AuthType.Google
      ? {
        clientId,
        redirectUri,
        prompt: Prompt.SelectAccount,
        scopes: ['openid', 'profile'],
        responseType: ResponseType.Token,
        usePKCE: false,
      }
      : {
        clientId,
        clientSecret,
        scopes: ['public_profile, email'],
        redirectUri,
        prompt: Prompt.SelectAccount,
        extraParams: {
          display: Platform.select({ web: 'popup' }) as string,
          // eslint-disable-next-line
          auth_type: 'rerequest',
        },
        responseType: ResponseType.Token,
      }
    ,
    discovery,
  );

  const signIn = async (): Promise<void> => {
    setSigningIn(true);

    try {
      // @ts-ignore
      const authUrl = await request?.makeAuthUrlAsync(discovery) as string;

      const result = await startAsync({
        authUrl,
        returnUrl: 'hackatalk://chat',
      });

      if (result.type === 'success') {
        if (socialProvider === AuthType.Google) {
          const accessToken = result.params.access_token;

          const mutationConfig = {
            variables: { token: accessToken },
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

        const accessToken = result.params.access_token;

        const mutationConfig = {
          variables: { token: accessToken },
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
      } else if (result.type === 'error') {
        throw new Error(result?.error?.message || '');
      }
    } catch (err) {
      if (Platform.OS === 'web') {
        // @ts-ignore
        alert(`Login Error: ${err.message}`);

        return;
      }

      Alert.alert(`Login Error: ${err.message}`);
    } finally {
      setSigningIn(false);
    }
  };

  if (socialProvider === AuthType.Google) {
    return <Button
      testID="btn-google"
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
      loading={signingIn}
      indicatorColor={theme.primary}
      onPress={signIn}
      text={getString('SIGN_IN_WITH_GOOGLE')}
    />;
  }

  return <Button
    testID="btn-facebook"
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
    loading={isFacebookInFlight || isGoogleInFlight || signingIn}
    indicatorColor={theme.primary}
    onPress={signIn}
    text={getString('SIGN_IN_WITH_FACEBOOK')}
  />;
};

export default SocialSignInButton;
