import { DefaultNavigationProps, DefaultRouteProps } from '../../types';

import React from 'react';
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
  navigation: DefaultNavigationProps;
  route: DefaultRouteProps;
}

function Page(props: Props): React.ReactElement {
  const { uri } = props.route.params;

  return (
    <Container>
      <WebView source={{ uri }} />
    </Container>
  );
}

export default Page;
