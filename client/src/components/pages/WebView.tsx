import type {FC} from 'react';
import React from 'react';
import type {RootStackParamList} from '../navigations/RootStackNavigator';
import type {RouteProp} from '@react-navigation/core';
import {WebView} from 'react-native-webview';
import styled from '@emotion/native';
import {useRoute} from '@react-navigation/core';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.bg.basic};
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
