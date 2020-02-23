import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactElement, useState } from 'react';

import ErroView from '../shared/ErrorView';
import {
  IC_CIRCLE_X,
} from '../../utils/Icons';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import SearchTextInput from '../shared/SearchTextInput';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import produce from 'immer';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

export const fakeFriends: User[] = [
  {
    id: '1',
    nickname: 'admin',
    thumbURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
    statusMessage: 'this is my status message......',
    isOnline: true,
  },
  {
    id: '2',
    nickname: 'geoseong-hello-hello-hello-hello-hello-hello-hello-hello',
    thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
    statusMessage: 'hi I am fine',
    isOnline: false,
  },
  {
    id: '3',
    nickname: 'hyochan',
    thumbURL: 'https://avatars2.githubusercontent.com/u/27461460?s=460&v=4',
    photoURL: 'https://avatars2.githubusercontent.com/u/27461460?s=460&v=4',
    statusMessage: 'hello',
    isOnline: false,
  },
  {
    id: '4',
    nickname: 'mars',
    thumbURL: 'https://avatars0.githubusercontent.com/u/6101260?s=460&v=4',
    photoURL: 'https://avatars0.githubusercontent.com/u/6101260?s=460&v=4',
    statusMessage: 'offline',
    isOnline: true,
  },
  {
    id: '5',
    nickname: 'gordon',
    thumbURL: 'https://avatars0.githubusercontent.com/u/10363850?s=460&v=4',
    photoURL: 'https://avatars0.githubusercontent.com/u/10363850?s=460&v=4',
    statusMessage: 'offline',
    isOnline: true,
  },
  {
    id: '6',
    nickname: 'admin2',
    thumbURL: 'https://avatars3.githubusercontent.com/u/31645570?s=200&v=4',
    photoURL: 'https://avatars3.githubusercontent.com/u/31645570?s=200&v=4',
    statusMessage: 'how are you',
    isOnline: true,
  },
  {
    id: '7',
    nickname: 'geoseong2',
    thumbURL:
      'https://blogpfthumb-phinf.pstatic.net/20151226_89/imf4_1451062410452TqxER_JPEG/20120428000007_1.jpg',
    photoURL:
      'https://blogpfthumb-phinf.pstatic.net/20151226_89/imf4_1451062410452TqxER_JPEG/20120428000007_1.jpg',
    statusMessage: 'offline',
    isOnline: false,
  },
  {
    id: '8',
    nickname: 'hyochan2',
    thumbURL:
      'https://i.ytimg.com/vi/NgKSEvqzYvo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWBWqCeP5oTwaB6XMRGXEhvbIiIA',
    photoURL:
      'https://i.ytimg.com/vi/NgKSEvqzYvo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAWBWqCeP5oTwaB6XMRGXEhvbIiIA',
    statusMessage: 'offline',
    isOnline: false,
  },
  {
    id: '9',
    nickname: 'mars2',
    thumbURL:
      'https://github.com/marsinearth/violin-mockup/blob/master/static/favicons/android-chrome-192x192.png?raw=true',
    photoURL:
      'https://github.com/marsinearth/violin-mockup/blob/master/static/favicons/android-chrome-192x192.png?raw=true',
    statusMessage: 'offline',
    isOnline: true,
  },
  {
    id: '10',
    nickname: 'gordon2',
    thumbURL:
      'https://miro.medium.com/fit/c/256/256/2*rbUkfoA5vfuphYYULjIG_Q.png',
    photoURL:
      'https://miro.medium.com/fit/c/256/256/2*rbUkfoA5vfuphYYULjIG_Q.png',
    statusMessage: 'offline',
    isOnline: true,
  },
];

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const FriendThumbView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
`;

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

interface Friend extends User {
  checked?: boolean;
}

function Page(props: Props): ReactElement {
  const { navigation } = props;
  const { theme } = useThemeContext();
  const [searchText, setSearchText] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>(fakeFriends);

  const pressDone = (): void => {
    const filtered = friends.filter((v) => (v.checked === true));
    console.log('filtered', filtered);
  };

  navigation.setOptions({
    headerRight: (): ReactElement => (
      <TouchableOpacity
        testID="touch-done"
        onPress={pressDone}
      >
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
          <Text style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
          }}>{getString('DONE')}</Text>
        </View>
      </TouchableOpacity>
    ),
  });

  const onChangeText = (text: string): void => {
    setSearchText(text);
  };

  const renderFriends = ({
    item,
    index,
  }: {
    item: Friend;
    index: number;
  }): React.ReactElement => {
    const itemTestID = `user-list-item${index}`;
    return (
      <UserListItem
        testID={itemTestID}
        showCheckBox
        checked={item.checked}
        user={item}
        onPress={(): void => {
          const nextState = produce(friends, (draftState) => {
            draftState[index].checked = !item.checked;
          });
          setFriends(nextState);
        }}
      />
    );
  };

  const removeFriend = (friend: Friend): void => {
    const nextState = produce(friends, (draftState) => {
      const index = friends.findIndex((v) => v.id === friend.id);
      draftState[index].checked = !friend.checked;
    });
    setFriends(nextState);
  };

  const renderFriendThumbnail = (friend: Friend, index: number): ReactElement => {
    return <FriendThumbView key={friend.id}>
      <View
        style={{
          marginTop: 12,
          marginRight: 16,
          marginBottom: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
          }}
          source={{ uri: friend.thumbURL }}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: theme.fontColor,
          }}
        >{friend.nickname}</Text>
      </View>
      <TouchableOpacity
        testID={`remove-${index}`}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        onPress={(): void => removeFriend(friend)}
      >
        <Image source={IC_CIRCLE_X} style={{ width: 32, height: 32 }}/>
      </TouchableOpacity>
    </FriendThumbView>;
  };

  return (
    <Container>
      <SearchTextInput
        testID="text-input"
        onChangeText={onChangeText}
        value={searchText}
      />
      <FlatList
        style={{
          alignSelf: 'stretch',
        }}
        contentContainerStyle={
          friends.length === 0
            ? {
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }
            : null
        }
        keyExtractor={(_, index): string => index.toString()}
        data={friends}
        renderItem={renderFriends}
        ListHeaderComponent={(): ReactElement => {
          const filtered = friends.filter((v) => (v.checked === true));
          return <ScrollView
            style={{ paddingHorizontal: 24 }}
            horizontal
          >
            {filtered.map((friend, i) => renderFriendThumbnail(friend, i))}
          </ScrollView>;
        }}
        ListEmptyComponent={
          <ErroView
            testID="btn-error"
            title={getString('NO_FRIEND')}
            body={getString('NO_FRIEND_BODY')}
            buttonText={getString('GO_BACK')}
            onButtonPressed={(): void => navigation.goBack()}
          />
        }
      />
    </Container>
  );
}

export default Page;
