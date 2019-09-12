import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import Button from '../shared/Button';
import { IC_ICON } from '../../utils/Icons';
import StatusBar from '../shared/StatusBar';
import TextInput from '../shared/TextInput';
import { getString } from '../../../STRINGS';

const StyledScollView = styled.ScrollView``;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
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
  color: ${({ theme }) => theme.colors.text};
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
  color: ${({
    theme: {
      colors: { dodgerBlue },
    },
  }) => dodgerBlue};
  text-decoration-line: underline;
`;

const StyledTextCopyright = styled.Text`
  margin-top: 80px;
  font-size: 12px;
  color: ${({
    theme: {
      colors: { cloudyBlue },
    },
  }) => cloudyBlue};
`;

interface Props extends ThemeProps<DefaultTheme> {
  navigation: any;
}

function Screen(props: Props) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  let timer: any;

  const { theme } = props;

  const onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        setEmail(text);
        break;
      case 'PW':
        setPw(text);
        break;
    }
  };

  const goToSignUp = () => {
    props.navigation.navigate('SignUp');
    // props.navigation.navigate('SignUp');
  };

  const goToFindPw = () => {
    props.navigation.navigate('FindPw');
  };

  const onLogin = () => {
    setIsLoggingIn(true);
    timer = setTimeout(() => {
      setIsLoggingIn(false);
      clearTimeout(timer);
      props.navigation.navigate('Main');
    }, 1000);
  };

  return (
    <StyledSafeAreaView>
      <StyledScollView>
        <StatusBar isDarkContent={true} />
        <StyledContainer>
          <StyledIconWrapper>
            <StyledIcon source={IC_ICON} />
            <StyledIconText>{getString('HELLO')}.</StyledIconText>
          </StyledIconWrapper>
          <StyledInputWrapper>
            <TextInput
              testID='email_input'
              // txtLabel={ getString('EMAIL') }
              txtHint={getString('EMAIL')}
              txt={email}
              onTextChanged={(text) => onTextChanged('EMAIL', text)}
              placeholderTextColor={theme.colors.text}
            />
            <TextInput
              testID='pw_input'
              style={{ marginTop: 8 }}
              // txtLabel={ getString('EMAIL') }
              txtHint={getString('PASSWORD')}
              txt={pw}
              onTextChanged={(text) => onTextChanged('PW', text)}
              isPassword={true}
              placeholderTextColor={theme.colors.text}
            />
            <StyledButtonWrapper>
              <Button
                testID='btnSignUp'
                containerStyle={{ flex: 1 }}
                onPress={() => goToSignUp()}
                isWhite
              >
                {getString('SIGN_UP')}
              </Button>
              <View style={{ width: 8 }} />
              <Button
                testID='btnLogin'
                containerStyle={{ flex: 1 }}
                isLoading={isLoggingIn}
                onPress={() => onLogin()}
              >
                {getString('LOGIN')}
              </Button>
            </StyledButtonWrapper>
            <View style={{ height: 16 }} />
            <TouchableOpacity
              testID='findPw'
              activeOpacity={0.5}
              onPress={() => goToFindPw()}
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
