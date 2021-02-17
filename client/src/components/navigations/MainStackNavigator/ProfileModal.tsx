import {Alert, TouchableOpacity, View, ViewStyle} from 'react-native';
import {
  ChannelFindOrCreatePrivateChannelMutation,
  ChannelFindOrCreatePrivateChannelMutationResponse,
} from '../../../__generated__/ChannelFindOrCreatePrivateChannelMutation.graphql';
import {LoadingIndicator, useTheme} from 'dooboo-ui';
import {
  ProfileModalContext,
  useProfileContext,
} from '../../../providers/ProfileModalProvider';
import React, {FC, useState} from 'react';
import {
  addFriendMutation,
  deleteFriendMutation,
} from '../../../relay/queries/Friend';
import {
  createBlockedUserMutation,
  deleteBlockedUserMutation,
} from '../../../relay/queries/BlockedUser';

import {BlockedUserCreateMutation} from '../../../__generated__/BlockedUserCreateMutation.graphql';
import {BlockedUserDeleteMutation} from '../../../__generated__/BlockedUserDeleteMutation.graphql';
import {ConnectionHandler} from 'relay-runtime';
import {FontAwesome} from '@expo/vector-icons';
import {FriendAddMutation} from '../../../__generated__/FriendAddMutation.graphql';
import {FriendDeleteMutation} from '../../../__generated__/FriendDeleteMutation.graphql';
import {IC_NO_IMAGE} from '../../../utils/Icons';
import Modal from 'react-native-modalbox';
import {findOrCreatePrivateChannel} from '../../../relay/queries/Channel';
import {getString} from '../../../../STRINGS';
import {showAlertForError} from '../../../utils/common';
import styled from 'styled-components/native';
import {useMutation} from 'react-relay/hooks';
import {useNavigation} from '@react-navigation/core';

const StyledView = styled.View`
  margin-top: 64px;
`;

const StyledImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const StyledViewBtns = styled.View`
  height: 48px;
  align-self: stretch;
  background-color: ${({theme}) => theme.modalBtnBackground};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledViewBtnDivider = styled.View`
  width: 0.5px;
  height: 48px;
  background-color: ${({theme}) => theme.placeholder};
`;

const StyledTextDisplayName = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-top: 16px;
  padding: 0 32px;
  align-self: center;
`;

const StyledTextstatusMessage = styled.Text`
  font-size: 12px;
  color: white;
  margin-top: 8px;
  align-self: center;
`;

const StyledText = styled.Text`
  color: ${({theme}) => theme.modalBtnFont};
  font-size: 16px;
`;

const StyledTextFriendAdded = styled.Text`
  color: ${({theme}) => theme.tintColor};
  font-size: 12px;
  background-color: ${({theme}) => theme.background};
  padding: 4px;
`;

const StyledTextFriendAlreadyAdded = styled.Text`
  color: ${({theme}) => theme.negative};
  font-size: 12px;
  background-color: ${({theme}) => theme.background};
  padding: 4px;
`;

