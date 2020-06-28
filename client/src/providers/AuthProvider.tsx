import React, { useReducer } from 'react';

import Relay from '../relay';
import { Environment as RelayEnvironment } from 'react-relay';
import { User } from '../types/graphql';
import createCtx from '../utils/createCtx';

interface Context {
  state: State;
  setUser(user: User | undefined): void;
}
const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  SetUser = 'set-user',
}

export interface State {
  user: User | undefined | null;
  relay: RelayEnvironment;
}
type SetUserAction = {
  type: ActionType.SetUser;
  payload: { user: User; relay: RelayEnvironment };
};
type Action = SetUserAction;

interface Props {
  children?: React.ReactElement;
  initialAuthUser?: User;
}

type Reducer = (state: State, action: Action) => State;

const setUser = (dispatch: React.Dispatch<SetUserAction>) => (
  authUser: User,
): void => {
  if (!authUser) Relay.init();
  dispatch({
    type: ActionType.SetUser,
    payload: { user: authUser, relay: Relay.environment },
  });
};

const initialState: State = {
  user: undefined,
  relay: Relay.environment,
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SetUser:
      return { ...action.payload };
    default:
      return state;
  }
};

function AuthProvider(props: Props): React.ReactElement {
  const initialAuthState = {
    user: props.initialAuthUser,
    relay: Relay.environment,
  };
  const [state, dispatch] = useReducer<Reducer>(reducer, initialAuthState);

  const actions = {
    setUser: setUser(dispatch),
  };

  return <Provider value={{ state, ...actions }}>{props.children}</Provider>;
}

const AuthContext = {
  useAuthContext: useCtx,
  AuthProvider,
};

export { useCtx as useAuthContext, AuthProvider };
export default AuthContext;
