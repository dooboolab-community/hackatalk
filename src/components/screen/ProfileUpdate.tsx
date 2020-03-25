import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { Button, EditText } from '@dooboo-ui/native';
import { IC_CAMERA, IC_PROFILE } from '../../utils/Icons';
import React, { useEffect, useState } from 'react';
import { launchCameraAsync, launchImageLibraryAsync } from '../../utils/ImagePicker';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

import { EditTextInputType } from '@dooboo-ui/native/lib/EditText';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { encryptMessage } from '../../utils/virgil';
import { getString } from '../../../STRINGS';
import { resizeImage } from '../../utils/image';
import styled from 'styled-components/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useThemeContext } from '@dooboo-ui/native-theme';

const BUTTON_INDEX_LAUNCH_CAMERA = 0;
const BUTTON_INDEX_LAUNCH_IMAGE_LIBLARY = 1;
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

interface Props {
  navigation: MainStackNavigationProps<'ProfileUpdate'>;
}

function Screen(props: Props): React.ReactElement {
  const { navigation } = props;
  const { theme } = useThemeContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const { showActionSheetWithOptions } = useActionSheet();
  const [profilePath, setProfilePath] = useState('');

  useEffect(() => {
    if (isUpdating) {
      try {
        if (navigation) {
          navigation.goBack();
        }
      } catch (err) {
        // console.error(err);
      } finally {
        setIsUpdating(false);
      }
    }
  }, [isUpdating]);

  const updateProfile = async (): Promise<void> => {
    setIsUpdating(true);
  };

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

  const uploadImage = async (uri: string): Promise<string> => {
    const fileName = uri.split('/').pop() || '';
    const fileTypeMatch = /\.(\w+)$/.exec(fileName);
    const fileType = fileTypeMatch ? `image/${fileTypeMatch[1]}` : 'image';
    const data: FormData = new FormData();
    const token = await AsyncStorage.getItem('token');
    data.append('profile', {
      uri: uri,
      type: fileType,
      name: fileName,
    });

    const fetchInitOption = {
      method: 'POST',
      body: {
        inputFile: data,
        dir: 'profiles',
      },
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return fetch(`${Config.ROOT_URL}/upload_single`, fetchInitOption)
      .then((res: Response) => res.url)
      .catch(() => {
        Alert.alert(getString('ERROR'), getString('ERROR_OCCURED'));
        return '';
      });
  };

  const pressProfileImage = async (): Promise<void> => {
    const options = [
      getString('TAKE_A_PICTURE'),
      getString('SELSCT_FROM_ALBUM'),
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
            const imageURL = await uploadImage(resizedImage.uri);

            setProfilePath(imageURL);
          }
          return;
        }

        if (buttonIndex === BUTTON_INDEX_LAUNCH_IMAGE_LIBLARY) {
          const image = await launchImageLibraryAsync();
          if (image && !image.cancelled) {
            const resizedImage = await resizeImage({
              imageUri: image.uri,
              maxWidth: DEFAULT.PROFILEIMAGE_WIDTH,
              maxHeight: DEFAULT.PROFILEIMAGE_HEIGHT,
            });
            const imageURL = await uploadImage(resizedImage.uri);

            setProfilePath(imageURL);
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
                <Image width={80} height={80} source={IC_PROFILE} />
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
            type={EditTextInputType.DEFAULT}
            style={{ marginTop: 32 }}
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
            type={EditTextInputType.DEFAULT}
            style={{ marginTop: 32 }}
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
            type={EditTextInputType.DEFAULT}
            testID="input-status"
            style={{ marginTop: 24 }}
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
              isLoading={isUpdating}
              onPress={updateProfile}
              text={getString('UPDATE')}
            />
          </StyledButtonWrapper>
        </Wrapper>
      </StyledScrollView>
    </Container>
  );
}

export default Screen;
