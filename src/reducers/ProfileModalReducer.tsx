import { User } from '../types/index';

export interface ProfileModalState {
  user: Partial<User>;
  deleteMode: boolean;
  modal?: any;
}

export interface ProfileModalAction {
  readonly type: 'show-modal';
  readonly payload: ProfileModalState;
}

export const initialProfileModal: ProfileModalState = {
  user: {
    uid: '',
    displayName: '',
    photoURL: '',
    statusMsg: '',
  },
  deleteMode: false,
  modal: null,
};

export const profileModalReducer = (
  state: ProfileModalState,
  action: any,
): ProfileModalState => {
  const { type, payload } = action;
  const { modal } = state;
  switch (type) {
    case 'show-modal':
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
