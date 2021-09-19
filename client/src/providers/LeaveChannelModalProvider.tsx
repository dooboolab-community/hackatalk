import React, {FC, createContext, useContext, useState} from 'react';

export type LeaveChannelModalState =
  | {
      isVisible: false;
    }
  | {
      testID?: string;
      isVisible: true;
      channelId: string;
      onClickYes?: () => void;
    };

export type LeaveChannelModalContext = {
  showModal: (
    next: Omit<LeaveChannelModalState & {isVisible: true}, 'isVisible'>,
  ) => void;
  hideModal: () => void;
  modalState: LeaveChannelModalState;
};

const LeaveChannelModalContext = createContext<LeaveChannelModalContext>({
  modalState: {isVisible: false},
  showModal: () => {},
  hideModal: () => {},
});

export const LeaveChannelModalProvider: FC = ({children}) => {
  const [showModalState, setModalState] = useState<LeaveChannelModalState>({
    isVisible: false,
  });

  const showModal = (
    next: Omit<LeaveChannelModalState & {isVisible: true}, 'isVisible'>,
  ): void =>
    setModalState({
      isVisible: true,
      ...next,
    });

  const hideModal = (): void =>
    setModalState({
      isVisible: false,
    });

  return (
    <LeaveChannelModalContext.Provider
      value={{
        showModal,
        hideModal,
        modalState: showModalState,
      }}>
      {children}
    </LeaveChannelModalContext.Provider>
  );
};

export const useLeaveChannelContext = (): LeaveChannelModalContext =>
  useContext(LeaveChannelModalContext);
