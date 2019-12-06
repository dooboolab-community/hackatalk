import React, { useReducer } from 'react';

import { User } from '../types';
import createCtx from '../utils/createCtx';

interface ShowModalParams {
  user: Partial<User>;
  deleteMode: boolean;
  isFriendAlreadyAdded?: boolean;
  onDeleteFriend?: () => void;
  onAddFriend?: () => void;
}

interface Context {
  state: State;
  showModal: (showModalParams: ShowModalParams) => void;
  // setUser: (user: User) => void;
  // setShowAddBtn: (deleteMode: boolean) => void;
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

export interface Payload extends State {
  isFriendAlreadyAdded?: boolean;
  onDeleteFriend?: () => void;
  onAddFriend?: () => void;
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

type Action = { type: ActionType.ShowModal; payload: Payload };

interface Props {
  children?: React.ReactElement;
}

type Reducer = (state: State, action: Action) => State;

const showModal = (dispatch: React.Dispatch<Action>) => ({
  user,
  deleteMode,
  isFriendAlreadyAdded,
  onDeleteFriend,
  onAddFriend,
}: ShowModalParams): void => {
  dispatch({
    type: ActionType.ShowModal,
    payload: {
      user,
      deleteMode,
      isFriendAlreadyAdded,
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
        modal.current.setIsFriendAlreadyAdded(
          payload.isFriendAlreadyAdded || false,
        );
        modal.current.setOnDeleteFriend(payload.onDeleteFriend);
        modal.current.setOnAddFriend(payload.onAddFriend);
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

const ProfileContext = {
  useProfileContext: useCtx,
  ProfileModalProvider,
};

export default ProfileContext;
