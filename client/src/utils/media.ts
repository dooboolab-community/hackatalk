import {ReactElement} from 'react';
import {useMediaQuery} from 'react-responsive';

export type MediaQueryType = {
  isTablet: boolean;
  isDesktop: boolean;
};

export const useMedia = (): MediaQueryType => {
  const isTablet = useMediaQuery({minWidth: 768});
  const isDesktop = useMediaQuery({minWidth: 992});

  return {
    isTablet,
    isDesktop,
  };
};

export const Desktop = ({children}): ReactElement => {
  const isDesktop = useMediaQuery({minWidth: 992});

  return isDesktop ? children : null;
};

export const Tablet = ({children}): ReactElement => {
  const isTablet = useMediaQuery({minWidth: 768});

  return isTablet ? children : null;
};

export const Mobile = ({children}): ReactElement => {
  const isMobile = useMediaQuery({maxWidth: 767});

  return isMobile ? children : null;
};
