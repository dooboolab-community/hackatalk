import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {Button, EditText, useTheme} from 'dooboo-ui';
import {IC_CAMERA, IC_PROFILE} from '../../utils/Icons';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  UploadSingleUploadMutation,
  UploadSingleUploadMutationResponse,
} from '../../__generated__/UploadSingleUploadMutation.graphql';
import {fetchQuery, useMutation, useRelayEnvironment} from 'react-relay';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
} from '../../utils/ImagePicker';
import {meQuery, profileUpdate} from '../../relay/queries/User';

import {ImagePickerResult} from 'expo-image-picker';
import {ReactNativeFile} from 'apollo-upload-client';
import type {UserMeQuery} from '../../__generated__/UserMeQuery.graphql';
import type {UserUpdateProfileMutation} from '../../__generated__/UserUpdateProfileMutation.graphql';
import {getString} from '../../../STRINGS';
import {resizePhotoToMaxDimensionsAndCompressAsPNG} from '../../utils/image';
import {showAlertForError} from '../../utils/common';
import {singleUpload} from '../../relay/queries/Upload';
import styled from '@emotion/native';
// import {uploadImageAsync} from '../../apis/upload';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useAuthContext} from '../../providers/AuthProvider';

const BUTTON_INDEX_LAUNCH_CAMERA = 0;
const BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY = 1;
const BUTTON_INDEX_CANCEL = 2;

const DEFAULT = {
  PROFILEIMAGE_WIDTH: 1280,
  PROFILEIMAGE_HEIGHT: 1280,
};

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

const Screen: FC = () => {
  const {theme} = useTheme();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const {showActionSheetWithOptions} = useActionSheet();
  const [profilePath, setProfilePath] = useState('');
  const environment = useRelayEnvironment();
  const envrionmentProps = useRef(environment);

  const {
    state: {user},
  } = useAuthContext();

  const [
    commitUpload,
    isUploadInFlight,
  ] = useMutation<UploadSingleUploadMutation>(singleUpload);

  const [
    commitProfileUpdate,
    isUpdating,
  ] = useMutation<UserUpdateProfileMutation>(profileUpdate);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchQuery<UserMeQuery>(envrionmentProps.current, meQuery, {}).subscribe({
      next: (data) => {
        if (data.me) {
          const {
            name: myName,
            nickname: nickName,
            statusMessage: statusMsg,
            photoURL,
            thumbURL,
          } = data.me;

          setName(myName ?? '');
          setNickname(nickName ?? '');
          setstatusMessage(statusMsg ?? '');
          setProfilePath((thumbURL || photoURL) ?? '');
        }
      },
    });
  }, []);

  const changeText = (type: string, text: string): void => {
    switch (type) {
      case 'NICKNAME':
        setNickname(text);
        break;
      case 'NAME':
        setName(text);
        break;
      case 'STATUS_MSG':
      default:
        setstatusMessage(text);
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
              width: DEFAULT.PROFILEIMAGE_WIDTH,
              height: DEFAULT.PROFILEIMAGE_HEIGHT,
            },
          );

          const fileName = resizedImage.uri.split('/').pop() || '';
          const fileTypeMatch = /\.(\w+)$/.exec(fileName);

          const fileType = fileTypeMatch
            ? `image/${fileTypeMatch[1]}`
            : 'image';

          const file = new ReactNativeFile({
            uri: resizedImage.uri,
            name: `${user?.id || fileName}.${fileType}`,
            type: fileType,
          });

          commitUpload({
            variables: {
              file: null,
              dir: 'profiles',
            },
            uploadables: {
              file,
            },
            onCompleted: (response: UploadSingleUploadMutationResponse) => {
              const url = response.singleUpload;

              if (url) setProfilePath(url);

              setIsUploading(false);
            },
            onError: (err) => {
              Alert.alert(getString('ERROR'), err.message);
            },
          });
        } catch (err) {
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
      async (buttonIndex: number) => {
        if (buttonIndex === BUTTON_INDEX_LAUNCH_CAMERA) {
          const image = await launchCameraAsync();

          processImageUpload(image);

          return;
        }

        if (buttonIndex === BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY) {
          const image = await launchImageLibraryAsync();

          processImageUpload(image);
        }
      },
    );
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
      },
      onError: (error: Error): void => {
        showAlertForError(error);
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
        }}>
        <Wrapper>
          <TouchableOpacity
            testID="button-user-icon"
            activeOpacity={0.5}
            onPress={pressProfileImage}>
            {!profilePath ? (
              <View
                style={{
                  width: 90,
                  height: 90,
                }}>
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
            styles={{
              container: {
                borderColor: theme.text,
              },
              input: {
                color: theme.text,
              },
            }}
            labelText={getString('NICKNAME')}
            placeholder={getString('NICKNAME_HINT')}
            value={nickname}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void => changeText('NICKNAME', text)}
          />
          <EditText
            testID="input-name"
            style={{marginTop: 32}}
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
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void => changeText('NAME', text)}
          />
          <EditText
            testID="input-status"
            type="column"
            style={{marginTop: 36}}
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
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void =>
              changeText('STATUS_MSG', text)
            }
            textInputProps={{
              multiline: true,
            }}
          />
          <StyledButtonWrapper>
            <Button
              testID="button-update"
              style={{alignSelf: 'stretch', flex: 1}}
              styles={{
                container: {
                  height: 44,
                  backgroundColor: theme.btnPrimary,
                  borderColor: theme.btnPrimary,
                  borderWidth: 1,
                },
                text: {
                  color: theme.btnPrimaryFont,
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

export default Screen;
