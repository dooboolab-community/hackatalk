import React, { MutableRefObject, useReducer } from 'react';

import { Ref as ProfileModalRef } from '../components/shared/ProfileModal';
import { User } from '../types';
import createCtx from '../utils/createCtx';

interface ShowModalParams {
  user: User;
  deleteMode: boolean;
  onDeleteFriend?: () => void;
  onAddFriend?: () => void;
}

interface Context {
  state: State;
  showModal: (showModalParams: ShowModalParams) => void;
  // setUser: (user: User) => void;
  // setShowAddBtn: (deleteMode: boolean) => void;
  // setScreen: (screen: string) => void;
  // open: () => void;
}

const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  ShowModal = 'show-modal',
}

export interface State {
  user: User;
  deleteMode: boolean;
  modal?: React.MutableRefObject<ProfileModalRef | null>;
}

export interface Payload extends State {
  onDeleteFriend?: () => void;
  onAddFriend?: () => void;
}

const initialState: State = {
  user: {
    id: '',
    nickname: '',
    photoURL: '',
    statusMessage: '',
  },
  deleteMode: false,
  modal: undefined,
};

type Action = { type: ActionType.ShowModal; payload: Payload };

interface Props {
  children?: React.ReactElement;
}

type Reducer = (state: State, action: Action) => State;

const showModal = (dispatch: React.Dispatch<Action>) => ({
  user,
  deleteMode,
  onDeleteFriend,
  onAddFriend,
}: ShowModalParams): void => {
  dispatch({
    type: ActionType.ShowModal,
    payload: {
      user,
      deleteMode,
      onDeleteFriend,
      onAddFriend,
    },
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

const ProfileContext = {
  useProfileContext: useCtx,
  ProfileModalProvider,
};

export { useCtx as useProfileContext, ProfileModalProvider };
export default ProfileContext;
