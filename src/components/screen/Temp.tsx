import Button from '../shared/Button';
import { DefaultNavigationProps } from '../../types';
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
  navigation: DefaultNavigationProps<'Temp'>;
}

function Page(props: Props): React.ReactElement {
  return (
    <Container>
      <Button testID="btn" onPress={(): void => props.navigation.goBack()}>
        Go Back
      </Button>
    </Container>
  );
}

export default Page;
