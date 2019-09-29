import { User } from '../types/index';
import Modal from 'react-native-modalbox';

export interface IProfileModalState {
  user: Partial<User>;
  deleteMode: boolean;
  modal?: any;
}

export interface IProfileModalAction {
  readonly type: 'show-modal';
  readonly payload: IProfileModalState;
}

export const initialProfileModal: IProfileModalState = {
  user: {
    uid: '',
    displayName: '',
    photoURL: '',
    statusMsg: '',
  },
  deleteMode: false,
  modal: null,
};

// prettier-ignore
export const profileModalReducer = (state: IProfileModalState, action: any): IProfileModalState => {
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
