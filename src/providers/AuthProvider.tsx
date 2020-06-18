import React, { useReducer } from 'react';
import RelayEnvironment, {
  RelayEnvironmentProps,
} from '../relay/RelayEnvironment';

import { User } from '../types/graphql';
import createCtx from '../utils/createCtx';

interface Context {
  state: State;
  setUser(user: User | undefined): void;
  resetRelay(): void;
}
const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  SetUser = 'set-user',
  ResetRelay = 'reset-relay',
}

export interface State {
  user: User | undefined | null;
  relay: RelayEnvironmentProps;
}
type SetUserAction = { type: ActionType.SetUser; payload: { user: User } };
type ResetRelayAction = { type: ActionType.ResetRelay };
type Action = SetUserAction | ResetRelayAction;

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
    payload: { user: authUser },
  });
};
const resetRelay = (dispatch: React.Dispatch<ResetRelayAction>) => (): void => {
  dispatch({
    type: ActionType.ResetRelay,
  });
};

const initialState: State = {
  user: undefined,
  relay: RelayEnvironment.environment,
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SetUser:
      return {
        ...state,
        user: action.payload.user,
      };
    case ActionType.ResetRelay:
      return { ...state, relay: RelayEnvironment.resetEnvironment() };
    default:
      return state;
  }
};

function AuthProvider(props: Props): React.ReactElement {
  const initialAuthState = {
    user: props.initialAuthUser,
    relay: RelayEnvironment.environment,
  };
  const [state, dispatch] = useReducer<Reducer>(reducer, initialAuthState);

  const actions = {
    setUser: setUser(dispatch),
    resetRelay: resetRelay(dispatch),
  };

  return <Provider value={{ state, ...actions }}>{props.children}</Provider>;
}

const AuthContext = {
  useAuthContext: useCtx,
  AuthProvider,
};

export { useCtx as useAuthContext, AuthProvider };
export default AuthContext;
