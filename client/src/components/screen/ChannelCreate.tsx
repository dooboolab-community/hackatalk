import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ChannelCreateFriendsPaginationQuery,
  ChannelCreateFriendsPaginationQueryVariables,
} from '../../__generated__/ChannelCreateFriendsPaginationQuery.graphql';
import {
  IC_CIRCLE_X,
  IC_NO_IMAGE,
} from '../../utils/Icons';
import React, { FC, ReactElement, Suspense, useMemo, useState } from 'react';
import { User, UserEdge } from '../../types/graphql';
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay/hooks';

import { ChannelCreateFriendsQuery } from '../../__generated__/ChannelCreateFriendsQuery.graphql';
import { ChannelCreate_friends$key } from '../../__generated__/ChannelCreate_friends.graphql';
import ErroView from '../shared/ErrorView';
import { LoadingIndicator } from 'dooboo-ui';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import SearchTextInput from '../shared/SearchTextInput';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import produce from 'immer';
import styled from 'styled-components/native';
import useDebounce from '../../hooks/useDebounce';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/theme';

const ITEM_CNT = 20;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.backgroundDark};
  flex-direction: column;
`;

const FriendThumbView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
`;

interface ChannelCreate extends User {
  checked?: boolean;
}

const friendsQuery = graphql`
  query ChannelCreateFriendsQuery($first: Int!, $after: String, $searchText: String) {
    ...ChannelCreate_friends @arguments(first: $first, after: $after, searchText: $searchText)
  }
`;

const friendsFragment = graphql`
  fragment ChannelCreate_friends on Query
    @argumentDefinitions(
      first: {type: "Int!"}
      after: {type: "String"}
      searchText: {type: "String"}
    )
    @refetchable(queryName: "ChannelCreateFriendsPaginationQuery") {
      friends(first: $first, after: $after searchText: $searchText)
      @connection(key: "ChannelCreate_friends") {
        edges {
          cursor
          node {
            id
            email
            name
            nickname
            thumbURL
            photoURL
            birthday
            gender
            phone
            statusMessage
            verified
            lastSignedIn
            isOnline
            createdAt
            updatedAt
            deletedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
`;

type FriendsFragmentProps = {
  friend: ChannelCreate_friends$key,
  scrollY: Animated.Value,
  searchArgs: ChannelCreateFriendsPaginationQueryVariables,
};

