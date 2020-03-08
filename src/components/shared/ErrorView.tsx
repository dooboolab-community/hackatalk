import React, { FC, ReactChildren } from 'react';

import { Button } from '@dooboo-ui/native';
import { IC_ERROR } from '../../utils/Icons';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
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
  color: ${({ theme }): string => theme.errorTitle};
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
  color: ${({ theme }): string => theme.errorBody};
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
  const { theme } = useThemeContext();

  return <Container>
    <StyledImage source={IC_ERROR}/>
    <Title>{title}</Title>
    <Body>{body}</Body>
    {
      !hideButton
        ? <Button
          testID={testID}
          onPress={onButtonPressed}
          text={buttonText}
          containerStyle={{
            flexDirection: 'row',
            marginTop: 44,
            height: 52,
            justifyContent: 'center',
            backgroundColor: theme.btnPrimary,
          }}
          style={{
            width: 156,
            height: 48,
            backgroundColor: theme.btnPrimary,
          }}
          textStyle={{
            color: theme.btnPrimaryLight,
            fontSize: 14,
            fontWeight: 'bold',
          }}
        />
        : null
    }
  </Container>;
};

export default ErrorView;
