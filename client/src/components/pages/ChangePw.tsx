import {Alert, Keyboard, Platform, SafeAreaView} from 'react-native';
import {Button, EditText, useDooboo} from 'dooboo-ui';
import type {EmitterSubscription, KeyboardEvent} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import type {
  UserChangeEmailPasswordMutation,
  UserChangeEmailPasswordMutation$data,
} from '../../__generated__/UserChangeEmailPasswordMutation.graphql';
import styled, {css} from '@emotion/native';

import type {FC} from 'react';
import type {MainStackNavigationProps} from '../navigations/MainStackNavigator';
import {changeEmailPasswordMutation} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import {normalizeErrorString} from '../../relay/util';
import {showAlertForError} from '../../utils/common';
import {useMutation} from 'react-relay';
import {useNavigation} from '@react-navigation/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const InnerContainer = styled.View`
  padding: 0 24px;
  flex: 1;
  width: 100%;

  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
`;

const ChangePw: FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainStackNavigationProps<'ChangePw'>>();
  const {theme} = useDooboo();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const [commitChangePassword, isInFlight] =
    useMutation<UserChangeEmailPasswordMutation>(changeEmailPasswordMutation);

  const handleChangePasswordPress = async (): Promise<void> => {
    if (newPw !== confirmPw) {
      Alert.alert(getString('ERROR'), getString('PASSWORD_MUST_MATCH'));

      return;
    }

    const mutationConfig = {
      variables: {
        password: currentPw,
        newPassword: newPw,
      },
      onError: (error: Error) => {
        showAlertForError(normalizeErrorString(error));
      },
      onCompleted: (response: UserChangeEmailPasswordMutation$data) => {
        const resultBool = response.changeEmailPassword;

        if (resultBool) {
          Alert.alert(getString('SUCCESS'), getString('PASSWORD_IS_CHANGED'));
          navigation.goBack();

          return;
        }

        Alert.alert(
          getString('FAILED'),
          getString('CHANGE_PASSWORD_HAS_FAILED'),
        );
      },
    };

    commitChangePassword(mutationConfig);
  };

  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const onKeyboardShow = (event: KeyboardEvent): void =>
    setKeyboardOffset(event.endCoordinates.height);

  const onKeyboardHide = (): void => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef<EmitterSubscription>();
  const keyboardDidHideListener = useRef<EmitterSubscription>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard?.addListener(
      'keyboardWillShow',
      onKeyboardShow,
    );

    keyboardDidHideListener.current = Keyboard?.addListener(
      'keyboardWillHide',
      onKeyboardHide,
    );

    return (): void => {
      keyboardDidShowListener.current &&
        keyboardDidShowListener.current.remove();

      keyboardDidHideListener.current &&
        keyboardDidHideListener.current.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: keyboardOffset,
      }}
    >
      <StyledKeyboardAvoidingView
        keyboardVerticalOffset={insets.top + insets.bottom}
        behavior={Platform.select({
          ios: 'padding',
          default: undefined,
        })}
      >
        <InnerContainer>
          <EditText
            key="input-pw"
            testID="input-pw"
            styles={{
              input: {fontSize: 16},
            }}
            colors={{focused: theme.text.basic}}
            style={{marginTop: 40}}
            secureTextEntry
            label={getString('PASSWORD_CURRENT')}
            onChangeText={(pw: string) => setCurrentPw(pw)}
            value={currentPw}
            placeholder="******"
          />
          <EditText
            key="new-pw-input"
            testID="new-pw-input"
            style={{marginTop: 20}}
            secureTextEntry
            styles={{input: {fontSize: 16}}}
            colors={{focused: theme.text.basic}}
            onChangeText={(pw: string) => setNewPw(pw)}
            label={getString('PASSWORD_NEW')}
            value={newPw}
            placeholder="******"
          />
          <EditText
            key="input-validation"
            testID="input-validation"
            style={{marginTop: 20}}
            secureTextEntry
            styles={{
              input: {color: theme.text.basic, fontSize: 16},
            }}
            colors={{focused: theme.text.basic}}
            onChangeText={(pw: string): void => setConfirmPw(pw)}
            label={getString('PASSWORD_NEW_REPEAT')}
            value={confirmPw}
            placeholder="******"
          />
        </InnerContainer>
        <Button
          testID="close-current-pw-btn"
          onPress={handleChangePasswordPress}
          style={{marginBottom: 24, alignSelf: 'stretch', marginHorizontal: 24}}
          styles={{
            container: [
              css`
                height: 44px;
                border-radius: 0px;
              `,
              {backgroundColor: theme.button.primary.bg},
            ],
            text: {
              color: theme.button.primary.text,
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 'bold',
            },
            hovered: {
              borderColor: theme.text.basic,
            },
          }}
          loading={isInFlight}
          text={getString('UPDATE')}
        />
      </StyledKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePw;
