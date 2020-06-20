import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { IC_NO_IMAGE } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import { User } from '../../types/graphql';
import { getString } from '../../../STRINGS';
import { showAlertForGrpahqlError } from '../../utils/common';
import styled from 'styled-components/native';
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

interface Props {
  testID?: string;
  ref?: React.MutableRefObject<Modal | null>;
  onChatPressed?: () => void;
  onAddFriend?: () => void;
  onDeleteFriend?: () => void;
}

export interface Ref {
  open: () => void;
  close: () => void;
  setUser: (user: User) => void;
  showAddBtn: (show: boolean) => void;
  setIsFriendAdded: (isFriendAdded: boolean) => void;
  deleteFriend: () => Promise<void>;
  addFriend: () => void;
  modal: Modal | null;
}

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

const Shared = forwardRef<Ref, Props>((props, ref) => {
  let modal: Modal | null;

  const {
    testID,
    onChatPressed,
    onAddFriend,
    onDeleteFriend,
  } = props;

  // const [
  //   deleteFriendMutation,
  //   { error: deleteFriendError, loading: deleteFriendLoading },
  // ] = useMutation<{ deleteFriend: FriendPayload }, AddOrDeleteFriendInput>(MUTATION_DELETE_FRIEND, {
  //   refetchQueries: [{ query: QUERY_FRIENDS }],
  // });

  // const [addFriendMutation] = useMutation<{ addFriend: FriendPayload }, AddOrDeleteFriendInput>(MUTATION_ADD_FRIEND, {
  //   refetchQueries: () => [{ query: QUERY_FRIENDS }],
  // });

  const [hasFriendBeenAdded, setHasFriendBeenAdded] = useState<boolean>(false);
  const [showAddBtn, setShowAddBtn] = useState<boolean>(true);
  const [isFriendAdded, setIsFriendAdded] = useState<boolean>(false);

  const [user, setUser] = useState<User>({
    nickname: '',
    id: '',
    thumbURL: '',
    photoURL: '',
    statusMessage: '',
    isOnline: false,
  });

  const open = (): void => {
    setIsFriendAdded(false);
    setHasFriendBeenAdded(false);
    if (modal) {
      modal.open();
    }
  };

  const close = (): void => {
    if (modal) {
      modal.close();
    }
  };

  const addFriend = async (): Promise<void> => {
    if (onAddFriend) { onAddFriend(); }

    if (modal) {
      modal.close();
    }

    try {
      // const result = await addFriendMutation({
      //   variables: {
      //     friendId: user.id,
      //   },
      //   // refetchQueries: [QUERY_FRIENDS],
      // });

      // setHasFriendBeenAdded(result.data?.addFriend.added || false);
    } catch ({ graphQLErrors }) {
      showAlertForGrpahqlError(graphQLErrors);
    }
  };

  const deleteFriend = async (): Promise<void> => {
    if (props.onDeleteFriend) { props.onDeleteFriend(); }

    if (modal) {
      modal.close();
    }

    const variables = {
      friendId: user.id,
    };

    try {
      // await deleteFriendMutation({ variables });
    } catch ({ graphQLErrors }) {
      showAlertForGrpahqlError(graphQLErrors);
    }
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
    setUser,
    showAddBtn: (flag: boolean): void => {
      setShowAddBtn(flag);
    },
    setIsFriendAdded,
    deleteFriend,
    addFriend,
    modal,
  }));

  const { photoURL = '', nickname, name, statusMessage } = user;
  const { theme: { primary, modalBtnPrimaryFont } } = useThemeContext();
  const imageURL = typeof photoURL === 'string' ? { uri: photoURL } : photoURL;

  return (
    <Modal
      ref={(v): Modal | null => (modal = v)}
      backdropOpacity={0.075}
      entry={'top'}
      position={'center'}
      style={styles.wrapper}
    >
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
          isFriendAdded
            ? <StyledTextFriendAdded testID="added-message">
              {getString('FRIEND_ADDED')}
            </StyledTextFriendAdded>
            : hasFriendBeenAdded
              ? <StyledTextFriendAlreadyAdded testID="already-added-message">
                {getString('FRIEND_ALREADY_ADDED')}
              </StyledTextFriendAlreadyAdded>
              : null
        }
        <StyledViewBtns>
          <TouchableOpacity
            testID="touch-add-friend"
            activeOpacity={0.5}
            onPress={showAddBtn ? addFriend : deleteFriend}
            style={styles.viewBtn}
          >
            <View style={styles.viewBtn}>
              <StyledText testID="text-add-title">
                {
                  showAddBtn
                    ? getString('ADD_FRIEND')
                    : getString('DELETE_FRIEND')
                }
              </StyledText>
            </View>
          </TouchableOpacity>
          <StyledViewBtnDivider />
          <TouchableOpacity
            testID="btn-chat"
            activeOpacity={0.5}
            onPress={props.onChatPressed}
            style={styles.viewBtn}
          >
            <View style={styles.viewBtn}>
              <StyledText style={{
                color: modalBtnPrimaryFont,
              }}>{getString('CHAT')}</StyledText>
            </View>
          </TouchableOpacity>
        </StyledViewBtns>
      </View>
    </Modal>
  );
});
export default Shared;
