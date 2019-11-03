import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ProfileModalProvider } from './ProfileModalProvider';
import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeType } from '../types';

interface Props {
  initialThemeType?: ThemeType;
  children?: React.ReactElement;
}

// hyochan => for testing
export const AllProviders = ({
  initialThemeType,
  children,
}: Props): React.ReactElement => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      <ProfileModalProvider>{children}</ProfileModalProvider>
    </ThemeProvider>
  );
};

export default ({ initialThemeType, children }: Props): React.ReactElement => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      <ActionSheetProvider>{children}</ActionSheetProvider>
    </ThemeProvider>
  );
};
