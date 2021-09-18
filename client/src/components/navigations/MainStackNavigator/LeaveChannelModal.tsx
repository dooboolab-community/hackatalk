import {
  ChannelModalState,
  LeaveChannelModalContext,
  useLeaveChannelContext,
} from '../../../providers/LeaveChannelModalProvider';
import React, {FC, useEffect, useState} from 'react';
import {StyleProp, TouchableHighlight, ViewStyle} from 'react-native';

import {ChannelLeaveChannelMutation} from '../../../__generated__/ChannelLeaveChannelMutation.graphql';
import Modal from 'react-native-modalbox';
import {getString} from '../../../../STRINGS';
import {leaveChannel} from '../../../relay/queries/Channel';
import {showAlertForError} from '../../../utils/common';
import styled from '@emotion/native';
import {useMutation} from 'react-relay';
import {useSnackbarContext} from '../../../providers';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalViewContainer = styled.View`
  width: 330px;
  height: 60%;
  background-color: ${({theme}) => theme.modalBackbround};
  border: ${({theme}) => theme.modalBtnPrimaryFont};
  border-radius: 20px;
  border-width: 1.5px;
  justify-content: center;
  align-items: center;
`;

const ModalBtnContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  width: 80%;

  justify-content: space-between;
`;

const ModalBtnStyle = styled.View`
  background-color: ${({theme}) => theme.primary};
  border-radius: 10px;
  opacity: 0.8;
  width: 120px;
  height: 40px;

  justify-content: center;
  align-items: center;
`;

const ModalBtnText = styled.Text`
  color: ${({theme}) => theme.light};
  font-weight: bold;
  font-size: 18px;
`;

const ModalText = styled.Text`
  color: ${({theme}) => theme.text};
  opacity: 1;
  font-weight: bold;
  font-size: 22px;
`;

interface Styles {
  wrapper: StyleProp<ViewStyle>;
}

const styles: Styles = {
  wrapper: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    height: 320,
    width: '90%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

type ModalContentProps = {
  ChannelModalState: ChannelModalState & {isVisible: true};
  hideModal: LeaveChannelModalContext['hideModal'];
};

const ChannelModalContent: FC<ModalContentProps> = ({
  ChannelModalState,
  hideModal,
}) => {
  const {openSnackbar} = useSnackbarContext();

  const [leaveChannelUpdate, isLeaveChannelComplete] =
    useMutation<ChannelLeaveChannelMutation>(leaveChannel);

  const [showLeaveChannelMessage, setLeaveChannelMessage] =
    useState<boolean>(false);

  const onClickYes = (): void => {
    const {channelId} = ChannelModalState;
    console.log('onClick');

    const mutationConfig = {
      variables: {
        channelId,
      },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
      onCompleted: (): void => {
        setLeaveChannelMessage(true);
        hideModal();
      },
    };

    leaveChannelUpdate(mutationConfig);
  };

  useEffect(() => {
    if (openSnackbar && showLeaveChannelMessage)
      openSnackbar({
        text: getString('LEAVE_THE_CHANNEL'),
        type: 'success',
        testID: 'profile-snackbar',
        zIndex: 101,
      });
  }, [openSnackbar, showLeaveChannelMessage]);

  return (
    <ModalContainer>
      <ModalViewContainer>
        <ModalText>{getString('LEAVE_CHANNEL')}</ModalText>
        <ModalBtnContainer>
          <TouchableHighlight
            onPress={() => {
              onClickYes();
            }}>
            <ModalBtnStyle>
              <ModalBtnText>
                <ModalBtnText>{getString('YES')}</ModalBtnText>
              </ModalBtnText>
            </ModalBtnStyle>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              hideModal();
            }}>
            <ModalBtnStyle>
              <ModalBtnText>
                <ModalBtnText>{getString('NO')}</ModalBtnText>
              </ModalBtnText>
            </ModalBtnStyle>
          </TouchableHighlight>
        </ModalBtnContainer>
      </ModalViewContainer>
    </ModalContainer>
  );
};

interface Props {
  testID?: string;
}

const LeaveChannelModal: FC<Props> = () => {
  const LeaveChannelContext = useLeaveChannelContext();
  const {modalState} = LeaveChannelContext;

  return (
    <Modal
      isOpen={modalState.isVisible}
      backdropOpacity={0.075}
      entry={'top'}
      position={'center'}
      onClosed={LeaveChannelContext.hideModal}
      style={styles.wrapper}>
      {modalState.isVisible ? (
        <ChannelModalContent
          hideModal={LeaveChannelContext.hideModal}
          ChannelModalState={modalState}
        />
      ) : null}
    </Modal>
  );
};

export default LeaveChannelModal;
