import React, {FC} from 'react';
import {RouteProp, useRoute} from '@react-navigation/core';

import {RootStackParamList} from '../navigations/RootStackNavigator';
import {WebView} from 'react-native-webview';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Page: FC = () => {
  const {
    params: {uri},
  } = useRoute<RouteProp<RootStackParamList, 'WebView'>>();

  return (
    <Container>
      <WebView source={{uri}} />
    </Container>
  );
};

export default Page;
