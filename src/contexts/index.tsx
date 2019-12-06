import {
  FriendAction,
  FriendState,
  friendReducer,
  initialFriend,
} from '../reducers/FriendReducer';
import {
  ProfileModalAction,
  ProfileModalState,
  initialProfileModal,
  profileModalReducer,
} from '../reducers/ProfileModalReducer';
import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useRef,
} from 'react';
import {
  ThemeAction,
  initialTheme,
  themeReducer,
} from '../reducers/themeReducer';

import { ThemeType } from '../types';

// TODO: preferred to invent a way to automatically overload or joined typescript perk
interface MainState {
  theme: ThemeType;
  profileModal: ProfileModalState;
  friend: FriendState;
}

type TMainAction = ThemeAction | ProfileModalAction | FriendAction;

const mainInitialState = {
  theme: initialTheme,
  profileModal: initialProfileModal,
  friend: initialFriend,
};

const mainReducer = (
  { theme, profileModal, friend }: MainState,
  action: TMainAction,
): MainState => {
  // middleware goes here, i.e. calling analytics service, etc.
  return {
    theme: themeReducer(theme, action),
    profileModal: profileModalReducer(profileModal, action),
    friend: friendReducer(friend, action),
  };
};

export const StateContext = createContext<[MainState, Dispatch<TMainAction>]>([
  mainInitialState,
  (): null => null,
]);

export const StateProvider: FC<ReactNode> = ({ children }) => {
  const modal = useRef<any>(null);

  const modalInit = (): MainState => {
    return {
      ...mainInitialState,
      profileModal: {
        ...mainInitialState.profileModal,
        modal,
      },
    };
  };
  return (
    <StateContext.Provider
      value={useReducer(mainReducer, mainInitialState, modalInit)}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = (): [MainState, Dispatch<TMainAction>] =>
  useContext(StateContext);
