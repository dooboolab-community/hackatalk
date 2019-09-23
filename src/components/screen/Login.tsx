import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import Button from '../shared/Button';
import { IC_ICON } from '../../utils/Icons';
import { ScreenProps } from '../navigation/SwitchNavigator';
import StatusBar from '../shared/StatusBar';
import TextInput from '../shared/TextInput';
import { getString } from '../../../STRINGS';

interface Props extends ThemeProps<DefaultTheme> {
  screenProps: ScreenProps;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const StyledScollView = styled.ScrollView``;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
`;

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const StyledIconWrapper = styled.View`
  position: absolute;
  top: 76px;
  left: 40px;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledIcon = styled.Image`
  width: 60px;
  height: 60px;
`;

const StyledIconText = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 20px;
  font-weight: bold;
  margin-top: 8px;
`;

const StyledInputWrapper = styled.View`
  margin-top: 260px;
  width: 78%;
  height: 300px;
  flex-direction: column;
  align-items: center;
`;

const StyledButtonWrapper = styled.View`
  align-self: stretch;
  margin-top: 20px;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTextForgotPw = styled.Text`
  font-size: 12px;
  color: ${({ theme }): string => theme.tintColor};
  text-decoration-line: underline;
`;

const StyledTextCopyright = styled.Text`
  margin-top: 80px;
  font-size: 12px;
  color: ${({ theme }): string => theme.fontSubColor};
`;

function Screen(props: Props): React.ReactElement {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  let timer: any;

  const onTextChanged = (type: string, text: string): void => {
    // prettier-ignore
    switch (type) {
    case 'EMAIL':
      setEmail(text);
      break;
    case 'PW':
      setPw(text);
      break;
    }
  };

  const goToSignUp = (): void => {
    props.navigation.navigate('SignUp');
    // props.navigation.navigate('SignUp');
  };

  const goToFindPw = (): void => {
    props.navigation.navigate('FindPw');
  };

  const onLogin = (): void => {
    setIsLoggingIn(true);
    timer = setTimeout(() => {
      setIsLoggingIn(false);
      clearTimeout(timer);
      props.navigation.navigate('Main');
    }, 1000);
  };

  const { theme } = props;
  const { changeTheme } = props.screenProps;

  return (
    <StyledSafeAreaView>
      <StyledScollView>
        <StatusBar />
        <StyledContainer>
          <StyledIconWrapper>
            <TouchableOpacity onPress={(): void => changeTheme()}>
              <StyledIcon source={IC_ICON} />
            </TouchableOpacity>
            <StyledIconText>{getString('HELLO')}.</StyledIconText>
          </StyledIconWrapper>
          <StyledInputWrapper>
            <TextInput
              testID='email_input'
              // txtLabel={ getString('EMAIL') }
              txtHint={getString('EMAIL')}
              txt={email}
              onTextChanged={(text: string): void =>
                onTextChanged('EMAIL', text)
              }
              placeholderTextColor={theme.placeholder}
            />
            <TextInput
              testID='pw_input'
              style={{ marginTop: 8 }}
              // txtLabel={ getString('EMAIL') }
              txtHint={getString('PASSWORD')}
              txt={pw}
              onTextChanged={(text: string): void => onTextChanged('PW', text)}
              isPassword={true}
              placeholderTextColor={theme.placeholder}
            />
            <StyledButtonWrapper>
              <Button
                testID='btnSignUp'
                containerStyle={{ flex: 1 }}
                onPress={goToSignUp}
                isWhite
              >
                {getString('SIGN_UP')}
              </Button>
              <View style={{ width: 8 }} />
              <Button
                testID='btnLogin'
                containerStyle={{ flex: 1 }}
                isLoading={isLoggingIn}
                onPress={onLogin}
              >
                {getString('LOGIN')}
              </Button>
            </StyledButtonWrapper>
            <View style={{ height: 16 }} />
            <TouchableOpacity
              testID='findPw'
              activeOpacity={0.5}
              onPress={goToFindPw}
            >
              <StyledTextForgotPw>{getString('FORGOT_PW')}</StyledTextForgotPw>
            </TouchableOpacity>
            <StyledTextCopyright>
              copyright by dooboolab.com
            </StyledTextCopyright>
          </StyledInputWrapper>
        </StyledContainer>
      </StyledScollView>
    </StyledSafeAreaView>
  );
}

export default withTheme(Screen);
