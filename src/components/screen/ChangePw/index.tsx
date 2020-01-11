import { Alert, EmitterSubscription, Keyboard, KeyboardEvent, SafeAreaView } from 'react-native';
import {
  CloseButton,
  Header,
  InnerContainer,
  StyledTextInput,
  Title,
} from './styles';
import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Button } from '@dooboo-ui/native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { MainStackNavigationProps } from '../../navigation/MainStackNavigator';
import { getString } from '../../../../STRINGS';
import { isIPhoneXSize } from '../../../utils/Styles';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

export interface Props {
  navigation: MainStackNavigationProps<'ChangePw'>;
}

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
`;

const ChangePwHeader = (props: Props): ReactElement => {
  const { navigation } = props;
  const { theme } = useThemeContext();
  return (
    <Header>
      <Title>{getString('PASSWORD_CHANGE')}</Title>
      <CloseButton testID="closeBtn" onPress={(): void => navigation.goBack()}>
        <Ionicons name="md-close" size={24} color={theme.fontColor} />
      </CloseButton>
    </Header>
  );
};

function ChangePw(props: Props): ReactElement {
  const { navigation } = props;
  const { theme } = useThemeContext();
  const [isValidCurrentPw, setCurrentPwValid] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [validationWord, setValidationWord] = useState('');
  const close = (): void => {
    navigation.goBack();
  };
  const validateCurrent = (): void => {
    try {
      if (currentPw === 'right') {
        setCurrentPwValid(true);
      } else {
        throw Error(getString('PASSWORD_MUST_MATCH'));
      }
    } catch (err) {
      Alert.alert('', err.message);
    }
  };
  const changePassword = async (): Promise<void> => {
    if (newPw === validationWord) {
      // TODO change password api call
      Keyboard.dismiss();
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
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event: KeyboardEvent): void => setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = (): void => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef<EmitterSubscription>();
  const keyboardDidHideListener = useRef<EmitterSubscription>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

    return (): void => {
      keyboardDidShowListener.current && keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current && keyboardDidHideListener.current.remove();
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
        keyboardVerticalOffset={isIPhoneXSize
          ? Constants.statusBarHeight + 52
          : Constants.statusBarHeight}
        behavior={'padding'}
      >
        {isValidCurrentPw ? (
          <InnerContainer>
            <StyledTextInput
              key="newPwTextInput"
              testID="newPwTextInput"
              isPassword
              onTextChanged={(pw): void => setNewPw(pw)}
              txtLabel={getString('PASSWORD_NEW')}
            />
            <StyledTextInput
              key="validationWordTextInput"
              testID="validationWordTextInput"
              isPassword
              onTextChanged={(pw): void => setValidationWord(pw)}
              txtLabel={getString('PASSWORD_NEW_REPEAT')}
            />
          </InnerContainer>
        ) : (
          <InnerContainer>
            <StyledTextInput
              key="currentPwTextInput"
              testID="currentPwTextInput"
              isPassword
              onTextChanged={(pw): void => setCurrentPw(pw)}
              txtLabel={getString('PASSWORD_CURRENT')}
            />
          </InnerContainer>
        )}
        <Button
          testID="checkCurrentPwBtn"
          onPress={isValidCurrentPw ? changePassword : validateCurrent}
          containerStyle={{
            width: '100%',
          }}
          style={{
            backgroundColor: theme.btnPrimary,
            borderWidth: 0,
            height: 56,
            width: '100%',
          }}
          textStyle={{
            color: theme.btnPrimaryFont,
            fontSize: 16,
          }}
          text={isValidCurrentPw ? getString('CONFIRM') : getString('NEXT')}
        />
      </StyledKeyboardAvoidingView>
    </SafeAreaView>
  );
}

// eslint-disable-next-line
export const ChangePwHeaderOptions = (): { header: any } => ({ header: ChangePwHeader });
export default ChangePw;
