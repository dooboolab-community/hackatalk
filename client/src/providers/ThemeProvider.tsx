import {
  Colors,
  ThemeParam,
  ThemeType,
  colors,
  createTheme,
  dark as darkTheme,
  light as lightTheme,
} from '../utils/theme';
import {
  DefaultTheme,
  ThemeProvider as OriginalThemeProvider,
} from 'styled-components/native';
import React, {useEffect, useState} from 'react';

import {Appearance} from 'react-native';
import createCtx from '../utils/createCtx';
import {useMediaQuery} from 'react-responsive';

interface Context {
  themeType: ThemeType;
  media: {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
  };
  theme: DefaultTheme;
  changeThemeType: () => void;
  colors: Colors;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
  // Using initial ThemeType is essential while testing apps with consistent ThemeType
  initialThemeType?: ThemeType;
  customTheme?: ThemeParam;
}

function ThemeProvider({
  children,
  initialThemeType,
  customTheme,
}: Props): React.ReactElement {
  const isMobile = useMediaQuery({maxWidth: 767});
  const isTablet = useMediaQuery({minWidth: 767, maxWidth: 992});
  const isDesktop = useMediaQuery({minWidth: 992});

  const scheme = Appearance.getColorScheme();
  const isDarkMode = scheme === 'dark';
  const defaultThemeType = isDarkMode ? ThemeType.DARK : ThemeType.LIGHT;

  const [themeType, setThemeType] = useState(
    initialThemeType || defaultThemeType,
  );

  useEffect(() => {
    const listener = ({colorScheme}): void => {
      setThemeType(colorScheme === 'light' ? ThemeType.LIGHT : ThemeType.DARK);
    };

    Appearance.addChangeListener(listener);

    return function cleanup() {
      Appearance.removeChangeListener(listener);
    };
  }, []);

  const changeThemeType = (): void => {
    const newThemeType =
      themeType === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;

    setThemeType(newThemeType);
  };

  let theme: DefaultTheme;

  const media = {
    isMobile,
    isTablet,
    isDesktop,
  };

  if (customTheme)
    theme = createTheme(themeType, {
      light: {
        ...lightTheme,
        ...customTheme.light,
      },
      dark: {
        ...darkTheme,
        ...customTheme.dark,
      },
    }) as DefaultTheme;
  else theme = createTheme(themeType, {light: {}, dark: {}}) as DefaultTheme;

  return (
    <Provider
      value={{
        media,
        themeType,
        changeThemeType,
        theme,
        colors,
      }}>
      <OriginalThemeProvider theme={theme}>{children}</OriginalThemeProvider>
    </Provider>
  );
}

export {useCtx as useTheme, ThemeProvider, ThemeType};
