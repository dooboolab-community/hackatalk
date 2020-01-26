import { ThemeProvider, ThemeType } from '@dooboo-ui/native-theme';
import { dark, light } from '../theme';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthUserProvider } from './AuthUserProvider';
import { FriendProvider } from './FriendProvider';
import { ProfileModalProvider } from './ProfileModalProvider';
import React from 'react';
import { User } from '../types';
import testClient from '../apollo/testClient';

interface Props {
  initialThemeType?: ThemeType;
  initialAuthUser?: User;
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
      <ApolloProvider client={testClient}>
        <FriendProvider>
          <AuthUserProvider initialAuthUser={initialAuthUser}>
            <ProfileModalProvider>
              {children}
            </ProfileModalProvider>
          </AuthUserProvider>
        </FriendProvider>
      </ApolloProvider>
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
