import Button from '../shared/Button';
import React from 'react';

import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: any;
}

export default function Page({ navigation }: Props) {
  return (
    <Container>
      <Button
        testID='btn'
        onClick={() => navigation.goBack()}
        text={getString('GO_BACK')}
        style={{
          backgroundColor: '#333333',
        }}
      />
    </Container>
  );
}
