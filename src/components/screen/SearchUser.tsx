import { Animated, FlatList } from 'react-native';
import { IC_BACK, IC_ICON, IC_SEARCH, IC_SMILE } from '../../utils/Icons';
import React, { useState } from 'react';

import EmptyListItem from '../shared/EmptyListItem';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useStateValue } from '../../contexts';

export const userSampleData: User[] = [
  {
    uid: '1',
    displayName: 'admin',
    thumbURL: IC_BACK,
    photoURL: IC_BACK,
    statusMsg: 'online',
    online: true,
    // created: new Date(),
    // updated: new Date(),
  },
  {
    uid: '2',
    displayName: 'geoseong',
    thumbURL: IC_ICON,
    photoURL: IC_ICON,
    statusMsg: 'offline',
    online: false,
  },
  {
    uid: '3',
    displayName: 'hyochan',
    thumbURL: IC_BACK,
    photoURL: IC_BACK,
    statusMsg: 'offline',
    online: false,
  },
  {
    uid: '4',
    displayName: 'mars',
    thumbURL: IC_SEARCH,
    photoURL: IC_SEARCH,
    statusMsg: 'offline',
    online: true,
  },
  {
    uid: '5',
    displayName: 'gordon',
    thumbURL: IC_SMILE,
    photoURL: IC_SMILE,
    statusMsg: 'offline',
    online: true,
  },
  {
    uid: '6',
    displayName: 'admin2',
    thumbURL: IC_BACK,
    photoURL: IC_BACK,
    statusMsg: 'online',
    online: true,
    // created: new Date(),
    // updated: new Date(),
  },
  {
    uid: '7',
    displayName: 'geoseong2',
    thumbURL: IC_ICON,
    photoURL: IC_ICON,
    statusMsg: 'offline',
    online: false,
  },
  {
    uid: '8',
    displayName: 'hyochan2',
    thumbURL: IC_BACK,
    photoURL: IC_BACK,
    statusMsg: 'offline',
    online: false,
  },
  {
    uid: '9',
    displayName: 'mars2',
    thumbURL: IC_SEARCH,
    photoURL: IC_SEARCH,
    statusMsg: 'offline',
    online: true,
  },
  {
    uid: '10',
    displayName: 'gordon2',
    thumbURL: IC_SMILE,
    photoURL: IC_SMILE,
    statusMsg: 'offline',
    online: true,
  },
];
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
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
  color: ${({ theme }): string => theme.fontColor};
  background-color: ${({ theme }): string => theme.background};
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

const Screen = (): React.ReactElement => {
  const [{ profileModal }, dispatch] = useStateValue();
  const [searchedUsers, setSearchedUsers] = useState<User[]>(userSampleData);
  const [users, setUsers] = useState<User[]>(userSampleData);
  const scrollY = new Animated.Value(0);

  const userListOnPress = (item: User): void => {
    if (profileModal) {
      dispatch({
        type: 'show-modal',
        payload: { user: item, deleteMode: true },
      });
    }
  };
  const renderItem = ({
    item,
    index,
  }: {
    item: User;
    index: number;
  }): React.ReactElement => {
    // const itemTestID = `USER_ID`;
    const itemTestID = `userListItem${index}`;
    const userListOnPressInlineFn = (): void => userListOnPress(item);
    return (
      <UserListItem
        testID={itemTestID}
        user={item}
        onPress={userListOnPressInlineFn}
      />
    );
    // return (
    //   <UserListItem
    //     testID={`userListItem${index}`}
    //     testObj={{ profileModal }}
    //     user={item}
    //     onPress={userListOnPressInlineFn}
    //   />
    // );
  };
  const onSearch = (txt: string): void => {
    const searchedUser =
      txt === ''
        ? searchedUsers
        : searchedUsers.filter((item) => item.displayName.includes(txt));
    setUsers(searchedUser);
  };
  const onTxtChanged = (txt: string): void => {
    onSearch(txt);
    scrollY.setValue(0);
    Animated.timing(scrollY, {
      toValue: 100,
      duration: 500,
    }).start();
  };
  const getContentContainerStyle = (): object | null => {
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
          keyExtractor={(item: object, index: number): string =>
            index.toString()
          }
          data={users}
          renderItem={renderItem}
          ListEmptyComponent={
            <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
          }
        />
      </StyledContainer>
    </StyledSafeAreaView>
  );
};

export default Screen;
