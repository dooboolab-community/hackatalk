import React, { FC } from 'react';

import { RootStackNavigationProps, RootStackParamList } from '../navigation/RootStackNavigator';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/core';

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

interface Props {
  navigation: RootStackNavigationProps<'ImageSliderModal'>;
  route: RouteProp<RootStackParamList, 'ImageSliderModal'>;
}

const ImageSlider: FC<Props> = ({
  navigation,
  route: {
    params: { imageURIs, initialIndex }
  }
}) => {
  console.log(imageURIs);
  console.log(initialIndex);
  return (
    <Container>
      <StyledText testID="myText">dooboolab</StyledText>
    </Container>
  );
};

export default ImageSlider;
