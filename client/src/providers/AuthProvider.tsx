import {
  AuthProviderMeQuery,
  AuthProviderMeQueryResponse,
  AuthProviderMeQueryVariables,
} from '../__generated__/AuthProviderMeQuery.graphql';
import {PreloadedQuery, graphql, useQueryLoader} from 'react-relay/hooks';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types/graphql';
import createCtx from '../utils/createCtx';
import {useResettableRelayContext} from './ResettableProvider';

export interface AuthContext {
  user: AuthProviderMeQueryResponse['me'] | null;
  setUser: (value: AuthProviderMeQueryResponse['me'] | null) => void;
  signOutAsync: () => void;
  meQueryReference?:
    | PreloadedQuery<AuthProviderMeQuery, Record<string, unknown>>
    | null
    | undefined;
  loadMeQuery: (variables: AuthProviderMeQueryVariables, options?: any) => void;
}

const [useCtx, Provider] = createCtx<AuthContext>();

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
  const [user, setUser] = useState<AuthProviderMeQueryResponse['me'] | null>(
    (initialAuthUser as AuthProviderMeQueryResponse['me']) || null,
  );

  const [meQueryReference, loadMeQuery, disposeMeQuery] =
    useQueryLoader<AuthProviderMeQuery>(meQuery);

  const {resetRelayEnvironment} = useResettableRelayContext();

  const signOutAsync = async (): Promise<void> => {
    const cleanup = async (): Promise<void> => {
      await AsyncStorage.removeItem('token');

      disposeMeQuery();

      setUser(null);

      resetRelayEnvironment();
    };

    await cleanup();
  };

  return (
    <Provider
      value={{
        user,
        setUser,
        signOutAsync,
        meQueryReference,
        loadMeQuery,
      }}>
      {children}
    </Provider>
  );
}

export {useCtx as useAuthContext, AuthProvider};

const AuthContext = {
  useAuthContext: useCtx,
  AuthProvider,
};

export default AuthContext;
