import { Button, EditText } from '@dooboo-ui/native';
import { IC_LOGO_D, IC_LOGO_W, SvgApple, SvgFacebook, SvgGoogle } from '../../../utils/Icons';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { ReactElement } from 'react';

import { EditTextInputType } from '@dooboo-ui/native/lib/EditText';
import StatusBar from '../../shared/StatusBar';
import { ThemeType } from '@dooboo-ui/native-theme';
import { Variables } from './';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background: ${({ theme }): string => theme.background};
`;

const Wrapper = styled.View`
  margin: 40px;
`;

const LogoWrapper = styled.View`
  margin-top: 44px;
  margin-bottom: 72px;
`;

const StyledLogoImage = styled.Image`
  width: 60px;
  height: 60px;
`;

const StyledLogoText = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 20px;
  font-weight: bold;
  margin-left: 6px;
`;

const ButtonWrapper = styled.View`
  margin-top: 12px;
  width: 100%;
  flex-direction: row;
`;

const FindPwTouchOpacity = styled.TouchableOpacity`
  padding: 20px;
  margin-bottom: 44px;
  align-self: center;
`;

const FindPwText = styled.Text`
  color: ${({ theme }): string => theme.link};
  text-decoration-line: underline;
`;

const SocialButtonWrapper = styled.View`
  margin-bottom: 24px;
`;

const StyledAgreementTextWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 0 40px 0;
`;

const StyledAgreementText = styled.Text`
  line-height: 22px;
  color: #777;
`;

const StyledAgreementLinedText = styled.Text`
  line-height: 22px;
  color: ${({ theme }): string => theme.link};
  text-decoration-line: underline;
