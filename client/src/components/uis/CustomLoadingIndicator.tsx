import {Animated, Easing, ImageStyle, StyleProp, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';

import {IC_ICON} from '../../utils/Icons';

type Props = {
  style?: StyleProp<ImageStyle>;
};

const CustomLoadingIndicator: FC<Props> = ({style}) => {
  const [animation] = useState(new Animated.Value(0));
  const inputRange = [0, 1];
  const outputRange = [1.7, 1.3];
  const scale = animation.interpolate({inputRange, outputRange});

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  });

  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '(0, 0, 0, 0)',

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.Image
        style={[
          {
            opacity: 0.75,
            borderRadius: 28,
            transform: [{scale}],
          },
          style,
        ]}
        source={IC_ICON}
      />
    </View>
  );
};

export default CustomLoadingIndicator;
