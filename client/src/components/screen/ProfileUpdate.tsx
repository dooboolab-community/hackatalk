import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {Button, EditText} from 'dooboo-ui';
import {IC_CAMERA, IC_PROFILE} from '../../utils/Icons';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  fetchQuery,
  graphql,
  useMutation,
  useRelayEnvironment,
} from 'react-relay/hooks';
import {
  launchCameraAsync,
  launchImageLibraryAsync,
} from '../../utils/ImagePicker';

import {MainStackNavigationProps} from '../navigation/MainStackNavigator';
import type {ProfileUpdateMeQuery} from '../../__generated__/ProfileUpdateMeQuery.graphql';
import type {ProfileUpdateMutation} from '../../__generated__/ProfileUpdateMutation.graphql';
import {getString} from '../../../STRINGS';
import {resizePhotoToMaxDimensionsAndCompressAsPNG} from '../../utils/image';
import {showAlertForError} from '../../utils/common';
import styled from 'styled-components/native';
import {uploadImageAsync} from '../../apis/upload';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useThemeContext} from '@dooboo-ui/theme';

const BUTTON_INDEX_LAUNCH_CAMERA = 0;
const BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY = 1;
const BUTTON_INDEX_CANCEL = 2;

const DEFAULT = {
  PROFILEIMAGE_WIDTH: 1280,
  PROFILEIMAGE_HEIGHT: 1280,
};

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}): string => theme.background};
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
      photoURL
      thumbURL
      profile {
        authType
      }
    }
  }
`;

const profileUpdate = graphql`
  mutation ProfileUpdateMutation($user: UserUpdateInput!) {
    updateProfile(user: $user) {
      name
      nickname
      statusMessage
      photoURL
    }
  }
`;

const Screen: FC<Props> = () => {
  const {theme} = useThemeContext();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const {showActionSheetWithOptions} = useActionSheet();
  const [profilePath, setProfilePath] = useState('');
  const environment = useRelayEnvironment();
  const envrionmentProps = useRef(environment);

  const [commitProfileUpdate, isUpdating] = useMutation<ProfileUpdateMutation>(
    profileUpdate,
  );

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchQuery<ProfileUpdateMeQuery>(
      envrionmentProps.current,
      meQuery,
      {},
    ).subscribe({
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
          setProfilePath(photoURL ?? thumbURL ?? '');
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

          setIsUploading(true);

          if (image && !image.cancelled)
            try {
              const resizedImage = await resizePhotoToMaxDimensionsAndCompressAsPNG(
                {
                  uri: image.uri,
                  width: DEFAULT.PROFILEIMAGE_WIDTH,
                  height: DEFAULT.PROFILEIMAGE_HEIGHT,
                },
              );

              const response = await uploadImageAsync(
                resizedImage.uri,
                'profiles',
              );

              const result = JSON.parse(await response.text());

              setIsUploading(false);

              setProfilePath(result.url);
            } catch (err) {
              Alert.alert(getString('ERROR'), getString('FAILED_LOAD_IMAGE'));
            }

          return;
        }

        if (buttonIndex === BUTTON_INDEX_LAUNCH_IMAGE_LIBRARY) {
          const image = await launchImageLibraryAsync();

          if (image && !image.cancelled)
            try {
              const resizedImage = await resizePhotoToMaxDimensionsAndCompressAsPNG(
                {
                  uri: image.uri,
                  width: DEFAULT.PROFILEIMAGE_WIDTH,
                  height: DEFAULT.PROFILEIMAGE_HEIGHT,
                },
              );

              const response = await uploadImageAsync(
                resizedImage.uri,
                'profiles',
              );

              const result = JSON.parse(await response.text());

              setProfilePath(result.url);
            } catch (err) {
              Alert.alert(getString('ERROR'), getString('FAILED_LOAD_IMAGE'));
            }
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
            textStyle={{color: theme.fontColor}}
            label={getString('NICKNAME')}
            placeholder={getString('NICKNAME_HINT')}
            value={nickname}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void => changeText('NICKNAME', text)}
          />
          <EditText
            testID="input-name"
            style={{marginTop: 32}}
            textStyle={{color: theme.fontColor}}
            label={getString('NAME')}
            placeholder={getString('NAME_HINT')}
            value={name}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void => changeText('NAME', text)}
          />
          <EditText
            testID="input-status"
            style={{marginTop: 24}}
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
              style={{width: '100%'}}
              styles={{
                container: {
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
              loading={isUploading || isUpdating}
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
