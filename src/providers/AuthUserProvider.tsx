import React, { useReducer } from 'react';

import { AuthUser } from '../types';
import createCtx from '../utils/createCtx';

interface Context {
  state: State;
  setAuthUser(authUser: AuthUser): void;
}
const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  SetAuthUser = 'set-auth-user',
}

export interface State {
  user?: AuthUser;
}

type Action =
  | { type: ActionType.SetAuthUser; payload: State };

interface Props {
  children?: React.ReactElement;
  initialAuthUser?: AuthUser;
}

type Reducer = (state: State, action: Action) => State;

const setAuthUser = (dispatch: React.Dispatch<Action>) => (authUser: AuthUser): void => {
  dispatch({
    type: ActionType.SetAuthUser,
    payload: { user: authUser },
  });
};

const initialState: State = {};

const reducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SetAuthUser:
      return {
        user: payload.user,
      };
    default:
      return state;
  }
};

function AuthUserProvider(props: Props): React.ReactElement {
  const { children, initialAuthUser } = props;
  const [state, dispatch] = useReducer<Reducer>(reducer, { user: initialAuthUser });

  const actions = {
    setAuthUser: setAuthUser(dispatch),
  };

  return <Provider value={{ state, ...actions }}>{children}</Provider>;
}

export { useCtx as useAuthUserContext, AuthUserProvider };
