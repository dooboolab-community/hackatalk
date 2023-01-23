import type {
  LeaveChannelModalContext,
  LeaveChannelModalState,
} from '../../../providers/LeaveChannelModalProvider';
import React, {useEffect, useState} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {TouchableHighlight, View} from 'react-native';
import {Typography, TypographyInverted} from 'dooboo-ui';

import type {ChannelLeaveChannelMutation} from '../../../__generated__/ChannelLeaveChannelMutation.graphql';
import type {FC} from 'react';
import Modal from 'react-native-modalbox';
import type {RecordSourceSelectorProxy} from 'relay-runtime';
import {deleteChannelAndUpdate} from '../../../relay/updaters';
import {getString} from '../../../../STRINGS';
import {leaveChannel} from '../../../relay/queries/Channel';
import {normalizeErrorString} from '../../../relay/util';
import {showAlertForError} from '../../../utils/common';
import styled from '@emotion/native';
import {useLeaveChannelContext} from '../../../providers/LeaveChannelModalProvider';
import {useMutation} from 'react-relay';
import {useSnackbarContext} from '../../../providers';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalViewContainer = styled.View`
  padding: 40px;
  background-color: ${({theme}) => theme.bg.basic};
  border: ${({theme}) => theme.role.primary};
  border-width: 0.3px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ModalBtnContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;

  justify-content: space-between;
`;

const ModalBtnStyle = styled.View`
  background-color: ${({theme}) => theme.role.primary};
  opacity: 0.8;
  width: 120px;
  height: 40px;

  justify-content: center;
  align-items: center;
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
  leaveChannelModalState: LeaveChannelModalState & {isVisible: true};
  hideModal: LeaveChannelModalContext['hideModal'];
};

const ChannelModalContent: FC<ModalContentProps> = ({
  leaveChannelModalState,
  hideModal,
}) => {
  const {openSnackbar} = useSnackbarContext();

  const [leftChannel] = useMutation<ChannelLeaveChannelMutation>(leaveChannel);

  const [showLeaveChannelMessage, setLeaveChannelMessage] =
    useState<boolean>(false);

  const onClickYes = (): void => {
    const {channelId} = leaveChannelModalState;

    const mutationConfig = {
      variables: {channelId},
      updater: (store: RecordSourceSelectorProxy<{}>) => {
        deleteChannelAndUpdate(store, channelId);
      },
      onError: (error: Error) => {
        showAlertForError(normalizeErrorString(error));
      },
      onCompleted: () => {
        setLeaveChannelMessage(true);
        hideModal();
      },
    };

    leftChannel(mutationConfig);
  };

  useEffect(() => {
    if (openSnackbar && showLeaveChannelMessage) {
      openSnackbar({
        content: {text: getString('LEAVE_CHANNEL_DONE')},
        type: 'success',
        testID: 'profile-snackbar',
        zIndex: 99,
      });
    }
  }, [openSnackbar, showLeaveChannelMessage]);

  return (
    <ModalContainer>
      <ModalViewContainer>
        <Typography.Heading2>
          {getString('LEAVE_CHANNEL_CONFIRMATION')}
        </Typography.Heading2>
        <ModalBtnContainer>
          <TouchableHighlight
            testID="leave-channel-modal"
            underlayColor="none"
            onPress={() => {
              onClickYes();
            }}
          >
            <ModalBtnStyle>
              <TypographyInverted.Body1>
                {getString('YES')}
              </TypographyInverted.Body1>
            </ModalBtnStyle>
          </TouchableHighlight>
          <View style={{width: 8}} />
          <TouchableHighlight
            underlayColor="none"
            onPress={() => {
              hideModal();
            }}
          >
            <ModalBtnStyle>
              <TypographyInverted.Body1>
                {getString('NO')}
              </TypographyInverted.Body1>
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
      style={styles.wrapper}
    >
      {modalState.isVisible ? (
        <ChannelModalContent
          hideModal={LeaveChannelContext.hideModal}
          leaveChannelModalState={modalState}
        />
      ) : null}
    </Modal>
  );
};

export default LeaveChannelModal;