const FriendsFragment: FC<FriendsFragmentProps> = ({
  friend,
}) => {
  const {
    data,
    loadNext,
    isLoadingNext,
    refetch,
  } = usePaginationFragment<ChannelCreateFriendsPaginationQuery, ChannelCreate_friends$key>(
    friendsFragment,
    friend,
  );

  const friends = useMemo(() => {
    return data.friends.edges?.filter(
      (x): x is NonNullable<typeof x> => x !== null,
    ) || [];
  }, [data]);

  const { theme } = useThemeContext();
  // const [friends, setFriends] = useState<Friend[]>(fakeFriends);

  const navigation = useNavigation();

  // const renderFriendThumbnail = (friend: Friend, index: number): ReactElement => {
  //   return <FriendThumbView key={friend.id}>
  //     <View
  //       style={{
  //         marginTop: 12,
  //         marginRight: 16,
  //         marginBottom: 6,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Image
  //         style={{
  //           width: 60,
  //           height: 60,
  //         }}
  //         source={
  //           friend.thumbURL
  //             ? { uri: friend.thumbURL }
  //             : IC_NO_IMAGE
  //         }
  //       />
  //       <Text
  //         numberOfLines={1}
  //         style={{
  //           fontSize: 12,
  //           color: theme.fontColor,
  //         }}
  //       >{friend.nickname}</Text>
  //     </View>
  //     <TouchableOpacity
  //       testID={`remove-${index}`}
  //       style={{
  //         position: 'absolute',
  //         top: 0,
  //         right: 0,
  //       }}
  //       onPress={(): void => removeFriend(friend)}
  //     >
  //       <Image source={IC_CIRCLE_X} style={{ width: 32, height: 32 }}/>
  //     </TouchableOpacity>
  //   </FriendThumbView>;
  // };

  const renderItem = ({
    item,
    index,
  }: {
    item: UserEdge;
    index: number;
  }): ReactElement => {
    // const testID = `user-id-${index}`;
    // const userListOnPressInlineFn = (): void => userListOnPress(item.node as User);

    return (
      <UserListItem
        testID={`userlist_${index}`}
        showCheckBox
        // checked={item.checked}
        // @ts-ignore
        user={item.node}
        onPress={(): void => {
          // const nextState = produce(friends, (draftState) => {
          //   draftState[index].checked = !item.checked;
          // });

          // setFriends(nextState);
        }}
      />
    );
  };

  return (
    <Container>
      <FlatList
        style={{ alignSelf: 'stretch' }}
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
        renderItem={renderItem}
        // ListHeaderComponent={(): ReactElement => {
        //   const filtered = friends.filter((v) => (v.checked === true));

        //   return <ScrollView
        //     style={{ paddingHorizontal: 24, marginBottom: 12 }}
        //     horizontal
        //   >
        //     {filtered.map((friend, i) => renderFriendThumbnail(friend, i))}
        //   </ScrollView>;
        // }}
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
};

interface ContentProps {
  scrollY: Animated.Value,
  searchArgs: ChannelCreateFriendsPaginationQueryVariables;
}

const ContentContainer: FC<ContentProps> = ({
  searchArgs,
  scrollY,
}) => {
  const queryResponse = useLazyLoadQuery<ChannelCreateFriendsQuery>(
    friendsQuery,
    { first: ITEM_CNT },
    { fetchPolicy: 'store-or-network' },
  );

  return <FriendsFragment
    friend={queryResponse}
    scrollY={scrollY}
    searchArgs={searchArgs}
  />;
};

interface ChannelCreateProps {
  navigation: RootStackNavigationProps<'default'>;
}

const ChannelCreate: FC<ChannelCreateProps> = (props) => {
  const { navigation } = props;
  const [searchText, setSearchText] = useState<string>('');
  const debouncedText = useDebounce(searchText, 500);
  const scrollY = new Animated.Value(0);

  const searchArgs: ChannelCreateFriendsPaginationQueryVariables = {
    first: ITEM_CNT,
    searchText: debouncedText,
  };

  const onChangeText = (text: string): void => {
    setSearchText(text);
    scrollY.setValue(0);

    Animated.timing(scrollY, {
      useNativeDriver: true,
      toValue: 100,
      duration: 500,
    }).start();
  };

  // const onChangeText = (text: string): void => {
  //   if (!text) {
  //     setFriends(fakeFriends);
  //   } else {
  //     const filtered = friends.filter((v) => (v.name?.includes(searchText)));

  //     setFriends(filtered);
  //   }

  //   setSearchText(text);
  // };

  // const removeFriend = (friend: Friend): void => {
  //   const nextState = produce(friends, (draftState) => {
  //     const index = friends.findIndex((v) => v.id === friend.id);

  //     draftState[index].checked = !friend.checked;
  //   });

  //   setFriends(nextState);
  // };

  // const pressDone = (): void => {
  //   const filtered = friends.filter((v) => (v.checked === true));

  //   console.log('filtered', filtered);
  // };

  navigation.setOptions({
    headerRight: (): ReactElement => (
      <TouchableOpacity
        testID="touch-done"
        // onPress={pressDone}
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

  return (
    <Container>
      <SearchTextInput
        testID="text-input"
        onChangeText={onChangeText}
        containerStyle={{
          marginVertical: 12,
        }}
        value={searchText}
      />
      <Suspense fallback={<LoadingIndicator/>}>
        <ContentContainer scrollY={scrollY} searchArgs={searchArgs}/>
      </Suspense>
    </Container>
  );
};

export default ChannelCreate;
