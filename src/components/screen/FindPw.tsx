import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import React from 'react';
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
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

function Page(): React.ReactElement {
  return (
    <Container>
      <StyledText testID='myText'>dooboolab</StyledText>
    </Container>
  );
}

export default Page;
