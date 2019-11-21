import { AuthUser, ThemeType } from '../types';
import { dark, light } from '../theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { AuthUserProvider } from './AuthUserProvider';
import { FriendProvider } from './FriendProvider';
import { ProfileModalProvider } from './ProfileModalProvider';
import React from 'react';
import { ThemeProvider } from '@dooboo-ui/native-theme';

interface Props {
  initialThemeType?: ThemeType;
  initialAuthUser?: AuthUser;
  children?: React.ReactElement;
}

// hyochan => for testing
export const AllProviders = ({
  initialThemeType,
  initialAuthUser,
  children,
}: Props): React.ReactElement => {
  return (
    <ThemeProvider
      initialThemeType={initialThemeType}
      customTheme={{ light, dark }}
    >
      <FriendProvider>
        <AuthUserProvider initialAuthUser={initialAuthUser}>
          <ProfileModalProvider>
            {children}
          </ProfileModalProvider>
        </AuthUserProvider>
      </FriendProvider>
    </ThemeProvider>
  );
};

export default ({ initialThemeType, children }: Props): React.ReactElement => {
  return (
    <ThemeProvider
      initialThemeType={initialThemeType}
    >
      <AuthUserProvider>
        <ActionSheetProvider>{children}</ActionSheetProvider>
      </AuthUserProvider>
    </ThemeProvider>
  );
};
