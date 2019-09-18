import React, { useReducer } from 'react';

import { AppContext } from '../contexts';
import { ThemeType } from '../types';

const AppConsumer = AppContext.Consumer;

interface Action {
  type: 'reset-user' | 'set-user' | 'change-theme-mode';
  payload: any;
}

interface Props {
  navigation?: any;
  children?: any;
}

export interface State {
  theme: ThemeType;
}

export const initialState: State = {
  theme: ThemeType.LIGHT,
};

// prettier-ignore
const reducer = (state: State, action: Action) => {
  switch (action.type) {
  case 'change-theme-mode':
    return { ...state, theme: action.payload.theme };
  default:
    return state;
  }
};

function AppProvider(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppConsumer, AppProvider, AppContext };
