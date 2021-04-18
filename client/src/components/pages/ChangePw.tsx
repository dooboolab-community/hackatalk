import {
  Alert,
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Button, EditText, useTheme} from 'dooboo-ui';
import React, {FC, useEffect, useRef, useState} from 'react';
import type {
  UserChangeEmailPasswordMutation,
  UserChangeEmailPasswordMutationResponse,
} from '../../__generated__/UserChangeEmailPasswordMutation.graphql';

import {MainStackNavigationProps} from '../navigations/MainStackNavigator';
import {changeEmailPasswordMutation} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import {showAlertForError} from '../../utils/common';
import styled from '@emotion/native';
import {useMutation} from 'react-relay/hooks';
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
  const {theme} = useTheme();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const [
    commitChangePassword,
    isInFlight,
  ] = useMutation<UserChangeEmailPasswordMutation>(changeEmailPasswordMutation);

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
      onError: (error: Error): void => {
        showAlertForError(error);
      },
      onCompleted: (response: UserChangeEmailPasswordMutationResponse) => {
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
        backgroundColor: theme.background,
        paddingBottom: keyboardOffset,
      }}>
      <StyledKeyboardAvoidingView
        keyboardVerticalOffset={insets.top + insets.bottom}
        behavior={Platform.select({
          ios: 'padding',
          default: undefined,
        })}>
        <InnerContainer>
          <EditText
            key="input-pw"
            testID="input-pw"
            styles={{
              container: {paddingVertical: 8},
              input: {
                color: theme.text,
                fontSize: 16,
              },
            }}
            style={{marginTop: 40}}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            secureTextEntry
            onChangeText={(pw: string): void => setCurrentPw(pw)}
            labelText={getString('PASSWORD_CURRENT')}
            value={currentPw}
            placeholder="******"
          />
          <EditText
            key="new-pw-input"
            testID="new-pw-input"
            style={{marginTop: 20}}
            secureTextEntry
            styles={{
              container: {paddingVertical: 8},
              input: {
                color: theme.text,
                fontSize: 16,
              },
            }}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(pw: string): void => setNewPw(pw)}
            labelText={getString('PASSWORD_NEW')}
            value={newPw}
            placeholder="******"
          />
          <EditText
            key="input-validation"
            testID="input-validation"
            style={{marginTop: 20}}
            secureTextEntry
            styles={{
              container: {paddingVertical: 8},
              input: {
                color: theme.text,
                fontSize: 16,
              },
            }}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(pw: string): void => setConfirmPw(pw)}
            labelText={getString('PASSWORD_NEW_REPEAT')}
            value={confirmPw}
            placeholder="******"
          />
        </InnerContainer>
        <Button
          testID="close-current-pw-btn"
          onPress={handleChangePasswordPress}
          style={{marginBottom: 24, alignSelf: 'stretch', marginHorizontal: 24}}
          styles={{
            container: {
              backgroundColor: theme.btnPrimary,
              borderWidth: 1,
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
            },
            text: {
              alignSelf: 'center',
              color: theme.contrastText,
              textAlign: 'center',
              fontSize: 16,
            },
            hovered: {
              borderColor: theme.text,
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
