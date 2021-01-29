import {AppProvider} from './AppProvider';
import React from 'react';
import {ThemeProvider} from './ThemeProvider';
import {ThemeType} from '../utils/theme';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

// Add providers here
const RootProvider = ({
  initialThemeType = ThemeType.LIGHT,
  children,
}: Props): React.ReactElement => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
