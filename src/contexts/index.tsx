import React, {
  createContext,
  useContext,
  useReducer,
  FC,
  Dispatch,
  ReactNode,
  useRef,
} from 'react';
import { ThemeType } from '../types';
import {
  IThemeAction,
  initialTheme,
  themeReducer,
} from '../reducers/themeReducer';
import {
  IProfileModalState,
  IProfileModalAction,
  initialProfileModal,
  profileModalReducer,
} from '../reducers/ProfileModalReducer';

// TODO: preferred to invent a way to automatically overload or joined typescript perk
interface IMainState {
  theme: ThemeType;
  profileModal: IProfileModalState;
}

type TMainAction = IThemeAction | IProfileModalAction;

const mainInitialState = {
  theme: initialTheme,
  profileModal: initialProfileModal,
};

const modalInit = () => {
  const modal = useRef<any>(null);
  return {
    ...mainInitialState,
    profileModal: {
      ...mainInitialState.profileModal,
      modal,
    },
  };
};

const mainReducer = (
  { theme, profileModal }: IMainState,
  action: TMainAction,
) => {
  // middleware goes here, i.e. calling analytics service, etc.
  return {
    theme: themeReducer(theme, action),
    profileModal: profileModalReducer(profileModal, action),
  };
};

export const StateContext = createContext<[IMainState, Dispatch<TMainAction>]>([
  mainInitialState,
  () => null,
]);

export const StateProvider: FC<ReactNode> = ({ children }) => (
  <StateContext.Provider
    value={useReducer(mainReducer, mainInitialState, modalInit)}
  >
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
