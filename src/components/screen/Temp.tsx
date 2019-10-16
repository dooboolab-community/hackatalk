import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import Button from '../shared/Button';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${(props): string => props.theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function Page(props: Props): React.ReactElement {
  return (
    <Container>
      <Button testID="btn" onPress={(): boolean => props.navigation.goBack()}>
        Go Back
      </Button>
    </Container>
  );
}

export default Page;
