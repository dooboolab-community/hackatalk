import React, { useReducer } from 'react';

import { User } from '../types';
import createCtx from '../utils/createCtx';

interface Context {
  state: State;
  showModal: (
    user: Partial<User>,
    deleteMode: boolean,
    screen?: string,
  ) => void;
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
  screen?: string;
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
  screen: '',
};

type Action = { type: ActionType.ShowModal; payload: State };

interface Props {
  children?: React.ReactElement;
}

type Reducer = (state: State, action: Action) => State;

const showModal = (dispatch: React.Dispatch<Action>) => (
  user: Partial<User>,
  deleteMode: boolean,
  screen: string,
): void => {
  dispatch({
    type: ActionType.ShowModal,
    payload: { user, deleteMode, screen: screen || '' },
  });
};

const reducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { modal } = state;
  switch (type) {
    case ActionType.ShowModal:
      if (modal && modal.current) {
        // modal.current.setUser(payload.user);
        // modal.current.showAddBtn(!payload.deleteMode);
        // modal.current.setScreen(payload.screen);
        modal.current.open();
      }
      return {
        ...state,
        user: payload.user,
        deleteMode: !payload.deleteMode,
        screen: payload.screen,
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
