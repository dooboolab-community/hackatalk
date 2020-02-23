import * as AppleAuthentication from 'expo-apple-authentication';
import * as Device from 'expo-device';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';

import { AuthPayload, User } from '../../../types';
import { MUTATION_SIGN_IN, SignInEmailInput } from '../../../graphql/mutations';
import { ReactElement, useEffect, useState } from 'react';
import { ThemeType, useThemeContext } from '@dooboo-ui/native-theme';
import { showAlertForGrpahqlError, validateEmail } from '../../../utils/common';

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthStackNavigationProps } from '../../navigation/AuthStackNavigator';
import Config from 'react-native-config';
import Constants from 'expo-constants';
import { DefaultTheme } from 'styled-components';
import { getString } from '../../../../STRINGS';
import renderMobile from './mobile';
import renderTablet from './tablet';
import { useAuthContext } from '../../../providers/AuthProvider';
import { useDeviceContext } from '../../../providers/DeviceProvider';
import { useMutation } from '@apollo/react-hooks';

const {
  iOSClientId,
} = Config;

interface Props {
  navigation: AuthStackNavigationProps<'SignIn'>;
}

export interface Variables {
  navigation: AuthStackNavigationProps<'SignIn'>;
  setUser: (user: User | undefined) => void;
  isLoggingIn: boolean;
  setIsLoggingIn: (val: boolean) => void;
  signingInFacebook: boolean;
  setSigningInFacebook: (val: boolean) => void;
  signingInGoogle: boolean;
  setSigningInGoogle: (val: boolean) => void;
  googleUser: User | null | unknown;
  setGoogleUser: (val: User | null | unknown) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  errorEmail: string;
  setErrorEmail: (val: string) => void;
  errorPassword: string;
  setErrorPassword: (val: string) => void;
  themeType: ThemeType;
  theme: DefaultTheme;
  changeThemeType: () => void;
  goToSignUp: () => void;
  goToFindPw: () => void;
  signIn: () => Promise<void>;
  goToWebView: (uri: string) => void;
  googleSignInAsync: () => Promise<void>;
  facebookLogin: () => Promise<void>;
  appleLogin: () => Promise<void>;
}

function SignIn(props: Props): ReactElement {
  const { navigation } = props;
  const { setUser } = useAuthContext();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [signingInFacebook, setSigningInFacebook] = useState<boolean>(false);
  const [signingInGoogle, setSigningInGoogle] = useState<boolean>(false);
  const [googleUser, setGoogleUser] = useState<User | null | unknown>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const { theme, changeThemeType, themeType } = useThemeContext();
  const [signInEmail] = useMutation<{ signInEmail: AuthPayload }, SignInEmailInput>(MUTATION_SIGN_IN);
  const { deviceType } = useDeviceContext();

  const initAsync = async (): Promise<void> => {
    await GoogleSignIn.initAsync({
      clientId: iOSClientId,
    });
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
    setIsLoggingIn(true);
    const variables = {
      email,
      password,
    };

    try {
      const { data } = await signInEmail({ variables });
      if (data && data.signInEmail) {
        const user = data.signInEmail.user;

        if (user && !user.verified) {
          return navigation.navigate('VerifyEmail', {
            email,
          });
        }

        AsyncStorage.setItem('token', data.signInEmail.token);
        setUser(user);
      }
    } catch ({ graphQLErrors }) {
      showAlertForGrpahqlError(graphQLErrors);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const goToWebView = (uri: string): void => {
    props.navigation.navigate('WebView', { uri });
  };

  // const googleSignOutAsync = async (): Promise<void> => {
  //   await GoogleSignIn.signOutAsync();
  //   setGoogleUser(null);
  // };

  const googleSignInAsync = async (): Promise<void> => {
    setSigningInGoogle(true);
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        setGoogleUser(user);
        Alert.alert('login:' + JSON.stringify(user));
        signIn();
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

  const variables: Variables = {
    navigation,
    setUser,
    isLoggingIn,
    setIsLoggingIn,
    signingInFacebook,
    setSigningInFacebook,
    signingInGoogle,
    setSigningInGoogle,
    googleUser,
    setGoogleUser,
    email,
    setEmail,
    password,
    setPassword,
    errorEmail,
    setErrorEmail,
    errorPassword,
    setErrorPassword,
    theme,
    changeThemeType,
    themeType,
    goToSignUp,
    goToFindPw,
    goToWebView,
    signIn,
    googleSignInAsync,
    facebookLogin,
    appleLogin,
  };

  if (Device.DeviceType.PHONE === deviceType) {
    return renderMobile(variables);
  }
  return renderTablet(variables);
}

export default SignIn;
