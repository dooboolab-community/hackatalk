import { ThemeType } from '../types';

export interface IThemeAction {
  readonly type: 'change-theme-mode';
  readonly payload: {
    theme: ThemeType;
  };
}

export const initialTheme: ThemeType = ThemeType.LIGHT;

// prettier-ignore
export const themeReducer = (state: ThemeType, action: any): ThemeType => {
  switch (action.type) {
    case 'change-theme-mode':
      return action.payload.theme;
    default:
      return state;
  }
};
