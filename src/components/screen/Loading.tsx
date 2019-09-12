import { Animated, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { IC_ICON } from '../../utils/Icons';
import { Text } from 'react-native-animatable';
import { animateRotateLoop } from '../../utils/Functions';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const StyledView = styled.View`
  flex: 1;
  background-color: transparent;
`;

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);
const StyledAnimatedImage = styled(AnimatedImage)`
  width: 60px;
  height: 60px;
`;

const StyledAnimatableText = styled(Text)`
  margin-top: 16px;
  font-size: 16px;
  color: ${({
    theme: {
      colors: { dodgerBlue },
    },
  }) => dodgerBlue};
`;

interface Props {}

interface State {}

function Loading(props: Props, state: State) {
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    animateRotateLoop(spinValue);
  }, []);

  return (
    <StyledView testID='loading'>
      <StyledContainer>
        <StyledAnimatedImage
          source={IC_ICON}
          style={{ transform: [{ rotate: spin }] }}
        />
        <StyledAnimatableText
          animation='fadeIn'
          iterationCount='infinite'
          direction='alternate'
        >
          {getString('LOADING')}
        </StyledAnimatableText>
      </StyledContainer>
    </StyledView>
  );
}

export default Loading;
