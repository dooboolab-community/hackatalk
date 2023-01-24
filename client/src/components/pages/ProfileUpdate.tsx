import {Alert, Image, Platform, TouchableOpacity, View} from 'react-native';
import {
  BUTTON_INDEX_CANCEL,
  BUTTON_INDEX_LAUNCH_CAMERA,
  BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY,
  PROFILEIMAGE_HEIGHT as PROFILE_IMAGE_HEIGHT,
  PROFILEIMAGE_WIDTH as PROFILE_IMAGE_WIDTH,
} from '../../utils/const';
import {Button, EditText, useTheme} from 'dooboo-ui';
import {IC_CAMERA, IC_PROFILE} from '../../utils/Icons';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {
  UploadSingleUploadMutation,
  UploadSingleUploadMutation$data,
} from '../../__generated__/UploadSingleUploadMutation.graphql';
import {fetchQuery, useMutation, useRelayEnvironment} from 'react-relay';
import {
  launchCameraAsync,
  launchMediaLibraryAsync,
} from '../../utils/ImagePicker';
import {meQuery, profileUpdate} from '../../relay/queries/User';
import styled, {css} from '@emotion/native';

import type {FC} from 'react';
import type {ImagePickerResult} from 'expo-image-picker';
import {ReactNativeFile} from 'apollo-upload-client';
import type {Uploadable} from 'relay-runtime';
import type {UserMeQuery} from '../../__generated__/UserMeQuery.graphql';
import type {UserUpdateProfileMutation} from '../../__generated__/UserUpdateProfileMutation.graphql';
import {getString} from '../../../STRINGS';
import {normalizeErrorString} from '../../relay/util';
import {resizePhotoToMaxDimensionsAndCompressAsPNG} from '../../utils/image';
import {showAlertForError} from '../../utils/common';
import {singleUpload} from '../../relay/queries/Upload';
import {uploadSingleAsync} from '../../apis/upload';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useAuthContext} from '../../providers/AuthProvider';
import {useSnackbarContext} from '../../providers/SnackbarProvider';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bg.basic};
  flex-direction: column;
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  align-self: stretch;
`;

const Wrapper = styled.View`
  margin-top: 48px;
  width: 84%;
  flex-direction: column;
  align-items: center;
`;

const StyledButtonWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  height: 60px;
  margin-top: 48px;
  margin-bottom: 48px;
`;

const ProfileImage = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;

