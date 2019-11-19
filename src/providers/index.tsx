import { dark, light } from '../theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { FriendProvider } from './FriendProvider';
import { ProfileModalProvider } from './ProfileModalProvider';
import React from 'react';
import { ThemeProvider } from '@dooboo-ui/native-theme';
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
    <ThemeProvider
      initialThemeType={initialThemeType}
      customTheme={{ light, dark }}
    >
      <FriendProvider>
        <ProfileModalProvider>{children}</ProfileModalProvider>
      </FriendProvider>
    </ThemeProvider>
  );
};

export default ({ initialThemeType, children }: Props): React.ReactElement => {
  return (
    <ThemeProvider initialThemeType={initialThemeType}>
      <ActionSheetProvider>
        <FriendProvider>{children}</FriendProvider>
      </ActionSheetProvider>
    </ThemeProvider>
  );
};
