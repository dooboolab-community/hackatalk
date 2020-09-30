import { Alert, EmitterSubscription, Keyboard, KeyboardEvent, Platform, SafeAreaView } from 'react-native';
import { Button, EditText } from 'dooboo-ui';
import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import Constants from 'expo-constants';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { getString } from '../../../STRINGS';
import { isIPhoneX } from '../../utils/Styles';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

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

  const navigateBack = (): void => navigation.goBack();

  const handleChangePasswordPress = async (): Promise<void> => {
    if (newPw !== confirmPw) {
      Alert.alert(getString('ERROR'), getString('PASSWORD_MUST_MATCH'));

      return;
    }

    const variables = {
      currentPassword: currentPw,
      newPassword: newPw,
    };

    // try {
    //   const result = await changePassword({ variables });
    //   if (result.data?.changeEmailPassword) {
    //     Keyboard.dismiss();
    //     Alert.alert('', getString('PASSWORD_IS_CHANGED'), [
    //       {
    //         text: getString('OK'),
    //         onPress: navigateBack,
    //       },
    //     ]);
    //   }
    // } catch (e) {
    //   Alert.alert('', getString('CHANGE_PASSWORD_HAS_FAILED'), [
    //     {
    //       text: getString('OK'),
    //       onPress: navigateBack,
    //     },
    //   ]);
    // }
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
        keyboardVerticalOffset={isIPhoneX()
          ? Constants.statusBarHeight + 52
          : Constants.statusBarHeight}
        behavior={Platform.select({
          ios: 'padding',
          default: undefined,
        })}
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
          onPress={handleChangePasswordPress}
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
