import { ProfileModalContext, useProfileContext } from '../../providers/ProfileModalProvider';
import {
  ProfileModalFindOrCreatePrivateChannelMutation,
  ProfileModalFindOrCreatePrivateChannelMutationResponse,
} from '../../__generated__/ProfileModalFindOrCreatePrivateChannelMutation.graphql';
import React, { FC, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { graphql, useMutation } from 'react-relay/hooks';

import { ConnectionHandler } from 'relay-runtime';
import { IC_NO_IMAGE } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import { LoadingIndicator } from 'dooboo-ui';
import Modal from 'react-native-modalbox';
import { ProfileModalAddFriendMutation } from '../../__generated__/ProfileModalAddFriendMutation.graphql';
import { ProfileModalDeleteFriendMutation } from '../../__generated__/ProfileModalDeleteFriendMutation.graphql';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { useThemeContext } from '@dooboo-ui/theme';

const StyledView = styled.View`
  margin-top: 40px;
`;

const StyledImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const StyledViewBtns = styled.View`
  height: 48px;
  align-self: stretch;
  background-color: ${({ theme }): string => theme.modalBtnBackground};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledViewBtnDivider = styled.View`
  width: 0.5px;
  height: 48px;
  background-color: ${({ theme }): string => theme.placeholder};
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
  color: ${({ theme }): string => theme.modalBtnFont};
  font-size: 16px;
`;

const StyledTextFriendAdded = styled.Text`
  color: ${({ theme }): string => theme.tintColor};
  font-size: 12px;
  background-color: ${({ theme }): string => theme.background};
  padding: 4px;
`;

const StyledTextFriendAlreadyAdded = styled.Text`
  color: red;
  font-size: 12px;
  background-color: ${({ theme }): string => theme.background};
  padding: 4px;
`;

const findOrCreatePrivateChannel = graphql`
  mutation ProfileModalFindOrCreatePrivateChannelMutation($peerUserId: String!) {
    findOrCreatePrivateChannel(peerUserId: $peerUserId) {
      id
      name
    }
  }
`;

const addFriendMutation = graphql`
  mutation ProfileModalAddFriendMutation($friendId: String!) {
    addFriend(friendId: $friendId) {
      friend {
        id
      }
    }
  }
`;

const deleteFriendMutation = graphql`
  mutation ProfileModalDeleteFriendMutation($friendId: String!) {
    deleteFriend(friendId: $friendId) {
      friend {
        id
      }
    }
  }
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
  isVisible: true,
} & ProfileModalContext;

