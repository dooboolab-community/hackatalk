import React, { useReducer, useRef } from 'react';

import { User as Friend } from '../models/User';
import ProfileModal from '../components/shared/ProfileModal';
import { ProfileModalContext } from '../contexts/ProfileModalContext';

interface Props {
  navigation: any;
  children?: any;
}

interface State {
  user: Partial<Friend>;
  deleteMode: boolean;
}

interface Action {
  type: 'show-modal';
  payload: State;
}

const initialState: State = {
  user: {
    uid: '',
    displayName: '',
    photoURL: '',
    statusMsg: '',
  },
  deleteMode: false,
};

let modal: any;

const reducer = (state: State, action: IAction) => {
  switch (action.type) {
    case 'show-modal':
      if (modal && modal.current) {
        modal.current.setUser(action.payload.user);
        modal.current.showAddBtn(!action.payload.deleteMode);
        modal.current.open();
      }
      return {
        ...state,
        user: action.payload.user,
        deleteMode: !action.payload.deleteMode,
      };
    default:
      return state;
  }
};

function ProfileModalProvider(props: Props) {
  modal = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <ProfileModalContext.Provider value={value}>
      {props.children}
      <ProfileModal
        testID='modal'
        ref={modal}
        onChatPressed={() => {
          if (modal && modal.current) {
            modal.current.close();
          }
          props.navigation.navigate('Chat');
        }}
      />
    </ProfileModalContext.Provider>
  );
}

export { ProfileModalContext, ProfileModalProvider };
