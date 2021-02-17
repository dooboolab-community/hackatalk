import Animated, {
  block,
  clockRunning,
  cond,
  not,
  set,
  useCode,
} from 'react-native-reanimated';
import {Button, EditText, ThemeType, useTheme} from 'dooboo-ui';
import {
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IC_LOGO_D,
  IC_LOGO_W,
  SvgApple,
  SvgFacebook,
  SvgGoogle,
} from '../../../utils/Icons';
import React, {FC, ReactElement} from 'react';
import {delay, spring, useClock, useValue} from 'react-native-redash';
import styled, {css} from 'styled-components/native';

import SocialSignInButton from './SocialSignInButton';
import StatusBar from '../../UI/atoms/StatusBar';
import {User} from '../../../types/graphql';
import {getString} from '../../../../STRINGS';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background: ${({theme}) => theme.background};
`;

const Wrapper = styled.View`
  margin: 40px;
`;

const LogoWrapper = styled.View`
  margin-top: 44px;
  margin-bottom: 72px;
`;

const StyledLogoText = styled.Text`
  align-self: flex-start;
  color: ${({theme}) => theme.text};
  font-size: 20px;
  font-weight: bold;
  margin-left: 6px;
`;

const ButtonWrapper = styled.View`
  margin-top: 12px;
  height: 52px;
  width: 100%;
  flex-direction: row;
`;

const FindPwTouchOpacity = styled.TouchableOpacity`
  padding: 20px;
  margin-bottom: 44px;
  align-self: center;
`;

const FindPwText = styled.Text`
  color: ${({theme}) => theme.link};
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
  color: ${({theme}) => theme.link};
  text-decoration-line: underline;
`;

const StyledScrollView = styled.ScrollView`
  align-self: center;
  width: 100%;

  /* ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      width: 50%;
      max-width: 800;
    `} */
