import {
  AuthProviderMeQuery,
  AuthProviderMeQuery$data,
  AuthProviderMeQuery$variables,
} from '../__generated__/AuthProviderMeQuery.graphql';
import type {Dispatch, SetStateAction} from 'react';
import {
  PreloadedQuery,
  commitLocalUpdate,
  graphql,
  useQueryLoader,
  useRelayEnvironment,
} from 'react-relay/hooks';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types/graphql';
import createCtx from '../utils/createCtx';

export interface AuthContext {
  user: AuthProviderMeQuery$data['me'] | null;
  setUser: Dispatch<SetStateAction<AuthProviderMeQuery$data['me'] | null>>;
  signOutAsync: () => void;
  meQueryReference?:
    | PreloadedQuery<AuthProviderMeQuery, Record<string, unknown>>
    | null
    | undefined;
  loadMeQuery: (
    variables: AuthProviderMeQuery$variables,
    options?: any,
  ) => void;
}

const [useCtx, AuthContextProvider] = createCtx<AuthContext>();

interface Props {
  children?: React.ReactElement;
  initialAuthUser?: User;
}

export const meQuery = graphql`
  query AuthProviderMeQuery {
    me {
      id
      email
      verified
      profile {
        socialId
        authType
      }
    }
  }
`;

function AuthProvider({children, initialAuthUser}: Props): React.ReactElement {
  const [user, setUser] = useState<AuthProviderMeQuery$data['me'] | null>(
    (initialAuthUser as AuthProviderMeQuery$data['me']) || null,
  );

  const environment = useRelayEnvironment();

  const [meQueryReference, loadMeQuery, disposeMeQuery] =
    useQueryLoader<AuthProviderMeQuery>(meQuery);

  const signOutAsync = async (): Promise<void> => {
    await AsyncStorage.removeItem('token');

    disposeMeQuery();

    commitLocalUpdate(environment, (store) => {
      const root = store.getRoot();
      root.invalidateRecord();
    });

    setUser(null);
  };

  return (
    <AuthContextProvider
      value={{
        user,
        setUser,
        signOutAsync,
        meQueryReference,
        loadMeQuery,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}

export {useCtx as useAuthContext, AuthProvider};

const AuthContext = {
  useAuthContext: useCtx,
  AuthProvider,
};

export default AuthContext;
