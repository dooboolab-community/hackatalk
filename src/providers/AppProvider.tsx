import React, { useEffect, useReducer } from 'react';

import { AppContext } from '../contexts';
import { AsyncStorage } from 'react-native';
import { ThemeType } from '../types';

const AppConsumer = AppContext.Consumer;

interface Action {
  type: 'reset-user' | 'set-user' | 'change-theme-mode';
  payload: any;
}

interface Props {
  theme?: ThemeType;
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

  // Load font and then use saved theme from local storage
  const getCurrentThemeType = async () => {
    const value = (await AsyncStorage.getItem('theme')) as ThemeType;
    value && changeTheme(value);
  };

  const value = { state, dispatch, changeTheme };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppConsumer, AppProvider, AppContext };
