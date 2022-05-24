import {
  RootStackNavigationProps,
  RootStackParamList,
} from '../navigations/RootStackNavigator';

import {Image} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  background-color: #000;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: RootStackNavigationProps<'ImageSlider'>;
  route: RouteProp<RootStackParamList, 'ImageSlider'>;
}

function ImageSlider({
  route: {
    params: {images, initialIndex = 0},
  },
}: Props): React.ReactElement {
  return (
    <Container>
      <Image
        style={{height: '100%', width: '100%'}}
        source={{uri: images[initialIndex]?.uri as string}}
        resizeMode="contain"
      />
    </Container>
  );
}

export default ImageSlider;
