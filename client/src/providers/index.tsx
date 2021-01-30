import React from 'react';
import {ThemeProvider} from './ThemeProvider';
import {ThemeType} from '../utils/theme';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

// Add providers here
const RootProvider = ({
  initialThemeType,
  children,
}: Props): React.ReactElement => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      {children}
    </ThemeProvider>
  );
};

export default RootProvider;
