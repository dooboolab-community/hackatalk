import React, {FC} from 'react';

import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: blue;
`;

const Page: FC = () => {
  return (
    <Container>
      <StyledText testID="my-text">dooboolab</StyledText>
    </Container>
  );
};

export default Page;
