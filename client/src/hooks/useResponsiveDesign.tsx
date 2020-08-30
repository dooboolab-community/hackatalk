import '@expo/match-media'; // For polyfill side-effect.

import { useMediaQuery } from 'react-responsive';

type SizeCategory = 'small' | 'medium' | 'large';

const MAX_SMALL_WIDTH = 360;
const MAX_MEDIUM_WIDTH = 768;

/**
 * React hook that returns size category for responsive design.
 */
function useResponsiveDesign(): SizeCategory {
  const isSmall = useMediaQuery({
    maxWidth: MAX_SMALL_WIDTH,
  });
  const isMedium = useMediaQuery({
    maxWidth: MAX_MEDIUM_WIDTH,
  }) && !isSmall;

  if (isSmall) {
    return 'small';
  } else if (isMedium) {
    return 'medium';
  } else {
    return 'large';
  }
}

export default useResponsiveDesign;