`;

interface Props {
  email: string;
  password: string;
  errorPassword: string;
  errorEmail: string;
  isSigningIn: boolean;
  isSigningInWithApple: boolean;
  onAppIconPressed: () => void;
  onSignInPressed: () => void;
  onSignUpPressed: () => void;
  onFindPwPressed: () => void;
  onSignInWithApplePressed: () => void;
  onUserCreated: (user?: User) => void;
  onAgreementPressed: () => void;
  onPrivacyPressed: () => void;
  onChangeEmailText: (text: string) => void;
  onChangePasswordText: (text: string) => void;
}

const SignIn: FC<Props> = ({
  email,
  errorEmail,
  password,
  errorPassword,
  isSigningIn,
  isSigningInWithApple,
  onAppIconPressed,
  onSignInPressed,
  onSignUpPressed,
  onFindPwPressed,
  onSignInWithApplePressed,
  onUserCreated,
  onAgreementPressed,
  onPrivacyPressed,
  onChangeEmailText,
  onChangePasswordText,
}): ReactElement => {
  const {theme, themeType} = useTheme();

  const logoSize = 80;
  const logoTransformAnimValue = useValue(0);
  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

  const logoInitialPosition = {
    x: (screenWidth - logoSize) * 0.5,
    y: screenHeight * 0.5 - logoSize,
  };

  const logoFinalPosition = {
    x: 30,
    y: 80,
  };

  const logoScale = logoTransformAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 1],
  });

  const logoPositionX = logoTransformAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [logoInitialPosition.x, logoFinalPosition.x],
  });

  const logoPositionY = logoTransformAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [logoInitialPosition.y, logoFinalPosition.y],
  });

  const animating = useValue<number>(0);
  const clock = useClock();

  useCode(() => block([delay(set(animating, 1), 100)]), []);

  useCode(
    () =>
      block([
        cond(animating, [
          set(
            logoTransformAnimValue,
            spring({
              clock,
              to: 1,
              from: 0,
              config: {mass: 1.5, stiffness: 36},
            }),
          ),
        ]),
        cond(not(clockRunning(clock)), set(animating, 0)),
      ]),
    [],
  );

  return (
    <Container>
      <StatusBar />

      <StyledScrollView>
        <AnimatedTouchableOpacity
          testID="theme-test"
          onPress={onAppIconPressed}
          style={{
            zIndex: 15,
            position: 'absolute',
            left: logoPositionX,
            top: logoPositionY,
            transform: [{scale: logoScale}],
          }}>
          <Image
            style={{width: logoSize, height: logoSize, resizeMode: 'cover'}}
            source={themeType === ThemeType.DARK ? IC_LOGO_D : IC_LOGO_W}
          />
        </AnimatedTouchableOpacity>
        <Wrapper>
          <LogoWrapper>
            <View style={{height: 12 + 60}} />
            <StyledLogoText>{getString('HELLO')}</StyledLogoText>
          </LogoWrapper>
          <EditText
            type="row"
            testID="input-email"
            styles={{
              container: {
                borderColor: theme.text,
              },
              input: {
                color: theme.text,
                height: 52,
              },
            }}
            style={{marginBottom: 20}}
            labelText={getString('EMAIL')}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            placeholder="hello@example.com"
            value={email}
            onChangeText={onChangeEmailText}
            errorText={errorEmail}
            onSubmitEditing={onSignInPressed}
          />
          <EditText
            testID="input-password"
            type="row"
            styles={{
              container: {
                borderColor: theme.text,
              },
              input: {
                color: theme.text,
                height: 52,
              },
            }}
            style={{marginBottom: 20}}
            labelText={getString('PASSWORD')}
            focusColor={theme.focused}
            placeholder="******"
            placeholderTextColor={theme.placeholder}
            value={password}
            onChangeText={onChangePasswordText}
            errorText={errorPassword}
            onSubmitEditing={onSignInPressed}
            secureTextEntry={true}
          />
          <ButtonWrapper>
            <Button
              testID="btn-sign-up"
              onPress={onSignUpPressed}
              style={{flex: 1}}
              styles={{
                container: {
                  backgroundColor: theme.btnPrimaryLight,
                  borderColor: theme.btnPrimary,
                  borderWidth: 1,

                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                },
                text: {
                  color: theme.btnPrimary,
                  fontSize: 14,
                  fontWeight: 'bold',
                },
                hovered: {
                  borderColor: theme.text,
                },
              }}
              text={getString('SIGN_UP')}
            />
            <View style={{width: 12}} />
            <Button
              testID="btn-sign-in"
              loading={isSigningIn}
              onPress={onSignInPressed}
              style={{
                flex: 1,
              }}
              styles={{
                container: {
                  height: 52,
                  backgroundColor: theme.primary,
                  flex: 1,
                  alignSelf: 'stretch',
                  borderWidth: 1,

                  flexDirection: 'row',
                  justifyContent: 'center',
                },
                text: {
                  color: theme.btnPrimaryFont,
                  fontSize: 14,
                  fontWeight: 'bold',
                },
                hovered: {
                  borderColor: theme.text,
                },
              }}
              text={getString('LOGIN')}
            />
          </ButtonWrapper>
          <FindPwTouchOpacity testID="btn-find-pw" onPress={onFindPwPressed}>
            <FindPwText>{getString('FORGOT_PW')}</FindPwText>
          </FindPwTouchOpacity>
          <SocialButtonWrapper>
            {Platform.select({
              ios: (
                <Button
                  testID="btn-apple"
                  style={{marginBottom: 12}}
                  styles={{
                    container: {
                      backgroundColor: theme.appleBackground,
                      borderColor: theme.appleText,
                      width: '100%',
                      height: 48,
                      borderWidth: 1,
                      borderRadius: 100,
                    },
                    text: {
                      fontWeight: '700',
                      color: theme.appleText,
                    },
                  }}
                  leftElement={
                    <View style={{marginRight: 6}}>
                      <SvgApple width={18} height={18} fill={theme.appleIcon} />
                    </View>
                  }
                  loading={isSigningInWithApple}
                  indicatorColor={theme.primary}
                  onPress={onSignInWithApplePressed}
                  text={getString('SIGN_IN_WITH_APPLE')}
                />
              ),
            })}
            <SocialSignInButton
              svgIcon={
                <SvgFacebook width={18} height={18} fill={theme.facebookIcon} />
              }
              onUserCreated={onUserCreated}
              socialProvider={'facebook'}
            />
            <SocialSignInButton
              svgIcon={
                <SvgGoogle width={20} height={20} fill={theme.googleIcon} />
              }
              onUserCreated={onUserCreated}
              socialProvider="google"
            />
          </SocialButtonWrapper>
          <StyledAgreementTextWrapper>
            <StyledAgreementText>{getString('AGREEMENT1')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-terms"
              onPress={onAgreementPressed}>
              {getString('AGREEMENT2')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT3')}</StyledAgreementText>
            <StyledAgreementLinedText
              testID="btn-privacy"
              onPress={onPrivacyPressed}>
              {getString('AGREEMENT4')}
            </StyledAgreementLinedText>
            <StyledAgreementText>{getString('AGREEMENT5')}</StyledAgreementText>
          </StyledAgreementTextWrapper>
        </Wrapper>
      </StyledScrollView>
    </Container>
  );
};

export default SignIn;
