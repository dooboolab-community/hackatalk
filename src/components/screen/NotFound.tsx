import React from 'react';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import styled from 'styled-components/native';

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
  navigation?: RootStackNavigationProps<'NotFound'>;
}

function Page(props: Props): React.ReactElement {
  return (
    <Container>
      <StyledText testID="myText">dooboolab</StyledText>
    </Container>
  );
}

export default Page;
