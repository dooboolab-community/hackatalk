import { AsyncStorage, Image, TouchableOpacity, View } from 'react-native';
import { Button, EditText } from '@dooboo-ui/native';
import { IC_CAMERA, IC_PROFILE } from '../../utils/Icons';
import React, { useEffect, useState } from 'react';
import { launchCameraAsync, launchImageLibraryAsync } from '../../utils/ImagePicker';

import { EditTextInputType } from '@dooboo-ui/native/lib/EditText';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useAuthContext } from '../../providers/AuthProvider';
import { useThemeContext } from '@dooboo-ui/native-theme';

const BUTTON_INDEX_LAUNCH_CAMERA = 0;
const BUTTON_INDEX_LAUNCH_IMAGE_LIBLARY = 1;
const BUTTON_INDEX_CANCEL = 2;

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
  margin-top: 28px;
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [nickname, setNickName] = useState('');
  const [statusMessage, setstatusMessage] = useState('');
  const { showActionSheetWithOptions } = useActionSheet();
  const [profilePath, setProfilePath] = useState('');
  const { setUser } = useAuthContext();

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

  const onLogout = (): void => {
    if (navigation) {
      AsyncStorage.removeItem('token');
      setUser(undefined);
    }
  };

  const onUpdate = (): void => {
    setIsUpdating(true);
  };

  const onChangeText = (type: string, text: string): void => {
    switch (type) {
      case 'DISPLAY_NAME':
        setNickName(text);
        break;
      case 'STATUS_MSG':
        setstatusMessage(text);
        break;
    }
  };

  const pressProfileImage = (): void => {
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
          const result = await launchCameraAsync();
          if (result && !result.cancelled) {
            setProfilePath(result.uri);
          }
          return;
        }

        if (buttonIndex === BUTTON_INDEX_LAUNCH_IMAGE_LIBLARY) {
          const result = await launchImageLibraryAsync();
          if (result && !result.cancelled) {
            setProfilePath(result.uri);
          }
        }
      },
    );
  };

  const { theme } = useThemeContext();

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
            testID="input-name"
            type={EditTextInputType.BOX}
            style={{ marginTop: 32 }}
            label={getString('NAME')}
            placeholder={getString('NAME')}
            value={nickname}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void =>
              onChangeText('DISPLAY_NAME', text)
            }
          />
          <EditText
            type={EditTextInputType.BOX}
            testID="input-status"
            style={{ marginTop: 24 }}
            label={getString('STATUS_MSG')}
            placeholder={getString('STATUS_MSG')}
            value={statusMessage}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(text: string): void =>
              onChangeText('STATUS_MSG', text)
            }
          />
          <StyledButtonWrapper>
            <Button
              testID="button-logout"
              containerStyle={{
                flex: 0.5,
              }}
              style={{
                width: '100%',
                backgroundColor: theme.btnPrimaryLight,
                borderColor: theme.btnPrimary,
                borderWidth: 1,
              }}
              textStyle={{
                color: theme.btnPrimary,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              onPress={onLogout}
              text={getString('LOGOUT')}
            />
            <View style={{ width: 8 }} />
            <Button
              testID="button-update"
              containerStyle={{
                flex: 0.5,
              }}
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
              onPress={onUpdate}
              text={getString('UPDATE')}
            />
          </StyledButtonWrapper>
        </Wrapper>
      </StyledScrollView>
    </Container>
  );
}

export default Screen;
