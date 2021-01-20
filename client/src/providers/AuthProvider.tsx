import React, {useReducer} from 'react';

import {User} from '../types/graphql';
import createCtx from '../utils/createCtx';

export interface State {
  user: User | undefined;
}

interface Context {
  state: State;
  setUser(user: User | undefined): void;
}

const [useCtx, Provider] = createCtx<Context>();

// eslint-disable-next-line no-shadow
export enum ActionType {
  SetUser = 'set-user',
}

type SetUserAction = {
  type: ActionType.SetUser;
  payload: {user: User};
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
  dispatch({
    type: ActionType.SetUser,
    payload: {user: authUser},
  });
};

const initialState: State = {
  user: undefined,
};

// eslint-disable-next-line default-param-last
const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SetUser:
      return {...action.payload};
    default:
      return state;
  }
};

function AuthProvider(props: Props): React.ReactElement {
  const initialAuthState = {
    user: props.initialAuthUser,
  };

  const [state, dispatch] = useReducer<Reducer>(reducer, initialAuthState);

  const actions = {
    setUser: setUser(dispatch),
  };

  return <Provider value={{state, ...actions}}>{props.children}</Provider>;
}

const AuthContext = {
  useAuthContext: useCtx,
  AuthProvider,
};

export {useCtx as useAuthContext, AuthProvider};
export default AuthContext;
