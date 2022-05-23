import {Alert, Image, Platform, TouchableOpacity, View} from 'react-native';
import {
  BUTTON_INDEX_CANCEL,
  BUTTON_INDEX_LAUNCH_CAMERA,
  BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY,
  PROFILEIMAGE_HEIGHT,
  PROFILEIMAGE_WIDTH,
} from '../../utils/const';
import {Button, EditText, useTheme} from 'dooboo-ui';
import {IC_CAMERA, IC_PROFILE} from '../../utils/Icons';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
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

import {ImagePickerResult} from 'expo-image-picker';
import {ReactNativeFile} from 'apollo-upload-client';
import {Uploadable} from 'relay-runtime';
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
  background-color: ${({theme}) => theme.background};
  flex-direction: column;
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  align-self: stretch;
`;

const Wrapper = styled.View`
  margin-top: 48px;
  width: 78%;
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
  margin-top: 36px;
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
              uri: image.uri,
              width: PROFILEIMAGE_WIDTH,
              height: PROFILEIMAGE_HEIGHT,
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
            style={{marginTop: 26}}
            labelText={getString('NICKNAME')}
            placeholder={getString('NICKNAME_HINT')}
            onChangeText={(text) => changeText('NICKNAME', text)}
            styles={{
              container: {
                borderColor: theme.text,
              },
              input: {
                color: theme.text,
              },
            }}
            value={nickname}
            focusColor={theme.text}
            textInputProps={{
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
          />
          <EditText
            testID="input-name"
            style={{marginTop: 12}}
            styles={{
              container: {
                borderColor: theme.text,
              },
              input: {
                color: theme.text,
              },
            }}
            labelText={getString('NAME')}
            placeholder={getString('NAME_HINT')}
            value={name}
            focusColor={theme.text}
            onChangeText={(text) => changeText('NAME', text)}
            textInputProps={{
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
          />
          <EditText
            testID="input-status"
            type="column"
            style={{marginTop: 18}}
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
            labelText={getString('STATUS_MSG')}
            placeholder={getString('STATUS_MSG_HINT')}
            value={statusMessage}
            focusColor={theme.text}
            onChangeText={(text) => changeText('STATUS_MSG', text)}
            textInputProps={{
              multiline: true,
              maxLength: 60,
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
          />
          <EditText
            style={{marginTop: 12}}
            styles={{
              container: {
                borderColor: theme.text,
              },
              input: {
                color: theme.text,
              },
            }}
            labelText={getString('ORGANIZATION')}
            placeholder={getString('ORGANIZATION_HINT')}
            value={organization}
            focusColor={theme.text}
            onChangeText={(text) => changeText('ORGANIZATION', text)}
            textInputProps={{
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
          />
          <EditText
            type="column"
            style={{marginTop: 18}}
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
            labelText={getString('ABOUT_ME')}
            placeholder={getString('ABOUT_ME_HINT')}
            value={about}
            focusColor={theme.text}
            onChangeText={(text) => changeText('ABOUT', text)}
            textInputProps={{
              multiline: true,
              maxLength: 300,
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
          />
          <EditText
            type="column"
            style={{marginTop: 18}}
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
            labelText={getString('PROJECTS')}
            placeholder={getString('PROJECTS_HINT')}
            value={projects}
            focusColor={theme.text}
            onChangeText={(text) => changeText('PROJECTS', text)}
            textInputProps={{
              multiline: true,
              maxLength: 300,
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
          />
          <EditText
            type="column"
            style={{marginTop: 18}}
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
            labelText={getString('POSITIONS')}
            placeholder={getString('POSITIONS_HINT')}
            value={positions}
            focusColor={theme.text}
            onChangeText={(text) => changeText('POSITIONS', text)}
            textInputProps={{
              multiline: true,
              maxLength: 300,
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
          />
          <EditText
            type="column"
            style={{marginTop: 18}}
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
            labelText={getString('SPEAKINGS')}
            placeholder={getString('SPEAKINGS_HINT')}
            value={speakings}
            focusColor={theme.text}
            onChangeText={(text) => changeText('SPEAKINGS', text)}
            textInputProps={{
              multiline: true,
              maxLength: 300,
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
          />
          <EditText
            type="column"
            style={{marginTop: 18}}
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
            labelText={getString('CONTRIBUTIONS')}
            placeholder={getString('CONTRIBUTION_HINT')}
            value={contributions}
            focusColor={theme.text}
            onChangeText={(text) => changeText('CONTRIBUTIONS', text)}
            textInputProps={{
              multiline: true,
              maxLength: 300,
              autoCorrect: false,
              autoCapitalize: 'none',
            }}
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
                    backgroundColor: theme.button,
                    borderColor: theme.button,
                  },
                ],
                text: {
                  color: theme.textContrast,
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
