import { Button, EditText } from 'dooboo-ui';
import { IC_CAMERA, IC_PROFILE } from '../../utils/Icons';
import { Image, TouchableOpacity, View } from 'react-native';
import type {
  ProfileUpdateSingleUploadMutation,
  ProfileUpdateSingleUploadMutationResponse,
} from '../../__generated__/ProfileUpdateSingleUploadMutation.graphql';
import React, { FC, useEffect, useState } from 'react';
import {
  fetchQuery,
  graphql,
  useMutation,
  useRelayEnvironment,
} from 'react-relay/hooks';
import { launchCameraAsync, launchImageLibraryAsync } from '../../utils/ImagePicker';

import { EditTextInputType } from 'dooboo-ui/EditText';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import type { ProfileUpdateMeQuery } from '../../__generated__/ProfileUpdateMeQuery.graphql';
import { getString } from '../../../STRINGS';
import { resizeImage } from '../../utils/image';
import styled from 'styled-components/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useThemeContext } from '@dooboo-ui/theme';

const BUTTON_INDEX_LAUNCH_CAMERA = 0;
const BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY = 1;
const BUTTON_INDEX_CANCEL = 2;
const DEFAULT = {
  PROFILEIMAGE_WIDTH: 300,
  PROFILEIMAGE_HEIGHT: 300,
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
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

declare let Blob: {
  prototype: Blob;
  new (): Blob;
  new (blobParts: Array<string>, options: Record<string, string>): Blob;
  name: string;
};

interface Props {
  navigation: MainStackNavigationProps<'ProfileUpdate'>;
}

const meQuery = graphql`
  query ProfileUpdateMeQuery {
    me {
      id
      email
      name
      nickname
      statusMessage
      verified
      profile {
        authType
      }
    }
  }
`;

const fileUpload = graphql`
    mutation ProfileUpdateSingleUploadMutation($file: Upload, $dir: String) {
    singleUpload(file: $file dir: $dir)
  }
`;

const Screen: FC<Props> = () => {
  const { theme } = useThemeContext();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const { showActionSheetWithOptions } = useActionSheet();
  const [profilePath, setProfilePath] = useState('');
  const environment = useRelayEnvironment();
  const [commitFileUpload, isInFlight] = useMutation<ProfileUpdateSingleUploadMutation>(fileUpload);

  useEffect(() => {
    fetchQuery<ProfileUpdateMeQuery>(environment, meQuery, {}).subscribe({
      next: (data) => {
        if (data.me) {
          const { name, nickname, statusMessage } = data.me;
          setName(name ?? '');
          setNickname(nickname ?? '');
          setstatusMessage(statusMessage ?? '');
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

  const uploadImage = (uri: string): void => {
    const fileName = uri.split('/').pop() || '';
    const fileTypeMatch = /\.(\w+)$/.exec(fileName);
    const fileType = fileTypeMatch ? `image/${fileTypeMatch[1]}` : 'image';
    // [file] created from the `uri` as a Blob object
    // https://github.com/jaydenseric/apollo-upload-client/#Blob
    const file = new Blob([uri], {
      type: fileType,
      endings: 'native',
    });
    // TODO: on web env there is an issue on setting the blob filename
    // @ts-ignore
    file.name = fileName;

    if (file) {
      try {
        const mutationConfig = {
          variables: {
            file: null,
            dir: 'profiles',
          },
          uploadables: { file: file },
          onCompleted: (
            response: ProfileUpdateSingleUploadMutationResponse,
          ) => {
            console.log('SUCCESS FILE UPLOAD', response);
            if (response.singleUpload) { setProfilePath(uri); }
          },
          onError: (error: Error) => {
            console.log('FAIL UPLOAD', error);
          },
        };

        commitFileUpload(mutationConfig);
      } catch (e) {
        throw Error(e);
      }
    }
  };

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
          if (image && !image.cancelled) {
            const resizedImage = await resizeImage({
              imageUri: image.uri,
              maxWidth: DEFAULT.PROFILEIMAGE_WIDTH,
              maxHeight: DEFAULT.PROFILEIMAGE_HEIGHT,
            });
            uploadImage(resizedImage.uri);
          }
          return;
        }

        if (buttonIndex === BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY) {
          const image = await launchImageLibraryAsync();
          if (image && !image.cancelled) {
            const resizedImage = await resizeImage({
              imageUri: image.uri,
              maxWidth: DEFAULT.PROFILEIMAGE_WIDTH,
              maxHeight: DEFAULT.PROFILEIMAGE_HEIGHT,
            });
            uploadImage(resizedImage.uri);
          }
        }
      },
    );
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
            {!profilePath
              ? <View style={{
                width: 90,
                height: 90,
              }}>
                <Image style={{ height: 80, width: 80 }} source={IC_PROFILE} />
                <Image style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }} source={IC_CAMERA}/>
              </View>
              : <ProfileImage
                testID="profile-image"
                source={{ uri: profilePath }}
              />
            }
          </TouchableOpacity>
          <EditText
            testID="input-nickname"
            style={{ marginTop: 32 }}
            textStyle={{ color: theme.fontColor }}
            label={getString('NICKNAME')}
            placeholder={getString('NICKNAME_HINT')}
            value={nickname}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void =>
              changeText('NICKNAME', text)
            }
          />
          <EditText
            testID="input-name"
            style={{ marginTop: 32 }}
            textStyle={{ color: theme.fontColor }}
            label={getString('NAME')}
            placeholder={getString('NAME_HINT')}
            value={name}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void =>
              changeText('NAME', text)
            }
          />
          <EditText
            testID="input-status"
            style={{ marginTop: 24 }}
            textStyle={{
              color: theme.fontColor,
            }}
            label={getString('STATUS_MSG')}
            placeholder={getString('STATUS_MSG_HINT')}
            value={statusMessage}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void =>
              changeText('STATUS_MSG', text)
            }
          />
          <StyledButtonWrapper>
            <Button
              testID="button-update"
              containerStyle={{ flex: 1 }}
              style={{
                width: '100%',
                backgroundColor: theme.btnPrimary,
                borderColor: theme.btnPrimary,
                borderWidth: 1,
              }}
              textStyle={{
                color: theme.btnPrimaryFont,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              // loading={isUpdating}
              // onPress={updateProfile}
              text={getString('UPDATE')}
            />
          </StyledButtonWrapper>
        </Wrapper>
      </StyledScrollView>
    </Container>
  );
};

export default Screen;
