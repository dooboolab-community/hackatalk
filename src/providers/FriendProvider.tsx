import React, { useReducer } from 'react';

import { User } from '../types';
import createCtx from '../utils/createCtx';
import produce from 'immer';

interface Context {
  friendState: State;
  addFriend: (user: User) => void;
  deleteFriend: (user: User) => void;
  setFriends: (users: User[]) => void;
}

const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  AddFriend = 'add-friend',
  DeleteFriend = 'delete-friend',
  SetFriends = 'set-friends'
}

export interface State {
  friends: User[];
}

interface Payload {
  user?: User;
  users?: User[];
}

const MockInitialFriends = [
  {
    id: '0',
    nickname: 'hello',
    thumbURL: '',
    photoURL: '',
    statusMessage: 'I am fine today',
    isOnline: true,
  },
];

const initialState: State = {
  friends: [...MockInitialFriends],
};

type Action = { type: ActionType; payload: Payload };

interface Props {
  children?: React.ReactElement;
}

type Reducer = (state: State, action: Action) => State;

const addFriend = (dispatch: React.Dispatch<Action>) => (user: User): void => {
  dispatch({
    type: ActionType.AddFriend,
    payload: { user },
  });
};

const deleteFriend = (dispatch: React.Dispatch<Action>) => (
  user: User,
): void => {
  dispatch({
    type: ActionType.DeleteFriend,
    payload: { user },
  });
};

const setFriends = (dispatch: React.Dispatch<Action>) => (
  users: User[],
): void => {
  dispatch({
    type: ActionType.SetFriends,
    payload: { users },
  });
};

const reducer: Reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case ActionType.AddFriend: {
        const { user } = payload;
        if (user && !draft.friends.find((friend) => friend.id === user.id)) {
          const index = draft.friends.findIndex(
            (friend) =>
              (user.nickname || '').toLowerCase() <
              (friend?.nickname || '').toLowerCase(),
          );
          draft.friends.splice(
            index === -1 ? draft.friends.length : index,
            0,
            user,
          );
        }
        break;
      }
      case ActionType.DeleteFriend: {
        const { user } = payload;
        if (user) {
          const index = draft.friends.findIndex(
            (friend) => friend.id === user.id,
          );
          if (index !== -1) {
            draft.friends.splice(index, 1);
          }
        }
        break;
      }
      case ActionType.SetFriends: {
        const { users } = payload;
        if (users) {
          draft.friends = users;
        }
        break;
      }
    }
  });
};

function FriendProvider(props: Props): React.ReactElement {
  const [friendState, dispatch] = useReducer<Reducer>(reducer, initialState);

  const actions = {
    // legacy
    addFriend: addFriend(dispatch),
    deleteFriend: deleteFriend(dispatch),
    setFriends: setFriends(dispatch),
  };
  return (
    <Provider value={{ friendState, ...actions }}>{props.children}</Provider>
  );
}

export { useCtx as useFriendContext, FriendProvider };
