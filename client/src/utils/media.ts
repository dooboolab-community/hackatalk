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

const isDesktop = (): boolean => useMediaQuery({ minWidth: 1224 });
const isTablet = (): boolean => useMediaQuery({ minWidth: 768 });
const isMobile = (): boolean => useMediaQuery({ minWidth: 0 });

export const getMediaQuery = (): MediaQueryType => {
  return {
    desktop: isDesktop(),
    tablet: isTablet(),
    mobile: isMobile(),
  };
};
