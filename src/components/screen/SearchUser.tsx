import { Animated, FlatList } from 'react-native';
import { IC_BACK, IC_ICON, IC_SEARCH } from '../../utils/Icons';
// @flow
import React, { useContext, useState } from 'react';

import EmptyListItem from '../shared/EmptyListItem';
import { User as Friend } from '../../models/User';
import { ProfileModalContext } from '../../providers/ProfileModalProvider';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const userSampleData = [
  {
    uid: '1',
    displayName: 'test',
    photoURL: null,
    statusMsg: 'status',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
  {
    uid: '2',
    displayName: 'geoseong',
    photoURL: IC_BACK,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
  {
    uid: '3',
    displayName: 'hyochan',
    photoURL: IC_ICON,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
  {
    uid: '4',
    displayName: 'test',
    photoURL: null,
    statusMsg: 'status',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
  {
    uid: '5',
    displayName: 'geoseong',
    photoURL: IC_BACK,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
  {
    uid: '6',
    displayName: 'hyochan',
    photoURL: IC_ICON,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
  {
    uid: '7',
    displayName: 'test',
    photoURL: null,
    statusMsg: 'status',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
  {
    uid: '8',
    displayName: 'geoseong',
    photoURL: IC_BACK,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
  {
    uid: '9',
    displayName: 'hyochan',
    photoURL: IC_ICON,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  },
];
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;
const StyledContainer = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledSearchView = styled.View`
  width: 100%;
  height: 50;
  justify-content: center;
  overflow: hidden;
`;
const StyledAnimatedFlatList = styled(AnimatedFlatList)`
  width: 100%;
  height: 100%;
`;
const StyledTextInputWrapper = styled.View`
  width: 100%;
  height: 50;
  position: absolute;
  padding-horizontal: 20;
`;
const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 30;
  top: 10;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.searchBackground};
  border-radius: 4;
  padding-left: 34;
  padding-right: 10;
`;
const StyledSearchImage = styled.Image`
  width: 16;
  height: 16;
  position: absolute;
  top: 18;
  left: 30;
`;

interface Props {
  navigation: any;
}
interface State {
  users: Friend[];
  searchedUsers: Friend[];
}

function Screen(props: Props) {
  const profileModal = useContext(ProfileModalContext);
  const [searchedUsers, setSearchedUsers] = useState(userSampleData);
  const [users, setUsers] = useState(userSampleData);
  const scrollY = new Animated.Value(0);

  const userListOnPress = (item: Friend) => {
    if (profileModal && profileModal.dispatch) {
      profileModal.dispatch({
        type: 'show-modal',
        payload: { user: item, deleteMode: true },
      });
    }
  };
  const renderItem = ({ item, index }: { item: Friend; index: number }) => {
    return (
      <UserListItem
        testID={`userListItem${index}`}
        testObj={{ profileModal }}
        user={item}
        onPress={() => userListOnPress(item)}
      />
    );
  };
  const onTxtChanged = (txt: string) => {
    onSearch(txt);
    scrollY.setValue(0);
    Animated.timing(scrollY, {
      toValue: 100,
      duration: 500,
    }).start();
  };
  const onSearch = (txt: string) => {
    const searchedUser =
      txt === ''
        ? searchedUsers
        : searchedUsers.filter((item) => item.displayName.includes(txt));
    setUsers(searchedUser);
  };
  const getContentContainerStyle = () => {
    return users.length === 0
      ? {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }
      : null;
  };
  return (
    <StyledSafeAreaView>
      <StyledContainer>
        <StyledSearchView>
          <StyledTextInputWrapper>
            <StyledTextInput
              testID='txtInput'
              onChangeText={onTxtChanged}
              underlineColorAndroid='transparent' // android fix
              autoCapitalize='none'
              autoCorrect={false}
              multiline={false}
              defaultValue={''}
            />
            <StyledSearchImage source={IC_SEARCH} />
          </StyledTextInputWrapper>
        </StyledSearchView>
        <StyledAnimatedFlatList
          testID='animatedFlatlist'
          testObj={{ scrollY }}
          style={{
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 50, 100],
                  outputRange: [0, 25, 0],
                }),
              },
            ],
          }}
          contentContainerStyle={getContentContainerStyle}
          keyExtractor={(item, index: number) => index.toString()}
          data={users}
          renderItem={renderItem}
          ListEmptyComponent={
            <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
          }
        />
      </StyledContainer>
    </StyledSafeAreaView>
  );
}

export default Screen;
