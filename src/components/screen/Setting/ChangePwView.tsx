import { Alert, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import {
  DefaultTheme, withTheme,
} from 'styled-components/native';
import { InnerContainer, ModalCloseButton, ModalHeader, ModalTitle, StyledTextInput } from './styles';
import React, { useState } from 'react';

import Button from '../../shared/Button';
import { Ionicons } from '@expo/vector-icons';
import { getString } from '../../../../STRINGS';

export interface Props {
    theme: DefaultTheme;
    close(): void;
    validateCurrentPw(text: string): Promise<boolean>;
}

function ChangePwView(props: Props): React.ReactElement {
  const { theme, close, validateCurrentPw } = props;
  const [isValidCurrentPw, updateCurrentPwValid] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [validationWord, setValidationWord] = useState('');
  const checkCurrent = (): void => {
    validateCurrentPw(currentPw).then((validated) => {
      if (validated) {
        updateCurrentPwValid(true);
      } else {
        throw Error(getString('PASSWORD_MUST_MATCH'));
      }
    }).catch((err: Error) => {
      Alert.alert('', err.message);
    });
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ModalHeader>
          <ModalTitle>{getString('PASSWORD_CHANGE')}</ModalTitle>
          <ModalCloseButton
            testID="closeBtn"
            onPress={(): void | null => close()}>
            <Ionicons name="md-close" size={32} color={theme.fontColor}/>
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
                txtLabel={getString('PASSWORD_NEW')}/>
              <StyledTextInput
                key="validationWordTextInput"
                testID="validationWordTextInput"
                isPassword
                onTextChanged={(pw): void => setValidationWord(pw)}
                txtLabel={getString('PASSWORD_NEW_REPEAT')}/>
            </InnerContainer>
            : <InnerContainer>
              <StyledTextInput
                key="currentPwTextInput"
                testID="currentPwTextInput"
                isPassword
                onTextChanged={(pw): void => setCurrentPw(pw)}
                txtLabel={getString('PASSWORD_CURRENT')}/>
            </InnerContainer>
        }
        <Button
          testID="checkCurrentPwBtn"
          onPress={isValidCurrentPw ? changePassword : checkCurrent}>
          {isValidCurrentPw ? getString('CONFIRM') : getString('NEXT')}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withTheme(ChangePwView);
