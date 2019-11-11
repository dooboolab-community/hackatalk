import React, { useReducer } from 'react';

import { User } from '../types';
import createCtx from '../utils/createCtx';

interface Context {
  state: State;
  showModal: (user: Partial<User>, deleteMode: boolean) => void;
  // setUser: (user: User) => void;
  // showAddBtn: (deleteMode: boolean) => void;
  // open: () => void;
}
const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  ShowModal = 'show-modal',
}

export interface State {
  user: Partial<User>;
  deleteMode: boolean;
  modal?: any;
}

const initialState: State = {
  user: {
    uid: '',
    displayName: '',
    photoURL: '',
    statusMsg: '',
  },
  deleteMode: false,
  modal: null,
};

interface Action {
  type: ActionType;
  payload: State;
}

interface Props {
  children?: React.ReactElement;
}

type Reducer = (state: State, action: Action) => State;

const showModal = (dispatch: React.Dispatch<Action>) => (user: Partial<User>, deleteMode: boolean): void => {
  dispatch({
    type: ActionType.ShowModal,
    payload: { user, deleteMode },
  });
};

const reducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { modal } = state;
  switch (type) {
    case ActionType.ShowModal:
      if (modal && modal.current) {
        modal.current.setUser(payload.user);
        modal.current.showAddBtn(!payload.deleteMode);
        modal.current.open();
      }
      return {
        ...state,
        user: payload.user,
        deleteMode: !payload.deleteMode,
      };
    default:
      return state;
  }
};

function ProfileModalProvider(props: Props): React.ReactElement {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const actions = {
    showModal: showModal(dispatch),
  };

  return <Provider value={{ state, ...actions }}>{props.children}</Provider>;
}

export { useCtx as useProfileContext, ProfileModalProvider };
