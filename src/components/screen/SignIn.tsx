import { Button as DoobooButton, EditText } from '@dooboo-ui/native';
import React, { ReactElement, useState } from 'react';
import { Text, View } from 'react-native';

import Button from '../shared/Button';
import { DefaultNavigationProps } from '../../types';
import { IC_ICON } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  /* background: ${({ theme }): string => theme.background}; */
  background-color: red;
  justify-content: center;
`;

const StyledLogoWrapper = styled.View`
  margin-bottom: 100px;
`;

const StyledWrapper = styled.View`
  margin: 0 40px;
  background-color: black;
`;

const StyledButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
`;

const StyledFindPWWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

const StyledFindPWTouchOpacity = styled.TouchableOpacity`
  padding: 20px;
`;

const StyledFindPWText = styled.Text`
  color: ${({ theme }): string => theme.tintColor};
  text-decoration-line: underline;
`;

const StyledSocialButtonWrapper = styled.View`
`;

interface Props {
  navigation: DefaultNavigationProps<'default'>;
}

function Page(props: Props): ReactElement {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  let timer: number;

  const { theme } = useThemeContext();

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const goToSignUp = (): void => {
    props.navigation.navigate('SignUp');
  };

  const goToFindPw = (): void => {
    props.navigation.navigate('FindPw');
  };

  const onSignIn = (): void => {
    setIsSignIn(true);
    timer = setTimeout(() => {
      setIsSignIn(false);
      clearTimeout(timer);
      if (props.navigation) {
        props.navigation.resetRoot({
          index: 0,
          routes: [{ name: 'MainStack' }],
        });
      }
    }, 1000);
  };

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledLogoWrapper>
          <IC_ICON />
        </StyledLogoWrapper>
        <EditText
          testID="EMAIL_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          isRow={true}
          label={getString('EMAIL')}
          placeholder="hello@example.com"
          placeholderTextColor="#ADB5BD"
          value={email}
          onChangeText={(text: string): void => {
            setEmail(text);
            if (!validateEmail(text)) {
              setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
              return;
            }
            setErrorEmail('');
          }}
          errorText={errorEmail}
          onSubmitEditing={onSignIn}
        />
        <EditText
          testID="PASSWORD_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          isRow={true}
          label={getString('PASSWORD')}
          // placeholder={getString('PASSWORD_PLACEHOLDER')}
          // placeholderTextColor="#ADB5BD"
          value={password}
          onChangeText={(text: string): void => {
            if (text === '') {
              setErrorPassword(getString('PASSWORD_REQUIRED'));
              return;
            }
            setErrorPassword('');
            setPassword(text);
          }}
          style={{ marginTop: 20, marginBottom: 20 }}
          errorText={errorPassword}
          onSubmitEditing={onSignIn}
          secureTextEntry={true}
        />
        <StyledButtonWrapper>
          <Button
            testID="SIGN_UP_BUTTON"
            onPress={goToSignUp}
            containerStyle={{ flex: 1, flexDirection: 'row' }}
            isWhite
          >
            {getString('SIGN_UP')}
          </Button>
          <View style={{ width: 8 }} />
          <Button
            testID="SIGN_IN_BUTTON"
            isLoading={isSignIn}
            onPress={onSignIn}
            containerStyle={{ flex: 1, flexDirection: 'row' }}
          >
            {getString('LOGIN')}
          </Button>
        </StyledButtonWrapper>
        <StyledFindPWWrapper>
          <StyledFindPWTouchOpacity>
            <StyledFindPWText>
              {getString('FORGOT_PW')}
            </StyledFindPWText>
          </StyledFindPWTouchOpacity>
        </StyledFindPWWrapper>
        <StyledSocialButtonWrapper>
          <DoobooButton
            testID="FACEBOOK_SIGN_IN_BUTTON"
            style={[
              {
                backgroundColor: colors.facebook,
                borderColor: theme.background,
                borderRadius: 4,
                width: '100%',
              },
            ]}
            iconLeft={
              <View
                style={{
                  marginLeft: 16,
                }}
              >
                {/* <Text>123</Text> */}
                <Ionicons name="logo-facebook" size={20} color="white" />
              </View>
            }
            isLoading={false}
            indicatorColor={theme.primary}
            onClick={() => {}}
            text={getString('SIGN_IN_WITH_FACEBOOK')}
            textStyle={{ fontWeight: '700', color: 'white' }}
          />
          <View style={{ width: '100%', height: 9 }} />
          <DoobooButton
            testID="GOOGLE_SIGN_IN_BUTTON"
            style={[
              {
                backgroundColor: colors.google,
                borderColor: theme.background,
                borderRadius: 4,
                width: '100%',
              },
            ]}
            iconLeft={
              <View
                style={{
                  marginLeft: 16,
                }}
              >
                {/* <Text>123</Text> */}
                <Ionicons name="logo-google" size={20} color="white" />
              </View>
            }
            isLoading={false}
            indicatorColor={theme.primary}
            onClick={() => {}}
            text={getString('SIGN_IN_WITH_GOOGLE')}
            textStyle={{ fontWeight: '700', color: 'white' }}
          />
        </StyledSocialButtonWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default Page;
