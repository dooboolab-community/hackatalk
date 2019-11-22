import { Alert, KeyboardAvoidingView } from 'react-native';
import { DefaultTheme, ThemeProps, withTheme } from 'styled-components/native';
import { InnerContainer, ModalCloseButton, ModalHeader, ModalTitle, StyledTextInput } from '../screen/Setting/styles';
import React, { ReactElement, forwardRef, useImperativeHandle, useRef, useState } from 'react';

import Button from './Button';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import { SafeAreaView } from 'react-navigation';
import { getString } from '../../../STRINGS';
import { useThemeContext } from '../../providers/ThemeProvider';

export interface ChangPwModalRef {
  open: () => void;
  close: () => void;
}

interface Props {
  close?: () => void;
}

export function ChangePw(props: Props): ReactElement {
  const { theme } = useThemeContext();
  const [isValidCurrentPw, updateCurrentPwValid] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [validationWord, setValidationWord] = useState('');
  const close = (): void => {
    updateCurrentPwValid(false);
    props.close && props.close();
  };
  const validateCurrent = (): void => {
    try {
      if (currentPw === 'right') {
        updateCurrentPwValid(true);
      } else {
        throw Error(getString('PASSWORD_MUST_MATCH'));
      }
    } catch (err) {
      Alert.alert('', err.message);
    };
  };
  const changePassword = async (): Promise<void> => {
    if (newPw === validationWord) {
      // TODO change password api call
      Alert.alert('', 'Password changed.', [
        {
          text: getString('OK'),
          onPress: (): void => {
            close();
          },
        },
      ]);
    } else {
      Alert.alert(getString('PASSWORD_MUST_MATCH'));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <ModalHeader>
          <ModalTitle>{getString('PASSWORD_CHANGE')}</ModalTitle>
          <ModalCloseButton
            testID="closeBtn"
            onPress={close}>
            <Ionicons name="md-close" size={32} color={theme.fontColor} />
          </ModalCloseButton>
        </ModalHeader>
        {
          isValidCurrentPw
            ? <InnerContainer>
              <StyledTextInput
                key="newPwTextInput"
                testID="newPwTextInput"
                isPassword
                onTextChanged={(pw): void => setNewPw(pw)}
                txtLabel={getString('PASSWORD_NEW')} />
              <StyledTextInput
                key="validationWordTextInput"
                testID="validationWordTextInput"
                isPassword
                onTextChanged={(pw): void => setValidationWord(pw)}
                txtLabel={getString('PASSWORD_NEW_REPEAT')} />
            </InnerContainer>
            : <InnerContainer>
              <StyledTextInput
                key="currentPwTextInput"
                testID="currentPwTextInput"
                isPassword
                onTextChanged={(pw): void => setCurrentPw(pw)}
                txtLabel={getString('PASSWORD_CURRENT')} />
            </InnerContainer>
        }
        <Button
          testID="checkCurrentPwBtn"
          onPress={isValidCurrentPw ? changePassword : validateCurrent}>
          {isValidCurrentPw ? getString('CONFIRM') : getString('NEXT')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ModalWrapper = forwardRef<ChangPwModalRef, ThemeProps<DefaultTheme>>((props, ref) => {
  const modal: React.MutableRefObject<Modal | null> = useRef(null);
  const { theme } = useThemeContext();

  const open = (): void => {
    modal.current && modal.current.open();
  };

  const close = (): void => {
    modal.current && modal.current.close();
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      ref={modal}
      keyboardTopOffset={0}
      coverScreen
      backButtonClose
      style={{ backgroundColor: theme.background }}>

    </Modal>
  );
});

export default withTheme(ModalWrapper);
