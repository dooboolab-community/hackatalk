import styled, {css} from 'styled-components/native';

import Button from '../shared/Button';
import {IC_MASK} from '../../utils/Icons';
import React from 'react';
import {RootStackNavigationProps} from '../navigation/RootStackNavigator';
import {View} from 'react-native';
import {fbt} from 'fbt';
import {useTheme} from '../../providers/ThemeProvider';
import {withScreen} from '../../utils/wrapper';

const Container = styled.View`
  flex: 1;
  align-items: stretch;

  ${({theme: {isDesktop}}) =>
    isDesktop &&
    css`
      flex-direction: row;
    `}
`;

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  align-self: stretch;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  flex-direction: column;
  bottom: 40px;
  width: 85%;
  align-self: center;
`;

interface Props {
  navigation: RootStackNavigationProps<'Intro'>;
}

function Intro(props: Props): React.ReactElement {
  const {changeThemeType} = useTheme();
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);

  const onLogin = (): void => {
    setIsLoggingIn(true);

    const timer = setTimeout(() => {
      setIsLoggingIn(false);
      clearTimeout(timer);
    }, 1000);
  };

  return (
    <Container>
      <Content />
      <ButtonWrapper>
        <Button
          testID="btn-login"
          imgLeftSrc={IC_MASK}
          isLoading={isLoggingIn}
          onClick={(): void => onLogin()}
          text={fbt('Login', 'login')}
        />
        <View style={{marginTop: 8}} />
        <Button
          testID="btn-navigate"
          onClick={(): void =>
            props.navigation.navigate('Temp', {
              param: 'Go Back',
            })
          }
          text={fbt('Navigate', 'navigate')}
        />
        <View style={{marginTop: 8}} />
        <Button
          testID="btn-theme"
          onClick={(): void => changeThemeType()}
          text={fbt('Change Theme', 'change theme')}
        />
      </ButtonWrapper>
    </Container>
  );
}

export default withScreen(Intro);
