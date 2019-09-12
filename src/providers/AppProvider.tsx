import React, { useReducer } from 'react';

import { AppContext } from '../contexts/AppContext';
import { ThemeType } from '../utils/theme';

interface Props {
  children?: any;
}

interface State {
  theme: ThemeType;
}

interface Action {
  type: 'change-theme-mode';
  payload: State;
}

const initialState: State = {
  theme: ThemeType.LIGHT,
};

const reducer = (state: State, action: IAction) => {
  switch (action.type) {
    case 'change-theme-mode':
      return {
        ...state,
        theme: action.payload.theme,
      };
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

export { AppProvider };
