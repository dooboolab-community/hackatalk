import {Button, useTheme} from 'dooboo-ui';
import type {FC, ReactChildren} from 'react';

import {IC_ERROR} from '../../utils/Icons';
import React from 'react';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.bg.basic};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  margin-bottom: 60px;
`;

const StyledImage = styled.Image`
  width: 116px;
  height: 110px;
`;

const Title = styled.Text`
  margin-top: 16px;
  margin-bottom: 2px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: ${({theme}) => theme.role.danger};
`;

const Body = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.25px;
  color: ${({theme}) => theme.text.basic};
`;

interface Props {
  children?: ReactChildren;
  title?: string;
  body?: string;
  onButtonPressed?: () => void;
  buttonText?: string;
  hideButton?: boolean;
  testID?: string;
}

const ErrorView: FC<Props> = (props) => {
  const {
    onButtonPressed,
    title = getString('ERROR_OCCURED'),
    body = '',
    buttonText = getString('TRY_AGAIN'),
    hideButton,
    testID,
  } = props;

  const {theme} = useTheme();

  return (
    <Container>
      <StyledImage source={IC_ERROR} />
      <Title>{title}</Title>
      <Body>{body}</Body>
      {!hideButton ? (
        <Button
          testID={testID}
          onPress={onButtonPressed}
          text={buttonText}
          style={{
            marginTop: 44,
          }}
          styles={{
            container: {
              width: 156,
              height: 48,
              justifyContent: 'center',
              backgroundColor: theme.role.primary,
              flexDirection: 'row',
            },
            text: {
              color: theme.primaryLight,
              fontSize: 14,
              fontWeight: 'bold',
            },
          }}
        />
      ) : null}
    </Container>
  );
};

export default ErrorView;