`;

export default function mobile(variables: Variables): ReactElement {
  const {
    isLoggingIn,
    signingInFacebook,
    signingInGoogle,
    email,
    setEmail,
    password,
    setPassword,
    errorEmail,
    setErrorEmail,
    errorPassword,
    setErrorPassword,
    theme,
    changeThemeType,
    themeType,
    goToSignUp,
    goToFindPw,
    goToWebView,
    signIn,
    googleSignInAsync,
    facebookLogin,
    appleLogin,
  } = variables;

  return (
    <Container>
      <StatusBar />
      <ScrollView style={{ alignSelf: 'stretch' }}>
        <Wrapper>
          <LogoWrapper>
            <TouchableOpacity
              testID="theme-test"
              onPress={(): void => changeThemeType()}
              style={{
                width: 60,
                height: 60,
              }}
            >
              <StyledLogoImage source={themeType === ThemeType.DARK ? IC_LOGO_D : IC_LOGO_W} />
            </TouchableOpacity>
            <View style={{ height: 12 }} />
            <StyledLogoText>{getString('HELLO')}</StyledLogoText>
          </LogoWrapper>
          <EditText
            testID="input-email"
            errorTestID="error-email"
            type={EditTextInputType.ROW}
            textStyle={{
              color: theme.fontColor,
            }}
            style={{ marginBottom: 20 }}
            isRow={true}
            label={getString('EMAIL')}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            placeholder="hello@example.com"
            value={email}
            onChangeText={(text: string): void => {
              setEmail(text);
              setErrorEmail('');
            }}
            errorText={errorEmail}
            onSubmitEditing={signIn}
          />
          <EditText
            testID="input-password"
            errorTestID="error-password"
            type={EditTextInputType.ROW}
            textStyle={{
              color: theme.fontColor,
            }}
            style={{ marginBottom: 20 }}
            isRow={true}
            label={getString('PASSWORD')}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholder="******"
            placeholderTextColor={theme.placeholder}
            value={password}
            onChangeText={(text: string): void => {
              setPassword(text);
              setErrorPassword('');
            }}
            errorText={errorPassword}
            onSubmitEditing={signIn}
            secureTextEntry={true}
          />
          <ButtonWrapper>
            <Button
              testID="btn-sign-up"
              onPress={goToSignUp}
              containerStyle={{
                flex: 1,
                flexDirection: 'row',
                height: 52,
                justifyContent: 'center',
              }}
              style={{
                width: '100%',
                backgroundColor: theme.btnPrimaryLight,
                borderColor: theme.btnPrimary,
                borderWidth: 1,
              }}
              textStyle={{
                color: theme.btnPrimary,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              text={getString('SIGN_UP')}
            />
            <View style={{ width: 20 }} />
            <Button
              testID="btn-sign-in"
              isLoading={isLoggingIn}
              onPress={signIn}
              containerStyle={{
                flex: 1,
                flexDirection: 'row',
                height: 52,
                justifyContent: 'center',
                backgroundColor: theme.btnPrimary,
              }}
              textStyle={{
                color: theme.btnPrimaryFont,
                fontSize: 14,
                fontWeight: 'bold',
              }}
              text={getString('LOGIN')}
            />
          </ButtonWrapper>
          <FindPwTouchOpacity testID="btn-find-pw" onPress={goToFindPw}>
            <FindPwText>
              {getString('FORGOT_PW')}
            </FindPwText>
          </FindPwTouchOpacity>
          <SocialButtonWrapper>
            {
              Platform.select({
                ios: <Button
                  testID="btn-apple"
                  style={{
                    backgroundColor: theme.appleBackground,
                    borderColor: theme.appleText,
                    width: '100%',
                    height: 48,
                    borderWidth: 1,
                    marginBottom: 6,
                  }}
                  leftElement={
                    <View style={{ marginRight: 6 }}>
                      <SvgApple width={24} fill={theme.appleIcon}/>
                    </View>
                  }
                  isLoading={signingInFacebook}
                  indicatorColor={theme.primary}
                  onPress={appleLogin}
                  text={getString('SIGN_IN_WITH_APPLE')}
                  textStyle={{ fontWeight: '700', color: theme.appleText }}
                />,
              })
            }
            <Button
              testID="btn-facebook"
              style={{
                backgroundColor: theme.facebookBackground,
                borderColor: theme.facebookBackground,
                borderWidth: 1,
                width: '100%',
                height: 48,
                marginBottom: 6,
              }}
              leftElement={
                <View style={{ marginRight: 6 }}>
                  <SvgFacebook width={24} fill={theme.facebookIcon}/>
                </View>
              }
              isLoading={signingInFacebook}
              indicatorColor={theme.primary}
              onPress={facebookLogin}
              text={getString('SIGN_IN_WITH_FACEBOOK')}
              textStyle={{ fontWeight: '700', color: theme.facebookText }}
            />
            <Button
              testID="btn-google"
              style={{
                backgroundColor: theme.googleBackground,
                borderColor: theme.googleBackground,
                borderWidth: 1,
                width: '100%',
                height: 48,
              }}
              leftElement={
                <View style={{ marginRight: 6 }}>
                  <SvgGoogle width={24} fill={theme.googleIcon}/>
                </View>
              }
              isLoading={signingInGoogle}
              indicatorColor={theme.primary}
              onPress={googleSignInAsync}
              text={getString('SIGN_IN_WITH_GOOGLE')}
              textStyle={{ fontWeight: '700', color: theme.googleText }}
            />
          </SocialButtonWrapper>
          <StyledAgreementTextWrapper>
            <StyledAgreementText>{getString('AGREEMENT1')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-terms"
              onPress={(): void => goToWebView('https://dooboolab.com/termsofservice')}
            >
              {getString('AGREEMENT2')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT3')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-privacy"
              onPress={(): void => goToWebView('https://dooboolab.com/privacyandpolicy')}
            >
              {getString('AGREEMENT4')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT5')}</StyledAgreementText>
          </StyledAgreementTextWrapper>
        </Wrapper>
      </ScrollView>
    </Container>
  );
}
