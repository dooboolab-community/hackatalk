import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BUTTON_INDEX_CANCEL,
  BUTTON_INDEX_LAUNCH_CAMERA,
  BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY,
  PROFILEIMAGE_HEIGHT as PROFILE_IMAGE_HEIGHT,
  PROFILEIMAGE_WIDTH as PROFILE_IMAGE_WIDTH,
} from '../../utils/const';
import {
  Button,
  EditText,
  StatusBarBrightness,
  Typography,
  useTheme,
} from 'dooboo-ui';
import {IC_CAMERA, IC_PROFILE} from '../../utils/Icons';
import React, {
  FC,
  ReactElement,
  memo,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import {UseMutationConfig, useMutation} from 'react-relay';
import {
  launchCameraAsync,
  launchMediaLibraryAsync,
} from '../../utils/ImagePicker';
import {sendVerification, signUp} from '../../relay/queries/User';
import {
  showAlertForError,
  validateEmail,
  validatePassword,
} from '../../utils/common';

import {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import {ReactNativeFile} from 'extract-files';
import {Uploadable} from 'relay-runtime';
import {UserSignUpMutation} from '../../__generated__/UserSignUpMutation.graphql';
import {UserVerifyEmailMutation} from '../../__generated__/UserVerifyEmailMutation.graphql';
import {getString} from '../../../STRINGS';
import {normalizeErrorString} from '../../relay/util';
import {resizePhotoToMaxDimensionsAndCompressAsPNG} from '../../utils/image';
import styled from '@emotion/native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useNavigation} from '@react-navigation/core';

const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({theme}) => theme.background};
`;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
`;

const ContentsWrapper = styled.View`
  margin: 44px;
`;

const ProfileImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;

const Page: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProps<'SignUp'>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [profilePath, setProfilePath] = useState('');

  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
  const [errorName, setErrorName] = useState<string>('');

  const [commitSignUp, isInFlight] = useMutation<UserSignUpMutation>(signUp);

  const [commitSendVerification] =
    useMutation<UserVerifyEmailMutation>(sendVerification);

  const {showActionSheetWithOptions} = useActionSheet();

  const {theme} = useTheme();

  const pressProfileImage = async (): Promise<void> => {
    const options = [
      getString('TAKE_A_PICTURE'),
      getString('SELECT_FROM_ALBUM'),
      getString('CANCEL'),
    ];

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: BUTTON_INDEX_CANCEL,
      },
      async (buttonIndex?: number) => {
        if (buttonIndex === BUTTON_INDEX_LAUNCH_CAMERA) {
          const image = await launchCameraAsync();

          if (image && !image.cancelled) {
            setProfilePath(image.uri);
          }

          return;
        }

        if (buttonIndex === BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY) {
          const image = await launchMediaLibraryAsync(true);

          if (image && !image.cancelled) {
            setProfilePath(image.uri);
          }
        }
      },
    );
  };

  const requestSignUp = useCallback(async (): Promise<void> => {
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      name.length < 2 ||
      password !== confirmPassword
    ) {
      if (!validateEmail(email)) {
        setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      }

      if (!validatePassword(password)) {
        setErrorPassword(getString('PASSWORD_MIN'));
      }

      if (name.length < 2) {
        setErrorName(getString('NAME_MIN'));
      }

      if (password !== confirmPassword) {
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      }

      return;
    }

    const mutationConfig: UseMutationConfig<UserSignUpMutation> = {
      variables: {
        user: {
          email,
          password,
          name,
          statusMessage,
        },
        photoUpload: null,
      },
      onCompleted: () => {
        const sendVerificationMutationConfig = {
          variables: {email},
        };

        commitSendVerification(sendVerificationMutationConfig);

        return navigation.replace('VerifyEmail', {email});
      },
      onError: (error) => {
        showAlertForError(normalizeErrorString(error));
      },
    };

    if (profilePath) {
      const resizedImage = await resizePhotoToMaxDimensionsAndCompressAsPNG({
        uri: profilePath,
        width: PROFILE_IMAGE_WIDTH,
        height: PROFILE_IMAGE_HEIGHT,
      });

      const fileName = resizedImage.uri.split('/').pop() || '';
      const fileTypeMatch = /\.(\w+)$/.exec(fileName);

      const fileType = fileTypeMatch ? `image/${fileTypeMatch[1]}` : 'image';

      const file = new ReactNativeFile({
        uri: resizedImage.uri,
        name: `${fileName}`,
        type: fileType,
      });

      mutationConfig.uploadables = {
        photoUpload: file as unknown as Uploadable,
      };
    }

    commitSignUp(mutationConfig);
  }, [
    commitSendVerification,
    commitSignUp,
    confirmPassword,
    email,
    name,
    navigation,
    password,
    profilePath,
    statusMessage,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: memo(
        (): ReactElement => (
          <TouchableOpacity testID="touch-done" onPress={requestSignUp}>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              {isInFlight ? (
                <ActivityIndicator size="small" style={{marginRight: 4}} />
              ) : (
                <Typography.Body2
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}
                >
                  {getString('REGISTER')}
                </Typography.Body2>
              )}
            </View>
          </TouchableOpacity>
        ),
      ),
    });
  }, [isInFlight, navigation, requestSignUp]);

  const inputChangeHandlers: Record<string, (value: string) => void> = {
    emailInput: (emailStr: string): void => {
      setEmail(emailStr.trim());

      if (!validateEmail(emailStr)) {
        setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      } else {
        setErrorEmail('');
      }
    },
    passwordInput: (passwordStr: string): void => {
      setPassword(passwordStr.trim());

      if (!validatePassword(passwordStr)) {
        setErrorPassword(getString('PASSWORD_MIN'));
      } else if (confirmPassword && passwordStr !== confirmPassword) {
        setErrorPassword('');
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      } else {
        setErrorPassword('');
      }
    },
    confirmPasswordInput: (confirmPasswordStr: string): void => {
      setConfirmPassword(confirmPasswordStr.trim());

      if (password !== confirmPasswordStr) {
        setErrorConfirmPassword(getString('PASSWORD_MUST_MATCH'));
      } else {
        setErrorConfirmPassword('');
      }
    },
    nameInput: (nameStr: string): void => {
      setName(nameStr.trim());

      if (nameStr.length < 2) {
        setErrorName(getString('NAME_MIN'));
      } else {
        setErrorName('');
      }
    },
  };

  return (
    <Container>
      <StatusBarBrightness />
      <Wrapper
        behavior={Platform.select({
          ios: 'padding',
          android: 'height',
        })}
        keyboardVerticalOffset={100}
      >
        <ScrollView style={{alignSelf: 'stretch'}}>
          <ContentsWrapper>
            {Platform.OS !== 'web' && (
              <TouchableOpacity
                testID="button-user-icon"
                activeOpacity={0.5}
                style={{
                  alignSelf: 'center',
                  marginBottom: 12,
                }}
                onPress={pressProfileImage}
              >
                {!profilePath ? (
                  <View
                    style={{
                      width: 90,
                      height: 90,
                    }}
                  >
                    <Image
                      style={{height: 80, width: 80}}
                      source={IC_PROFILE}
                    />
                    <Image
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                      }}
                      source={IC_CAMERA}
                    />
                  </View>
                ) : (
                  <ProfileImage
                    testID="profile-image"
                    resizeMode="cover"
                    source={{uri: profilePath}}
                  />
                )}
              </TouchableOpacity>
            )}
            <EditText
              testID="input-email"
              styles={{
                input: {color: theme.text},
                container: {
                  borderBottomColor: theme.line,
                },
              }}
              focusColor={theme.text}
              labelText={getString('EMAIL')}
              placeholder="hello@example.com"
              value={email}
              onChangeText={inputChangeHandlers.emailInput}
              errorText={errorEmail}
              onSubmitEditing={requestSignUp}
            />
            <EditText
              testID="input-password"
              styles={{
                input: {
                  color: theme.text,
                },
                container: {
                  borderColor: theme.text,
                },
              }}
              focusColor={theme.text}
              placeholder="********"
              labelText={getString('PASSWORD')}
              value={password}
              onChangeText={inputChangeHandlers.passwordInput}
              style={{marginTop: 32}}
              errorText={errorPassword}
              onSubmitEditing={requestSignUp}
              secureTextEntry={true}
            />
            <EditText
              testID="input-confirm-password"
              styles={{
                input: {
                  color: theme.text,
                },
                container: {
                  borderBottomColor: theme.text,
                  paddingVertical: 8,
                },
              }}
              placeholder="********"
              labelText={getString('CONFIRM_PASSWORD')}
              value={confirmPassword}
              onChangeText={inputChangeHandlers.confirmPasswordInput}
              style={{marginTop: 32}}
              focusColor={theme.text}
              errorText={errorConfirmPassword}
              onSubmitEditing={requestSignUp}
              secureTextEntry={true}
            />
            <EditText
              testID="input-name"
              styles={{
                input: {
                  color: theme.text,
                },
                container: {
                  borderColor: theme.text,
                },
              }}
              labelText={getString('NAME')}
              placeholder={getString('NAME_HINT')}
              focusColor={theme.text}
              value={name}
              onChangeText={inputChangeHandlers.nameInput}
              style={{marginTop: 32}}
              errorText={errorName}
              onSubmitEditing={requestSignUp}
            />
            <EditText
              testID="input-status"
              type="column"
              styles={{
                input: {
                  marginTop: 12,
                  color: theme.text,
                },
                container: {
                  borderColor: theme.text,
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                },
              }}
              focusColor={theme.text}
              labelText={getString('STATUS')}
              placeholder={getString('STATUS_MSG_HINT')}
              value={statusMessage}
              onChangeText={(text: string): void => {
                setStatusMessage(text);
              }}
              style={{marginTop: 32}}
              onSubmitEditing={requestSignUp}
              textInputProps={{
                multiline: true,
                maxLength: 60,
              }}
            />
          </ContentsWrapper>
          {process.env.NODE_ENV === 'test' && (
            <Button
              testID="btn-sign-up"
              loading={isInFlight}
              onPress={requestSignUp}
              text={getString('REGISTER')}
            />
          )}
        </ScrollView>
      </Wrapper>
    </Container>
  );
};

export default Page;