interface Styles {
  wrapper: ViewStyle;
  viewBtn: ViewStyle;
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
  viewBtn: {
    width: '50%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

type ModalContentProps = {
  isVisible: boolean;
} & ProfileModalContext;

const ModalContent: FC<ModalContentProps> = ({
  modalState,
  hideModal,
}: ModalContentProps) => {
  const [showFriendAddedMessage, setShowFriendAddedMessage] = useState<boolean>(
    false,
  );

  const navigation = useNavigation();

  const [
    commitChannel,
    isChannelInFlight,
  ] = useMutation<ChannelFindOrCreatePrivateChannelMutation>(
    findOrCreatePrivateChannel,
  );

  const [commitAddFriend, addFriendInFlight] = useMutation<FriendAddMutation>(
    addFriendMutation,
  );

  const [
    commitDeleteFriend,
    deleteFriendInFlight,
  ] = useMutation<FriendDeleteMutation>(deleteFriendMutation);

  const [
    commitCreateBlockedUser,
    isCreateBlockedUserInFlight,
  ] = useMutation<BlockedUserCreateMutation>(createBlockedUserMutation);

  const [
    commitDeleteBlockedUser,
    isDeleteBlockedUserInFlight,
  ] = useMutation<BlockedUserDeleteMutation>(deleteBlockedUserMutation);

  const addFriend = async (): Promise<void> => {
    if (modalState) {
      const {user, onAddFriend} = modalState;

      commitAddFriend({
        variables: {friendId: user.id},
        updater: (proxyStore) => {
          const root = proxyStore.getRoot();

          const connectionRecord =
            root && ConnectionHandler.getConnection(root, 'Friend_friends');

          const userProxy = proxyStore.get(user.id);

          const newEdge =
            connectionRecord &&
            userProxy &&
            ConnectionHandler.createEdge(
              proxyStore,
              connectionRecord,
              userProxy,
              'User',
            );

          if (connectionRecord && newEdge)
            ConnectionHandler.insertEdgeAfter(connectionRecord, newEdge);
        },
      });

      if (onAddFriend) onAddFriend();

      setShowFriendAddedMessage(true);
    }
  };

  const deleteFriend = async (): Promise<void> => {
    if (modalState) {
      const {user, onDeleteFriend} = modalState;

      commitDeleteFriend({
        variables: {friendId: user.id},
        updater: (proxyStore) => {
          const root = proxyStore.getRoot();

          const connectionRecord =
            root && ConnectionHandler.getConnection(root, 'Friend_friends');

          if (connectionRecord)
            ConnectionHandler.deleteNode(connectionRecord, user.id);
        },
      });

      if (onDeleteFriend) onDeleteFriend();

      hideModal();
    }
  };

  const createBlockedUser = (): void => {
    const blockedUserId = modalState?.user?.id;

    if (blockedUserId)
      commitCreateBlockedUser({
        variables: {blockedUserId},
      });

    hideModal();
  };

  const deleteBlockedUser = (): void => {
    const blockedUserId = modalState?.user?.id;

    if (blockedUserId)
      commitDeleteBlockedUser({
        variables: {blockedUserId},
      });

    hideModal();
  };

  const startChatting = (): void => {
    const user = modalState?.user;

    if (user) {
      const mutationConfig = {
        variables: {
          peerUserIds: [user.id],
        },
        onCompleted: (
          response: ChannelFindOrCreatePrivateChannelMutationResponse,
        ): void => {
          const channel = response.findOrCreatePrivateChannel;

          hideModal();

          navigation.navigate('Message', {
            users: [user],
            channel,
          });
        },
        onError: (error: Error): void => {
          showAlertForError(error);
        },
      };

      commitChannel(mutationConfig);
    }
  };

  const {
    theme: {header, modalBtnPrimaryFont},
  } = useTheme();

  const imageURL =
    typeof modalState?.user.photoURL === 'string' &&
    modalState?.user.photoURL !== 'null'
      ? {uri: modalState?.user.photoURL}
      : modalState?.user.photoURL;

  return (
    <View
      style={{
        height: 300,
        marginHorizontal: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: header,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 4,
          right: 8,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          testID="touch-done"
          onPress={() => {
            navigation.navigate('Report', {
              name:
                modalState?.user.nickname ||
                modalState?.user.name ||
                getString('NO_NAME'),
              userId: modalState?.user.id,
            });

            hideModal();
          }}>
          <View
            style={{
              paddingRight: 12,
              paddingLeft: 8,
              paddingVertical: 8,
            }}>
            <FontAwesome name="exclamation-circle" size={24} color="white" />
          </View>
        </TouchableOpacity>
        {isCreateBlockedUserInFlight || isDeleteBlockedUserInFlight ? (
          <View
            style={{
              paddingRight: 16,
              paddingLeft: 8,
              paddingVertical: 8,
              justifyContent: 'center',
            }}>
            <LoadingIndicator size="small" />
          </View>
        ) : (
          <TouchableOpacity
            testID="touch-done"
            onPress={(): void =>
              Alert.alert(
                modalState?.user.hasBlocked
                  ? getString('UNBAN_USER')
                  : getString('BAN_USER'),
                modalState?.user.hasBlocked
                  ? getString('UNBAN_USER_TEXT')
                  : getString('BAN_USER_TEXT'),
                [
                  {
                    text: getString('NO'),
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: getString('YES'),
                    onPress: modalState?.user.hasBlocked
                      ? deleteBlockedUser
                      : createBlockedUser,
                  },
                ],
                {cancelable: false},
              )
            }>
            <View
              style={{
                paddingRight: 16,
                paddingLeft: 8,
                paddingVertical: 8,
              }}>
              <FontAwesome
                name="ban"
                size={24}
                color={modalState?.user.hasBlocked ? 'red' : 'white'}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <StyledView>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            const user = modalState?.user;

            if (user)
              navigation.navigate('ImageSlider', {
                images: [{uri: user.photoURL, sender: user.name}],
              });
          }}>
          {modalState?.user.photoURL ? (
            <StyledImage
              style={{alignSelf: 'center'}}
              source={imageURL || IC_NO_IMAGE}
            />
          ) : (
            <View
              style={{
                width: 80,
                height: 80,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <StyledImage style={{alignSelf: 'center'}} source={IC_NO_IMAGE} />
            </View>
          )}
        </TouchableOpacity>
        <StyledTextDisplayName numberOfLines={1}>
          {modalState?.user.nickname ||
            modalState?.user.name ||
            getString('NO_NAME')}
        </StyledTextDisplayName>
        <StyledTextstatusMessage>
          {modalState?.user.statusMessage}
        </StyledTextstatusMessage>
      </StyledView>
      {showFriendAddedMessage ? (
        addFriendInFlight ? (
          <LoadingIndicator size="small" />
        ) : modalState?.isFriend ? (
          <StyledTextFriendAlreadyAdded testID="already-added-message">
            {getString('FRIEND_ALREADY_ADDED')}
          </StyledTextFriendAlreadyAdded>
        ) : (
          <StyledTextFriendAdded testID="added-message">
            {getString('FRIEND_ADDED')}
          </StyledTextFriendAdded>
        )
      ) : null}
      {!modalState?.hideButtons ? (
        <StyledViewBtns>
          {deleteFriendInFlight ? (
            <LoadingIndicator size="small" />
          ) : (
            <TouchableOpacity
              testID="touch-add-friend"
              activeOpacity={0.5}
              onPress={modalState?.isFriend ? deleteFriend : addFriend}
              style={styles.viewBtn}>
              <View style={styles.viewBtn}>
                <StyledText testID="text-add-title">
                  {modalState?.isFriend
                    ? getString('DELETE_FRIEND')
                    : getString('ADD_FRIEND')}
                </StyledText>
              </View>
            </TouchableOpacity>
          )}
          <StyledViewBtnDivider />
          <TouchableOpacity
            testID="btn-chat"
            activeOpacity={0.5}
            onPress={startChatting}
            style={styles.viewBtn}>
            {isChannelInFlight ? (
              <LoadingIndicator size="small" />
            ) : (
              <View style={styles.viewBtn}>
                <StyledText
                  style={{
                    color: modalBtnPrimaryFont,
                  }}>
                  {getString('CHAT')}
                </StyledText>
              </View>
            )}
          </TouchableOpacity>
        </StyledViewBtns>
      ) : null}
    </View>
  );
};

interface Props {
  testID?: string;
}

const ProfileModal: FC<Props> = () => {
  const profileContext = useProfileContext();
  const {isVisible, hideModal} = profileContext;

  return (
    <Modal
      isOpen={isVisible}
      backdropOpacity={0.075}
      entry={'top'}
      position={'center'}
      /*
       * `hideModal` should be called on closed event,
       * because `Modal` cannot update its props by itself.
       * If `hideModal` is not called on closed event,
       * `Modal` gets into an illegal state where `isOpen`
       * props is true while the internal state is closed.
       */
      onClosed={hideModal}
      style={styles.wrapper}>
      {profileContext.isVisible ? <ModalContent {...profileContext} /> : null}
    </Modal>
  );
};

export default ProfileModal;
