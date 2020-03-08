import { Alert, EmitterSubscription, Keyboard, KeyboardEvent, SafeAreaView } from 'react-native';
import { Button, EditText } from '@dooboo-ui/native';
import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import Constants from 'expo-constants';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { getString } from '../../../STRINGS';
import { isIPhoneXSize } from '../../utils/Styles';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';
import { MUTATION_CHANGE_PASSWORD, MutationChangePasswordInput } from '../../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';

const InnerContainer = styled.View`
  padding: 0 24px;
  flex: 1;
  width: 100%;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
`;

export interface Props {
  navigation: MainStackNavigationProps<'ChangePw'>;
}

function ChangePw(props: Props): ReactElement {
  const { navigation } = props;
  const { theme } = useThemeContext();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const close = (): void => {
    navigation.goBack();
  };
  const [mutationChangePassword] = useMutation<{ isChanged: boolean }, MutationChangePasswordInput>(MUTATION_CHANGE_PASSWORD);

  const changePassword = async (): Promise<void> => {
    if (newPw === confirmPw) {
      const variables = {
        currentPassword: currentPw,
        newPassword: newPw,
      };
      const isChanged = await mutationChangePassword({variables});

      if(isChanged) {
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
        Alert.alert(getString('Fail to change password'));
      }
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
        <InnerContainer>
          <EditText
            key="input-pw"
            testID="input-pw"
            style={{ marginTop: 40 }}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            secureTextEntry
            onChangeText={(pw: string): void => setCurrentPw(pw)}
            label={getString('PASSWORD_CURRENT')}
            value={currentPw}
            placeholder="******"
          />
          <EditText
            key="new-pw-input"
            testID="new-pw-input"
            style={{ marginTop: 20 }}
            secureTextEntry
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(pw: string): void => setNewPw(pw)}
            label={getString('PASSWORD_NEW')}
            value={newPw}
            placeholder="******"
          />
          <EditText
            key="input-validation"
            testID="input-validation"
            style={{ marginTop: 20 }}
            secureTextEntry
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            onChangeText={(pw: string): void => setConfirmPw(pw)}
            label={getString('PASSWORD_NEW_REPEAT')}
            value={confirmPw}
            placeholder="******"
          />
        </InnerContainer>
        <Button
          testID="close-current-pw-btn"
          onPress={changePassword}
          containerStyle={{
            width: '100%',
            paddingHorizontal: 20,
          }}
          style={{
            backgroundColor: theme.btnPrimary,
            borderWidth: 0,
            height: 48,
            width: '100%',
          }}
          textStyle={{
            color: theme.btnPrimaryFont,
            fontSize: 16,
          }}
          text={getString('UPDATE')}
        />
      </StyledKeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ChangePw;
