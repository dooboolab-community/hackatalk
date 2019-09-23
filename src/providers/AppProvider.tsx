import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { useEffect, useReducer } from 'react';

import { AppContext } from '../contexts';
import { ThemeType } from '../types';

const AppConsumer = AppContext.Consumer;

interface Action {
  type: 'change-theme-mode';
  payload: {
    theme: ThemeType;
  };
}

interface Props {
  theme?: ThemeType;
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
  children?: React.ReactElement;
}

export interface State {
  theme: ThemeType;
}

export const initialState: State = {
  theme: ThemeType.LIGHT,
};

// prettier-ignore
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
  case 'change-theme-mode':
    return { ...state, theme: action.payload.theme };
  default:
    return state;
  }
};

function AppProvider(props: Props): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, initialState);

  // by encapsulating dispatch, it is easier to use (such as passing through screenProps)
  const changeTheme: (theme?: ThemeType) => void = (theme) => {
    if (!theme) {
      theme = state.theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK;
    }
    dispatch({
      type: 'change-theme-mode',
      payload: {
        theme,
      },
    });
  };

  // initialize theme
  useEffect(() => {
    changeTheme(props.theme ? props.theme : initialState.theme);
  }, [props.theme]);

  const value = { state, dispatch, changeTheme };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppConsumer, AppProvider, AppContext };
