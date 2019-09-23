import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { useReducer, useRef } from 'react';

import ProfileModal from '../components/shared/ProfileModal';
import { ProfileModalContext } from '../contexts';
import { User } from '../types/index';

const ProfileModalConsumer = ProfileModalContext.Consumer;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  children?: React.ReactElement;
}

interface State {
  user: Partial<User>;
  deleteMode: boolean;
}

interface Action {
  type: 'show-modal';
  payload: State;
}

export const initialState: State = {
  user: {
    uid: '',
    displayName: '',
    photoURL: '',
    statusMsg: '',
  },
  deleteMode: false,
};

let modal: any;

// prettier-ignore
const reducer = (state: State, action: Action): State => {
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

function ProfileModalProvider(props: Props): React.ReactElement {
  modal = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <ProfileModalContext.Provider value={value}>
      {props.children}
      <ProfileModal
        testID='modal'
        ref={modal}
        onChatPressed={(): void => {
          if (modal && modal.current) {
            modal.current.close();
          }
          props.navigation.navigate('Chat');
        }}
      />
    </ProfileModalContext.Provider>
  );
}

export { ProfileModalConsumer, ProfileModalProvider, ProfileModalContext };