const ModalContent: FC<ModalContentProps> = ({
  modalState: {
    user,
    isFriend,
    onAddFriend,
    onDeleteFriend,
  },
  hideModal,
}: ModalContentProps) => {
  const [showFriendAddedMessage, setShowFriendAddedMessage] = useState<boolean>(false);
  const navigation = useNavigation();

  const [commitChannel, isChannelInFlight] = useMutation<
    ProfileModalFindOrCreatePrivateChannelMutation
  >(findOrCreatePrivateChannel);

  const [commitAddFriend, addFriendInFlight] = useMutation<
    ProfileModalAddFriendMutation
  >(addFriendMutation);

  const [commitDeleteFriend, deleteFriendInFlight] = useMutation<
    ProfileModalDeleteFriendMutation
  >(deleteFriendMutation);

  const addFriend = async (): Promise<void> => {
    commitAddFriend({
      variables: { friendId: user.id },
      updater: (proxyStore) => {
        const root = proxyStore.getRoot();

        const connectionRecord = root && ConnectionHandler.getConnection(
          root,
          'Friend_friends',
        );

        const userProxy = proxyStore.get(user.id);

        const newEdge = connectionRecord && userProxy && ConnectionHandler.createEdge(
          proxyStore,
          connectionRecord,
          userProxy,
          'User',
        );

        if (connectionRecord && newEdge) {
          ConnectionHandler.insertEdgeAfter(connectionRecord, newEdge);
        }
      },
    });

    if (onAddFriend) {
      onAddFriend();
    }

    setShowFriendAddedMessage(true);
  };

  const deleteFriend = async (): Promise<void> => {
    commitDeleteFriend({
      variables: { friendId: user.id },
      updater: (proxyStore) => {
        const root = proxyStore.getRoot();

        const connectionRecord = root && ConnectionHandler.getConnection(
          root,
          'Friend_friends',
        );

        if (connectionRecord) {
          ConnectionHandler.deleteNode(connectionRecord, user.id);
        }
      },
    });

    if (onDeleteFriend) {
      onDeleteFriend();
    }

    hideModal();
  };

  const startChat = (): void => {
    const mutationConfig = {
      variables: {
        peerUserId: user.id,
      },
      onCompleted: (
        response: ProfileModalFindOrCreatePrivateChannelMutationResponse,
      ): void => {
        const channel = response.findOrCreatePrivateChannel;

        hideModal();

        navigation.navigate('Message', {
          user,
          channel,
        });
      },
      onError: (error: Error): void => {
        console.log('error', error);
      },
    };

    commitChannel(mutationConfig);
  };

  const { photoURL = '', nickname, name, statusMessage } = user;
  const { theme: { primary, modalBtnPrimaryFont } } = useThemeContext();
  const imageURL = typeof photoURL === 'string' ? { uri: photoURL } : photoURL;

  return (
    <View
      style={{
        height: 300,
        marginHorizontal: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: primary,
      }}
    >
      <StyledView>
        <TouchableOpacity activeOpacity={0.5}>
          {
            photoURL
              ? <StyledImage style={{ alignSelf: 'center' }} source={
                imageURL
                  ? { uri: imageURL }
                  : IC_NO_IMAGE
              } />
              : <View
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="ios-person" size={80} color="white" />
              </View>
          }
        </TouchableOpacity>
        <StyledTextDisplayName numberOfLines={1}>
          {nickname || name}
        </StyledTextDisplayName>
        <StyledTextstatusMessage>{statusMessage}</StyledTextstatusMessage>
      </StyledView>
      {
        showFriendAddedMessage
          ? addFriendInFlight
            ? <LoadingIndicator size="small" />
            : isFriend
              ? <StyledTextFriendAlreadyAdded testID="already-added-message">
                {getString('FRIEND_ALREADY_ADDED')}
              </StyledTextFriendAlreadyAdded>
              : <StyledTextFriendAdded testID="added-message">
                {getString('FRIEND_ADDED')}
              </StyledTextFriendAdded>
          : null
      }
      <StyledViewBtns>
        {
          deleteFriendInFlight
            ? <LoadingIndicator size="small" />
            : <TouchableOpacity
              testID="touch-add-friend"
              activeOpacity={0.5}
              onPress={isFriend ? deleteFriend : addFriend}
              style={styles.viewBtn}
            >
              <View style={styles.viewBtn}>
                <StyledText testID="text-add-title">
                  {
                    isFriend
                      ? getString('DELETE_FRIEND')
                      : getString('ADD_FRIEND')
                  }
                </StyledText>
              </View>
            </TouchableOpacity>
        }
        <StyledViewBtnDivider />
        <TouchableOpacity
          testID="btn-chat"
          activeOpacity={0.5}
          onPress={startChat}
          style={styles.viewBtn}
        >
          {
            isChannelInFlight
              ? <LoadingIndicator size="small"/>
              : <View style={styles.viewBtn}>
                <StyledText style={{
                  color: modalBtnPrimaryFont,
                }}>{getString('CHAT')}</StyledText>
              </View>
          }
        </TouchableOpacity>
      </StyledViewBtns>
    </View>
  );
};

interface Props {
  testID?: string
}

const ProfileModal: FC<Props> = () => {
  const profileContext = useProfileContext();
  const { isVisible, hideModal } = profileContext;

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
      style={styles.wrapper}
    >
      {
        profileContext.isVisible
          ? <ModalContent {...profileContext} />
          : null
      }
    </Modal>
  );
};

export default ProfileModal;
