import React, { useReducer } from 'react';

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
  user?: User;
}

type Action =
  | { type: ActionType.SetUser; payload: State };

interface Props {
  children?: React.ReactElement;
  initialAuthUser?: User;
}

type Reducer = (state: State, action: Action) => State;

const setUser = (dispatch: React.Dispatch<Action>) => (authUser: User): void => {
  dispatch({
    type: ActionType.SetUser,
    payload: { user: authUser },
  });
};

const initialState: State = {};

const reducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SetUser:
      return {
        user: payload.user,
      };
    default:
      return state;
  }
};

function AuthProvider(props: Props): React.ReactElement {
  const { children, initialAuthUser } = props;
  const [state, dispatch] = useReducer<Reducer>(reducer, { user: initialAuthUser });

  const actions = {
    setUser: setUser(dispatch),
  };

  return <Provider value={{ state, ...actions }}>{children}</Provider>;
}

const AuthContext = {
  useAuthContext: useCtx,
  AuthProvider,
};

export { useCtx as useAuthContext, AuthProvider };
export default AuthContext;
