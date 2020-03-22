import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Ionicons } from '@expo/vector-icons';
import { MUTATION_ADD_FRIEND } from '../../graphql/mutations';
import Modal from 'react-native-modalbox';
import { QUERY_FRIENDS } from '../../graphql/queries';
import { User } from '../../types';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

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

const StyledTextBtn = styled.Text`
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
}

export interface Ref {
  open: () => void;
  close: () => void;
  setUser: (user: User) => void;
  showAddBtn: (show: boolean) => void;
  setIsFriendAdded: (isFriendAdded: boolean) => void;
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
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [isFriendAdded, setIsFriendAdded] = useState(false);
  const [user, setUser] = useState<User>({
    nickname: '',
    id: '',
    thumbURL: '',
    photoURL: '',
    statusMessage: '',
    isOnline: false,
  });

  const [addFriendMutation] = useMutation<
  { addFriend: User },
  { friendId: string }
  >(MUTATION_ADD_FRIEND, {
    refetchQueries: () => [{ query: QUERY_FRIENDS }],
  });

  const { loading, data, error } = useQuery<{
    friends: User[];
  }>(QUERY_FRIENDS, {
    fetchPolicy: 'network-only',
  });

  const open = (): void => {
    setIsFriendAdded(false);
    if (modal) {
      modal.open();
    }
  };

  const close = (): void => {
    if (modal) {
      modal.close();
    }
  };

  const addFriend = (): void => {
    addFriendMutation({
      variables: {
        friendId: user.id,
      },
      // refetchQueries: [QUERY_FRIENDS],
    });
    if (modal) {
      modal.close();
    }
  };

  const deleteFriend = (): void => {
    if (modal) {
      modal.close();
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
  }));

  const { photoURL = '', nickname, statusMessage } = user;
  const {
    theme: { primary, modalBtnPrimaryFont },
  } = useThemeContext();
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
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={goToProfile}
          >
            {photoURL ? (
              <StyledImage style={{ alignSelf: 'center' }} source={imageURL} />
            ) : (
              <View
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
            )}
          </TouchableOpacity>
          <StyledTextDisplayName numberOfLines={1}>
            {nickname}
          </StyledTextDisplayName>
          <StyledTextstatusMessage>{statusMessage}</StyledTextstatusMessage>
        </StyledView>
        {isFriendAdded ? (
          <StyledTextFriendAdded testID="added-message">
            {getString('FRIEND_ADDED')}
          </StyledTextFriendAdded>
        ) : data?.friends?.find((friend) => friend.id === user?.id) ? (
          <StyledTextFriendAlreadyAdded testID="already-added-message">
            {getString('FRIEND_ALREADY_ADDED')}
          </StyledTextFriendAlreadyAdded>
        ) : null}
        <StyledViewBtns>
          <TouchableOpacity
            testID="btn-ad-friend"
            activeOpacity={0.5}
            onPress={showAddBtn ? addFriend : deleteFriend}
            style={styles.viewBtn}
          >
            <View style={styles.viewBtn}>
              <StyledTextBtn testID="btn-ad-title">
                {showAddBtn
                  ? getString('ADD_FRIEND')
                  : getString('DELETE_FRIEND')}
              </StyledTextBtn>
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
              <StyledTextBtn
                style={{
                  color: modalBtnPrimaryFont,
                }}
              >
                {getString('CHAT')}
              </StyledTextBtn>
            </View>
          </TouchableOpacity>
        </StyledViewBtns>
      </View>
    </Modal>
  );
});

export default Shared;
