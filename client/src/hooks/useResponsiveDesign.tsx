import '@expo/match-media'; // For polyfill side-effect.

import {useMediaQuery} from 'react-responsive';

export type Media = 'mobile' | 'tablet' | 'desktop';

/**
 * React hook that returns size category for responsive design.
 */
function useResponsiveDesign(): Media {
  const isMobile = useMediaQuery({
    maxWidth: 480,
  });

  const isTablet = useMediaQuery({
    maxWidth: 768,
  });

  if (isMobile) return 'mobile';

  if (isTablet) return 'tablet';

  return 'desktop';
}

export default useResponsiveDesign;
