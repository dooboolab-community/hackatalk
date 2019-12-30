import { DefaultNavigationProps, StackParamList } from '../../types';
import React, { ReactElement } from 'react';

import { RouteProp } from '@react-navigation/core';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: DefaultNavigationProps<'WebView'>;
  route: RouteProp<StackParamList, 'WebView'>;
}

function Page(props: Props): ReactElement {
  const { route: { params: { uri } } } = props;

  return (
    <Container>
      <WebView source={{ uri }} />
    </Container>
  );
}

export default Page;
