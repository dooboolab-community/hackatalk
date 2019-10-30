
import styled, {
  withTheme,
} from 'styled-components/native';
import { DefaultNavigationProps } from '../../types';
import React from 'react';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16;
  color: blue;
`;

interface Props {
  navigation?: DefaultNavigationProps<'Setting'>;
}

function SettingScreen(props: Props): React.ReactElement {
  return (
    <Container>
      <StyledText testID="myText">dooboolab</StyledText>
    </Container>
  );
}

export default withTheme(SettingScreen);
