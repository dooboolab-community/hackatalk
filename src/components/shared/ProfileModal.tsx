import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modalbox';
import { User } from '../../types';
import { getString } from '../../../STRINGS';
import { useFriendContext } from '../../providers/FriendProvider';

const StyledView = styled.View`
  margin-top: 40px;
`;
const StyledImage = styled.Image`
  width: 80px;
  height: 80px;
`;

const StyledViewBtns = styled.View`
  height: 80px;
  align-self: stretch;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledViewBtnDivider = styled.View`
  width: 1px;
  height: 80px;
  background-color: ${({ theme }): string => theme.lineColor};
`;

const StyledTextDisplayName = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-top: 32px;
  align-self: center;
`;

const StyledTextStatusMsg = styled.Text`
  font-size: 12px;
  color: white;
  margin-top: 8px;
  align-self: center;
`;

const StyledTextBtn = styled.Text`
  color: ${({ theme }): string => theme.tintColor};
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

interface Props extends ThemeProps<DefaultTheme> {
  testID?: string;
  ref?: any;
  onChatPressed?: () => void;
}

interface Ref {
  open: () => void;
  close: () => void;
  setUser: (user: User) => void;
  setScreen: (screen: string) => void;
  showAddBtn: (show: boolean) => void;
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
  let modal: any;
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [isFriendAdded, setIsFriendAdded] = useState(false);
  const [isFriendAlreadyAdded, setIsFriendAlreadyAdded] = useState(false);
  const [user, setUser] = useState<User>({
    displayName: '',
    uid: '',
    thumbURL: '',
    photoURL: '',
    statusMsg: '',
    online: false,
  });
  const [screen, setScreen] = useState('');

  const {
    friendState: { friends },
    addFriend: ctxAddFriend,
    deleteFriend: ctxDeleteFriend,
  } = useFriendContext();

  const open = (): void => {
    setIsFriendAdded(false);
    setIsFriendAlreadyAdded(false);
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
    ctxAddFriend(user);
    if (screen === 'SearchUser') {
      setShowAddBtn(false);
      setIsFriendAdded(true);
    }
  };

  const deleteFriend = (): void => {
    ctxDeleteFriend(user);
    if (screen === 'SearchUser') {
      setShowAddBtn(true);
      setIsFriendAdded(false);
    }
    if (modal && screen !== 'SearchUser') {
      modal.close();
    }
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
    setUser: (newUser: User): void => {
      setUser(newUser);
    },
    showAddBtn: (flag: boolean): void => {
      setShowAddBtn(flag);
    },
    setScreen: (screen: string): void => {
      setScreen(screen);
    },
  }));
  const { photoURL, displayName, statusMsg } = user;
  const {
    theme: { primary, primaryLight },
  } = props;
  const imageURL = typeof photoURL === 'string' ? { uri: photoURL } : photoURL;
  return (
    <Modal
      ref={(v): Modal | null => (modal = v)}
      backdropOpacity={0.075}
      entry={'top'}
      position={'center'}
      style={styles.wrapper}
    >
      <LinearGradient
        style={{
          height: 320,
          marginHorizontal: 20,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        start={[0.4, 0.6]}
        end={[1.0, 0.8]}
        locations={[0, 0.85]}
        colors={[primary, primaryLight]}
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
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="ios-person" size={80} color="white" />
              </View>
            )}
          </TouchableOpacity>
          <StyledTextDisplayName>{displayName}</StyledTextDisplayName>
          <StyledTextStatusMsg>{statusMsg}</StyledTextStatusMsg>
        </StyledView>
        {isFriendAdded ? (
          <StyledTextFriendAdded>
            {getString('FRIEND_ADDED')}
          </StyledTextFriendAdded>
        ) : isFriendAlreadyAdded ? (
          <StyledTextFriendAlreadyAdded>
            {getString('FRIEND_ALREADY_ADDED')}
          </StyledTextFriendAlreadyAdded>
        ) : null}
        <StyledViewBtns>
          <TouchableOpacity
            testID="btn-add-or-delete"
            activeOpacity={0.5}
            onPress={showAddBtn ? addFriend : deleteFriend}
            style={styles.viewBtn}
          >
            <View style={styles.viewBtn}>
              <StyledTextBtn>
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
              <StyledTextBtn>{getString('CHAT')}</StyledTextBtn>
            </View>
          </TouchableOpacity>
        </StyledViewBtns>
      </LinearGradient>
    </Modal>
  );
});

export default withTheme(Shared);
