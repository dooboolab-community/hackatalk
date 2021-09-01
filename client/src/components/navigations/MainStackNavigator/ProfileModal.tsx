import {
  Alert,
  Animated,
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  ChannelFindOrCreatePrivateChannelMutation,
  ChannelFindOrCreatePrivateChannelMutationResponse,
} from '../../../__generated__/ChannelFindOrCreatePrivateChannelMutation.graphql';
import {IC_NO_IMAGE, IC_PROFILE_W} from '../../../utils/Icons';
import {LoadingIndicator, useTheme} from 'dooboo-ui';
import {
  ModalState,
  ProfileModalContext,
  useProfileContext,
} from '../../../providers/ProfileModalProvider';
import React, {FC, useRef, useState} from 'react';
import {
  addFriendMutation,
  deleteFriendMutation,
} from '../../../relay/queries/Friend';
import {
  createBlockedUserMutation,
  deleteBlockedUserMutation,
} from '../../../relay/queries/BlockedUser';
import {graphql, useFragment, useMutation} from 'react-relay';

import {BlockedUserCreateMutation} from '../../../__generated__/BlockedUserCreateMutation.graphql';
import {BlockedUserDeleteMutation} from '../../../__generated__/BlockedUserDeleteMutation.graphql';
import {ConnectionHandler} from 'relay-runtime';
import {FontAwesome} from '@expo/vector-icons';
import {FriendAddMutation} from '../../../__generated__/FriendAddMutation.graphql';
import {FriendDeleteMutation} from '../../../__generated__/FriendDeleteMutation.graphql';
import Modal from 'react-native-modalbox';
import {RootStackNavigationProps} from '../RootStackNavigator';
import StatusMessageView from '../../uis/StatusMessageView';
import {findOrCreatePrivateChannel} from '../../../relay/queries/Channel';
import {getString} from '../../../../STRINGS';
import {showAlertForError} from '../../../utils/common';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/core';

const fragment = graphql`
  fragment ProfileModal_user on User {
    id
    photoURL
    name
    nickname
    hasBlocked
    statusMessage
    isFriend
  }
`;

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

const StyledText = styled.Text`
  color: ${({theme}) => theme.modalBtnFont};
  font-size: 16px;
`;

