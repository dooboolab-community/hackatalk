import '@expo/match-media';

import React from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
  children: React.ReactElement | null
};

export type MediaQueryType = {
  desktop: boolean,
  tablet: boolean,
  mobile: boolean,
}

export const useMedia = (): MediaQueryType => {
  const isDesktop = useMediaQuery({
    minWidth: 1224
  });
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1223,
  });
  const isMobile = useMediaQuery({
    minWidth: 0,
    maxWidth: 767,
  });
  return {
    desktop: isDesktop,
    tablet: isTablet,
    mobile: isMobile,
  };
};
