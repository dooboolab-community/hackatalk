import {Button, EditText, useTheme} from 'dooboo-ui';
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';

import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';
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

export interface Props {
  isChangingPassword: boolean;
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
  onChangePassword?: (str: string) => void;
  onChangeNewPassword?: (str: string) => void;
  onChangeConfirmPassword?: (str: string) => void;
  onChangePasswordButtonPressed?: () => void;
}

const ChangePwTemp: FC<Props> = ({
  newPasswordConfirm,
  isChangingPassword,
  newPassword,
  password,
  onChangePassword,
  onChangeNewPassword,
  onChangeConfirmPassword,
  onChangePasswordButtonPressed,
}) => {
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();

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
            onChangeText={onChangePassword}
            labelText={getString('PASSWORD_CURRENT')}
            value={password}
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
            onChangeText={onChangeNewPassword}
            labelText={getString('PASSWORD_NEW')}
            value={newPassword}
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
            onChangeText={onChangeConfirmPassword}
            labelText={getString('PASSWORD_NEW_REPEAT')}
            value={newPasswordConfirm}
            placeholder="******"
          />
        </InnerContainer>
        <Button
          testID="close-current-pw-btn"
          onPress={onChangePasswordButtonPressed}
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
          loading={isChangingPassword}
          text={getString('UPDATE')}
        />
      </StyledKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePwTemp;
