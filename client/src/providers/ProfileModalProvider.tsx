import React, {FC, createContext, useContext, useState} from 'react';

import {User} from '../types/graphql';

export interface ModalState {
  /** Which user the profile modal describes */
  user: User;
  /** Is the profile user a friend of the current user? */
  isFriend?: boolean;
  /** Callback function for delete button */
  onDeleteFriend?: () => void;
  /** Callback function for add friend button */
  onAddFriend?: () => void;
  hideButtons?: boolean;
}

export type ProfileModalContext = {
  modalState?: ModalState | null;
  isVisible: boolean;
  /** Allow context consumers to make the modal visible with a new state. */
  showModal: (next: ModalState) => void;
  /** Allow context consumers to hide the modal. */
  hideModal: () => void;
};

const ProfileModalContext = createContext<ProfileModalContext>({
  isVisible: false,
  modalState: null,
  showModal: () => {},
  hideModal: () => {},
});

type ContextState = {
  isVisible: boolean;
  modalState?: ModalState | null;
};

export const ProfileModalProvider: FC = (props) => {
  const [state, setState] = useState<ContextState>({
    isVisible: false,
    modalState: null,
  });

  const showModal = (next: ModalState): void =>
    setState({
      isVisible: true,
      modalState: next,
    });

  const hideModal = (): void =>
    setState({
      isVisible: false,
      modalState: null,
    });

  return (
    <ProfileModalContext.Provider
      value={{
        ...state,
        showModal,
        hideModal,
      }}>
      {props.children}
    </ProfileModalContext.Provider>
  );
};

export const useProfileContext = (): ProfileModalContext =>
  useContext(ProfileModalContext);