interface Styles {
  wrapper: StyleProp<ViewStyle>;
  viewBtn: StyleProp<ViewStyle>;
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
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

type ModalContentProps = {
  modalState: ModalState & {isVisible: true};
  hideModal: ProfileModalContext['hideModal'];
};

const ModalContent: FC<ModalContentProps> = ({modalState, hideModal}) => {
  const userData = useFragment(fragment, modalState.user);

  const {id, name, nickname, statusMessage, photoURL, hasBlocked, isFriend} =
    userData;

  const [showFriendAddedMessage, setShowFriendAddedMessage] =
    useState<boolean>(false);

  // to animate opacity of the modal box
  const [modalLayout, setModalLayout] = useState<{
    width: number;
    height: number;
  }>({width: 0, height: 0});
  const [isStatusMessageExpanded, setStatusMessageExpanded] = useState(false);
  const transitionOpacity = useRef(new Animated.Value(0));

  const navigation = useNavigation<RootStackNavigationProps>();

  const [commitChannel, isChannelInFlight] =
    useMutation<ChannelFindOrCreatePrivateChannelMutation>(
      findOrCreatePrivateChannel,
    );

  const [commitAddFriend, addFriendInFlight] =
    useMutation<FriendAddMutation>(addFriendMutation);

  const [commitDeleteFriend, deleteFriendInFlight] =
    useMutation<FriendDeleteMutation>(deleteFriendMutation);

  const [commitCreateBlockedUser, isCreateBlockedUserInFlight] =
    useMutation<BlockedUserCreateMutation>(createBlockedUserMutation);

  const [commitDeleteBlockedUser, isDeleteBlockedUserInFlight] =
    useMutation<BlockedUserDeleteMutation>(deleteBlockedUserMutation);

  const addFriend = async (): Promise<void> => {
    const {onAddFriend} = modalState;

    commitAddFriend({
      variables: {friendId: id},
      updater: (proxyStore) => {
        const root = proxyStore.getRoot();

        const connectionRecord =
          root && ConnectionHandler.getConnection(root, 'MainFriend_friends');

        const userProxy = proxyStore.get(id);

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
  };

  const deleteFriend = async (): Promise<void> => {
    const {onDeleteFriend} = modalState;

    commitDeleteFriend({
      variables: {friendId: id},
      updater: (proxyStore) => {
        const root = proxyStore.getRoot();

        const connectionRecord =
          root && ConnectionHandler.getConnection(root, 'MainFriend_friends');

        if (connectionRecord)
          ConnectionHandler.deleteNode(connectionRecord, id);
      },
    });

    if (onDeleteFriend) onDeleteFriend();

    hideModal();
  };

  const createBlockedUser = (): void => {
    const blockedUserId = id;

    if (blockedUserId)
      commitCreateBlockedUser({
        variables: {blockedUserId},
      });

    hideModal();
  };

  const deleteBlockedUser = (): void => {
    const blockedUserId = id;

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
          peerUserIds: [id],
        },
        onCompleted: (
          response: ChannelFindOrCreatePrivateChannelMutationResponse,
        ): void => {
          const channel = response.findOrCreatePrivateChannel;

          if (channel) {
            hideModal();

            navigation.navigate('MainStack', {
              screen: 'Message',
              params: {
                channelId: channel.id,
              },
            });
          }
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

  const handleAnim = (): void =>
    setStatusMessageExpanded(!isStatusMessageExpanded);

  return (
    <>
      <View
        testID="container"
        style={{
          flex: 1,
          marginHorizontal: 20,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: header,
        }}
        onLayout={(event) => {
          const {width, height} = event.nativeEvent.layout;
          setModalLayout({width, height});
        }}>
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 8,
            flexDirection: 'row',
          }}>
          {modalState.isMyself ? (
            <TouchableOpacity
              testID="profile-update-button"
              style={{
                paddingRight: 16,
                paddingLeft: 8,
                paddingVertical: 8,
                justifyContent: 'center',
              }}
              activeOpacity={0.5}
              onPress={(): void => {
                navigation.navigate('MainStack', {
                  screen: 'ProfileUpdate',
                });
                hideModal();
              }}>
              <Image style={{height: 24, width: 24}} source={IC_PROFILE_W} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                testID="touch-done"
                onPress={() => {
                  navigation.navigate('MainStack', {
                    screen: 'Report',
                    params: {
                      name: nickname || name || getString('NO_NAME'),
                      userId: id,
                    },
                  });
                  hideModal();
                }}>
                <View
                  style={{
                    paddingRight: 12,
                    paddingLeft: 8,
                    paddingVertical: 8,
                  }}>
                  <FontAwesome
                    name="exclamation-circle"
                    size={24}
                    color="white"
                  />
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
                      hasBlocked
                        ? getString('UNBAN_USER')
                        : getString('BAN_USER'),
                      hasBlocked
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
                          onPress: hasBlocked
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
                      color={hasBlocked ? 'red' : 'white'}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <StyledView>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              const user = modalState?.user;

              if (user)
                navigation.navigate('ImageSlider', {
                  images: [{uri: photoURL, sender: name}],
                });
            }}>
            {photoURL ? (
              <StyledImage
                style={{alignSelf: 'center'}}
                source={{uri: photoURL}}
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
                <StyledImage
                  style={{alignSelf: 'center'}}
                  source={IC_NO_IMAGE}
                />
              </View>
            )}
          </TouchableOpacity>
          <StyledTextDisplayName numberOfLines={1}>
            {nickname || name || getString('NO_NAME')}
          </StyledTextDisplayName>
        </StyledView>

        {!modalState?.hideButtons ? (
          <StyledViewBtns>
            {!modalState.isMyself && (
              <>
                {deleteFriendInFlight ? (
                  <LoadingIndicator size="small" />
                ) : (
                  <TouchableOpacity
                    testID="touch-add-friend"
                    activeOpacity={0.5}
                    onPress={isFriend ? deleteFriend : addFriend}
                    style={styles.viewBtn}>
                    <StyledText testID="text-add-title">
                      {isFriend
                        ? getString('DELETE_FRIEND')
                        : getString('ADD_FRIEND')}
                    </StyledText>
                  </TouchableOpacity>
                )}
                <StyledViewBtnDivider />
              </>
            )}
            <TouchableOpacity
              testID="btn-chat"
              activeOpacity={0.5}
              onPress={startChatting}
              style={[
                styles.viewBtn,
                [modalState.isMyself ? {width: '100%'} : undefined],
              ]}>
              {isChannelInFlight ? (
                <LoadingIndicator size="small" />
              ) : (
                <StyledText
                  style={{
                    color: modalBtnPrimaryFont,
                  }}>
                  {modalState.isMyself
                    ? getString('SELF_CHAT')
                    : getString('CHAT')}
                </StyledText>
              )}
            </TouchableOpacity>
          </StyledViewBtns>
        ) : null}
      </View>
      <Animated.View
        testID="view-statusMessageView"
        style={{
          position: 'absolute',
          width: modalLayout.width,
          height: modalLayout.height - 48,
          zIndex: 1,
          top: 0,
          left: 20,
          backgroundColor: 'black',
          opacity: transitionOpacity.current,
        }}
        pointerEvents={isStatusMessageExpanded ? undefined : 'box-none'}
      />
      <StatusMessageView
        statusMessage={statusMessage || ''}
        transitionOpacity={transitionOpacity}
        modalLayout={modalLayout}
        isStatusMessageExpanded={isStatusMessageExpanded}
        handleAnim={handleAnim}
        showFriendAddedMessage={showFriendAddedMessage}
        addFriendInFlight={addFriendInFlight}
      />
    </>
  );
};

interface Props {
  testID?: string;
}

const ProfileModal: FC<Props> = () => {
  const profileContext = useProfileContext();
  const {modalState} = profileContext;

  return (
    <Modal
      isOpen={modalState.isVisible}
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
      onClosed={profileContext.hideModal}
      // @ts-ignore
      style={styles.wrapper}>
      {modalState.isVisible ? (
        <ModalContent
          hideModal={profileContext.hideModal}
          modalState={modalState}
        />
      ) : null}
    </Modal>
  );
};

export default ProfileModal;
