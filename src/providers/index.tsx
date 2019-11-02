import React from 'react';
import { StateProvider } from '../contexts';
import { ThemeProvider } from './ThemeProvider';
import { ThemeType } from '../types';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

// Add providers here
const RootProviders = ({
  initialThemeType,
  children,
}: Props): React.ReactElement => {
  return (
    <ThemeProvider
      initialThemeType={initialThemeType}
    >
      <StateProvider>{children}</StateProvider>
    </ThemeProvider>
  );
};

export default RootProviders;
