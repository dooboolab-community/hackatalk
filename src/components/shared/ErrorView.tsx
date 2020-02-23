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
  onButtonPressed: () => void;
}

const ErrorView: FC<Props> = (props) => {
  const { children, onButtonPressed } = props;
  const { theme } = useThemeContext();

  return <Container>
    <StyledImage source={IC_ERROR}/>
    <Title>{getString('ERROR_OCCURED')}</Title>
    <Body>{children}</Body>
    <Button
      onPress={onButtonPressed}
      text={getString('TRY_AGAIN')}
      containerStyle={{
        flexDirection: 'row',
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
  </Container>;
};

export default ErrorView;
