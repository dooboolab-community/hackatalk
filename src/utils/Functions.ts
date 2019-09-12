import { Animated } from 'react-native';

export const animateRotateLoop = (spinValue, duration?: number) => {
  if (!duration) {
    duration = 2000;
  }
  /**
   * Animation for buffering image.
   * First set up animation
   * Second interpolate beginning and end values (in this case 0 and 1)
   */
  Animated.loop(
    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 1,
        duration,
        delay: 0,
      }),
      Animated.timing(spinValue, {
        toValue: 0,
        duration,
      }),
    ]),
    {
      iterations: 4,
    },
  ).start();
};
