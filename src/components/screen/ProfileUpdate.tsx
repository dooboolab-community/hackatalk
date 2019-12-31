import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { launchCameraAsync, launchImageLibraryAsync } from '../../utils/ImagePicker';

import Button from '../shared/Button';
import { Ionicons } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import TextInput from '../shared/TextInput';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useThemeContext } from '@dooboo-ui/native-theme';

// import { CommonActions } from '@react-navigation/core';

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

const StyledBtnWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  height: 60px;
  margin-top: 20px;
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const { showActionSheetWithOptions } = useActionSheet();
  const [profilePath, setProfilePath] = useState('');

  useEffect(() => {
    if (isUpdating) {
      try {
        if (props.navigation) {
          props.navigation.goBack();
        }
      } catch (err) {
        // console.error(err);
      } finally {
        setIsUpdating(false);
      }
    }
  }, [isUpdating]);

  const onLogout = (): void => {
    if (props.navigation) {
      props.navigation.resetRoot({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      });
    }
  };

  const onUpdate = (): void => {
    setIsUpdating(true);
  };

  const onChangeText = (type: string, text: string): void => {
    switch (type) {
      case 'DISPLAY_NAME':
        setDisplayName(text);
        break;
      case 'STATUS_MSG':
        setStatusMsg(text);
        break;
    }
  };

  const onPressImg = (): void => {
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
            activeOpacity={0.5}
            onPress={onPressImg}
            testID="user_icon_button"
          >
            {!profilePath ? (
              <Ionicons
                name="ios-person"
                size={80}
                color={theme ? theme.fontColor : '#3d3d3d'}
              />
            ) : (
              <ProfileImage
                testID="profile_img"
                source={{ uri: profilePath }}
              />
            )}
          </TouchableOpacity>
          <TextInput
            testID="input_name"
            style={{ marginTop: 80 }}
            txtLabel={getString('NAME')}
            txtHint={getString('NAME')}
            txt={displayName}
            onTextChanged={(text: string): void =>
              onChangeText('DISPLAY_NAME', text)
            }
          />
          <TextInput
            testID="input_status"
            style={{ marginTop: 24 }}
            txtLabel={getString('STATUS_MSG')}
            txtHint={getString('STATUS_MSG')}
            txt={statusMsg}
            onTextChanged={(text: string): void =>
              onChangeText('STATUS_MSG', text)
            }
          />
          <StyledBtnWrapper>
            <Button
              testID="logout_btn"
              onPress={onLogout}
              isWhite
              containerStyle={{ flex: 1, flexDirection: 'row' }}
            >
              {getString('LOGOUT')}
            </Button>
            <View style={{ width: 8 }} />
            <Button
              testID="update_btn"
              isLoading={isUpdating}
              onPress={onUpdate}
              containerStyle={{ flex: 1, flexDirection: 'row' }}
            >
              {getString('UPDATE')}
            </Button>
          </StyledBtnWrapper>
        </Wrapper>
      </StyledScrollView>
    </Container>
  );
}

export default Screen;