const ProfileUpdate: FC = () => {
  const {theme} = useTheme();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [organization, setOrganization] = useState('');
  const [about, setAbout] = useState('');
  const [projects, setProjects] = useState('');
  const [positions, setPositions] = useState('');
  const [speakings, setSpeakings] = useState('');
  const [contributions, setContributions] = useState('');

  const {showActionSheetWithOptions} = useActionSheet();
  const [profilePath, setProfilePath] = useState('');
  const environment = useRelayEnvironment();
  const environmentProps = useRef(environment);
  const snackbar = useSnackbarContext();
  const {user} = useAuthContext();

  const [commitUpload, isUploadInFlight] =
    useMutation<UploadSingleUploadMutation>(singleUpload);

  const [commitProfileUpdate, isUpdating] =
    useMutation<UserUpdateProfileMutation>(profileUpdate);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchQuery<UserMeQuery>(environmentProps.current, meQuery, {}).subscribe({
      next: (data) => {
        if (data.me) {
          const {
            name: myName,
            nickname: nickName,
            statusMessage: statusMsg,
            photoURL,
            thumbURL,
            profile,
          } = data.me;

          setName(myName ?? '');
          setNickname(nickName ?? '');
          setStatusMessage(statusMsg ?? '');
          setProfilePath((thumbURL || photoURL) ?? '');

          if (profile) {
            setOrganization(profile.organization ?? '');
            setAbout(profile.about ?? '');
            setProjects(profile.projects ?? '');
            setPositions(profile.positions ?? '');
            setSpeakings(profile.speakings ?? '');
            setContributions(profile.contributions ?? '');
          }
        }
      },
    });
  }, []);

  type InputType =
    | 'NICKNAME'
    | 'NAME'
    | 'EMAIL'
    | 'STATUS_MSG'
    | 'ORGANIZATION'
    | 'ABOUT'
    | 'PROJECTS'
    | 'POSITIONS'
    | 'SPEAKINGS'
    | 'CONTRIBUTIONS';

  const changeText = (type: InputType, text: string): void => {
    switch (type) {
      case 'NICKNAME':
        setNickname(text);
        break;
      case 'NAME':
        setName(text);
        break;
      case 'STATUS_MSG':
        setStatusMessage(text);
        break;
      case 'ORGANIZATION':
        setOrganization(text);
        break;
      case 'ABOUT':
        setAbout(text);
        break;
      case 'PROJECTS':
        setProjects(text);
        break;
      case 'POSITIONS':
        setPositions(text);
        break;
      case 'SPEAKINGS':
        setSpeakings(text);
        break;
      case 'CONTRIBUTIONS':
        setContributions(text);
        break;
    }
  };

  const processImageUpload = useCallback(
    async (image: ImagePickerResult | null): Promise<void> => {
      if (image && !image.cancelled) {
        setIsUploading(true);

        try {
          const resizedImage = await resizePhotoToMaxDimensionsAndCompressAsPNG(
            {
              uri: image.assets?.[0].uri || '',
              width: PROFILE_IMAGE_WIDTH,
              height: PROFILE_IMAGE_HEIGHT,
            },
          );

          const fileName = resizedImage.uri.split('/').pop() || '';
          const fileTypeMatch = /\.(\w+)$/.exec(fileName);

          const fileType = fileTypeMatch
            ? `image/${fileTypeMatch[1]}`
            : 'image';

          if (Platform.OS === 'web') {
            const response = await uploadSingleAsync(
              resizedImage.uri,
              'profiles',
              `${user?.id || fileName}`,
            );

            const {url} = JSON.parse(await response.text());

            if (!url) {
              return Alert.alert(getString('ERROR'), getString('URL_IS_NULL'));
            }

            if (url) {
              setProfilePath(url);
            }

            setIsUploading(false);

            return;
          }

          const file = new ReactNativeFile({
            uri: resizedImage.uri,
            name: `${user?.id || fileName}`,
            type: fileType,
          }) as unknown as Uploadable;

          commitUpload({
            variables: {
              file: null,
              dir: 'profiles',
            },
            uploadables: {file},
            onCompleted: (response: UploadSingleUploadMutation$data) => {
              const url = response.singleUpload;

              if (url) {
                setProfilePath(url);
              }

              setIsUploading(false);
            },
            onError: (error) => {
              showAlertForError(normalizeErrorString(error));
            },
          });
        } catch (err: any) {
          Alert.alert(getString('ERROR'), getString('FAILED_LOAD_IMAGE'));
        } finally {
          setIsUploading(false);
        }
      }
    },
    [commitUpload, user?.id],
  );

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

          processImageUpload(image);

          return;
        }

        if (buttonIndex === BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY) {
          const image = await launchMediaLibraryAsync(true);

          processImageUpload(image);
        }
      },
    );
  };

  const showUpdateProfileToast = (): void => {
    snackbar?.openSnackbar({
      content: {text: getString('UPDATE_PROFILE')},
      type: 'success',
      styles: {
        container: {
          minWidth: '85%',
          minHeight: '10%',
          marginBottom: 50,
          justifyContent: 'center',
        },
      },
    });
  };

  const updateProfile = async (): Promise<void> => {
    const mutationConfig = {
      variables: {
        user: {
          name,
          nickname,
          statusMessage,
          thumbURL: profilePath,
          photoURL: profilePath,
        },
        profile: {
          organization,
          about,
          projects,
          positions,
          speakings,
          contributions,
        },
      },
      onError: (error: any) => {
        showAlertForError(normalizeErrorString(error));
      },
      onCompleted: () => {
        showUpdateProfileToast();
      },
    };

    commitProfileUpdate(mutationConfig);
  };

  return (
    <Container>
      <StyledScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Wrapper>
          <TouchableOpacity
            testID="button-user-icon"
            activeOpacity={0.5}
            onPress={pressProfileImage}
          >
            {!profilePath ? (
              <View
                style={{
                  width: 90,
                  height: 90,
                }}
              >
                <Image style={{height: 80, width: 80}} source={IC_PROFILE} />
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
          <EditText
            testID="input-nickname"
            style={{marginTop: 32}}
            label={getString('NICKNAME')}
            placeholder={getString('NICKNAME_HINT')}
            onChangeText={(text) => changeText('NICKNAME', text)}
            value={nickname}
            colors={{focused: theme.text.basic}}
            autoCapitalize="none"
            textInputProps={{
              autoCorrect: false,
            }}
          />
          <EditText
            testID="input-name"
            style={{marginTop: 24}}
            label={getString('NAME')}
            placeholder={getString('NAME_HINT')}
            value={name}
            colors={{focused: theme.text.basic}}
            onChangeText={(text) => changeText('NAME', text)}
            autoCapitalize="none"
            textInputProps={{autoCorrect: false}}
          />
          <EditText
            testID="input-status"
            direction="column"
            style={{marginTop: 28}}
            decoration="boxed"
            styles={{
              container: {
                paddingHorizontal: 12,
                paddingTop: 16,
                paddingBottom: 8,
              },
            }}
            label={getString('STATUS_MSG')}
            placeholder={getString('STATUS_MSG_HINT')}
            value={statusMessage}
            colors={{focused: theme.text.basic}}
            onChangeText={(text) => changeText('STATUS_MSG', text)}
            multiline
            maxLength={60}
            autoCapitalize="none"
            textInputProps={{autoCorrect: false}}
          />
          <EditText
            decoration="boxed"
            style={{marginTop: 24}}
            styles={{
              container: {
                paddingHorizontal: 12,
                paddingTop: 16,
                paddingBottom: 8,
              },
            }}
            label={getString('ORGANIZATION')}
            placeholder={getString('ORGANIZATION_HINT')}
            value={organization}
            colors={{focused: theme.text.basic}}
            onChangeText={(text) => changeText('ORGANIZATION', text)}
            autoCapitalize="none"
            textInputProps={{
              autoCorrect: false,
            }}
          />
          <EditText
            direction="column"
            decoration="boxed"
            style={{marginTop: 24}}
            styles={{
              container: {
                paddingHorizontal: 12,
                paddingTop: 16,
                paddingBottom: 8,
              },
            }}
            label={getString('ABOUT_ME')}
            placeholder={getString('ABOUT_ME_HINT')}
            value={about}
            colors={{focused: theme.text.basic}}
            onChangeText={(text) => changeText('ABOUT', text)}
            multiline
            maxLength={300}
            autoCapitalize="none"
            textInputProps={{autoCorrect: false}}
          />
          <EditText
            direction="column"
            decoration="boxed"
            style={{marginTop: 24}}
            styles={{
              container: {
                paddingHorizontal: 12,
                paddingTop: 16,
                paddingBottom: 8,
              },
            }}
            label={getString('PROJECTS')}
            placeholder={getString('PROJECTS_HINT')}
            value={projects}
            colors={{focused: theme.text.basic}}
            onChangeText={(text) => changeText('PROJECTS', text)}
            multiline
            maxLength={300}
            autoCapitalize="none"
            textInputProps={{autoCorrect: false}}
          />
          <EditText
            direction="column"
            decoration="boxed"
            style={{marginTop: 24}}
            styles={{
              container: {
                paddingHorizontal: 12,
                paddingTop: 16,
                paddingBottom: 8,
              },
            }}
            label={getString('POSITIONS')}
            placeholder={getString('POSITIONS_HINT')}
            value={positions}
            colors={{focused: theme.text.basic}}
            onChangeText={(text) => changeText('POSITIONS', text)}
            multiline
            maxLength={300}
            autoCapitalize="none"
            textInputProps={{autoCorrect: false}}
          />
          <EditText
            decoration="boxed"
            style={{marginTop: 24}}
            styles={{
              container: {
                paddingHorizontal: 12,
                paddingTop: 16,
                paddingBottom: 8,
              },
            }}
            label={getString('SPEAKINGS')}
            placeholder={getString('SPEAKINGS_HINT')}
            value={speakings}
            colors={{focused: theme.text.basic}}
            onChangeText={(text) => changeText('SPEAKINGS', text)}
            multiline
            maxLength={300}
            autoCapitalize="none"
            textInputProps={{autoCorrect: false}}
          />
          <EditText
            decoration="boxed"
            style={{marginTop: 24}}
            styles={{
              container: {
                paddingHorizontal: 12,
                paddingTop: 16,
                paddingBottom: 8,
              },
            }}
            label={getString('CONTRIBUTIONS')}
            placeholder={getString('CONTRIBUTION_HINT')}
            value={contributions}
            colors={{focused: theme.text.basic}}
            onChangeText={(text) => changeText('CONTRIBUTIONS', text)}
            multiline
            maxLength={300}
            autoCapitalize="none"
            textInputProps={{autoCorrect: false}}
          />
          <StyledButtonWrapper>
            <Button
              testID="button-update"
              style={{alignSelf: 'stretch', flex: 1}}
              styles={{
                container: [
                  css`
                    height: 44px;
                    border-width: 1px;
                    border-radius: 0px;
                  `,
                  {
                    backgroundColor: theme.button.primary.bg,
                    borderColor: theme.button.primary.bg,
                  },
                ],
                text: {
                  color: theme.text.contrast,
                  fontSize: 14,
                  fontWeight: 'bold',
                },
              }}
              loading={isUploading || isUpdating || isUploadInFlight}
              onPress={updateProfile}
              text={getString('UPDATE')}
            />
          </StyledButtonWrapper>
        </Wrapper>
      </StyledScrollView>
    </Container>
  );
};

export default ProfileUpdate;
