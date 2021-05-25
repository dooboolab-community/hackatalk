import React, {FC} from 'react';

import {LoadingIndicator} from 'dooboo-ui';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

type Props = {};

const CustomLoadingIndicator: FC<Props> = () => {
  return (
    <Container>
      <LoadingIndicator />
    </Container>
  );
};

export default CustomLoadingIndicator;
