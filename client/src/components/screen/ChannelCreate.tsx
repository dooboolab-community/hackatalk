import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Channel, User, UserConnection, UserEdge } from '../../types/graphql';
import {
  ChannelCreateFindOrCreatePrivateChannelMutation,
  ChannelCreateFindOrCreatePrivateChannelMutationResponse,
} from '../../__generated__/ChannelCreateFindOrCreatePrivateChannelMutation.graphql';
import {
  ChannelCreateFriendsPaginationQuery,
  ChannelCreateFriendsPaginationQueryVariables,
} from '../../__generated__/ChannelCreateFriendsPaginationQuery.graphql';
import { IC_CIRCLE_X, IC_NO_IMAGE } from '../../utils/Icons';
import React, { FC, ReactElement, Suspense, useMemo, useState } from 'react';
import {
  graphql,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from 'react-relay/hooks';

import { ChannelCreateFriendsQuery } from '../../__generated__/ChannelCreateFriendsQuery.graphql';
import { ChannelCreate_friends$key } from '../../__generated__/ChannelCreate_friends.graphql';
import ErroView from '../shared/ErrorView';
import { LoadingIndicator } from 'dooboo-ui';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import SearchTextInput from '../shared/SearchTextInput';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import produce from 'immer';
import { showAlertForError } from '../../utils/common';
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

const findOrCreatePrivateChannel = graphql`
  mutation ChannelCreateFindOrCreatePrivateChannelMutation(
    $peerUserIds: [String!]!
  ) {
    findOrCreatePrivateChannel(peerUserIds: $peerUserIds) {
      id
      name
      channelType
    }
  }
`;

const friendsQuery = graphql`
  query ChannelCreateFriendsQuery(
    $first: Int!
    $after: String
    $searchText: String
  ) {
    ...ChannelCreate_friends
      @arguments(first: $first, after: $after, searchText: $searchText)
  }
`;

const friendsFragment = graphql`
  fragment ChannelCreate_friends on Query
  @argumentDefinitions(
    first: { type: "Int!" }
    after: { type: "String" }
    searchText: { type: "String" }
  )
  @refetchable(queryName: "ChannelCreateFriendsPaginationQuery") {
    friends(first: $first, after: $after, searchText: $searchText)
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
          hasBlocked
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
  friend: ChannelCreate_friends$key;
  scrollY: Animated.Value;
  searchArgs: ChannelCreateFriendsPaginationQueryVariables;
  selectedUsers: User[];
  setSelectedUsers: (users: User[]) => void;
};

const FriendsFragment: FC<FriendsFragmentProps> = ({
  friend,
  selectedUsers,
  setSelectedUsers,
}) => {
  const { data } = usePaginationFragment<
    ChannelCreateFriendsPaginationQuery,
    ChannelCreate_friends$key
  >(friendsFragment, friend);

  const friendEdges = useMemo(() => {
    return (
      (data.friends as UserConnection).edges?.filter(
        (x): x is NonNullable<typeof x> => x !== null,
      ) || []
    );
  }, [data]);

  const { theme } = useThemeContext();
  // const [friends, setFriends] = useState<Friend[]>(fakeFriends);

  const navigation = useNavigation();

  const removeFriend = (friendArg: User): void => {
    const nextState = produce(selectedUsers, (draftState) => {
      const index = selectedUsers.findIndex((v) => v.id === friendArg.id);

      draftState.splice(index, 1);
    });

    setSelectedUsers(nextState);
  };

  const renderFriendThumbnail = (
    friendArg: User,
    index: number,
  ): ReactElement => {
    return (
      <FriendThumbView key={friendArg.id}>
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
            source={
              friendArg.thumbURL ? { uri: friendArg.thumbURL } : IC_NO_IMAGE
            }
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              marginTop: 4,
              color: theme.fontColor,
            }}
          >
            {friendArg.nickname || friendArg.name}
          </Text>
        </View>
        <TouchableOpacity
          testID={`remove-${index}`}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onPress={(): void => removeFriend(friendArg)}
        >
          <Image source={IC_CIRCLE_X} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
      </FriendThumbView>
    );
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: UserEdge;
    index: number;
  }): ReactElement => {
    return (
      <UserListItem
        testID={`userlist_${index}`}
        showCheckBox
        checked={selectedUsers.includes(item?.node as User)}
        // @ts-ignore
        user={item.node}
        onPress={(): void => {
          if (selectedUsers.includes(item?.node as User)) {
            const nextState = produce(selectedUsers, (draftState) => {
              const selectedUserIndex = selectedUsers.findIndex(
                (v) => v.id === item?.node?.id,
              );

              draftState.splice(selectedUserIndex, 1);
            });

            setSelectedUsers(nextState);

            return;
          }

          const nextState = produce(selectedUsers, (draftState) => {
            draftState.push(item.node as User);
          });

          setSelectedUsers(nextState);
        }}
      />
    );
  };

  return (
    <Container>
      <FlatList
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={
          friendEdges.length === 0
            ? {
                flex: 1,
                alignSelf: 'stretch',
                flexDirection: 'column',
              }
            : null
        }
        keyExtractor={(_, index): string => index.toString()}
        data={friendEdges as UserEdge[]}
        renderItem={renderItem}
        ListHeaderComponent={(): ReactElement => {
          return (
            <ScrollView
              style={{ paddingHorizontal: 24, marginBottom: 12 }}
              horizontal
            >
              {selectedUsers.map((selectedUser, i) =>
                renderFriendThumbnail(selectedUser, i),
              )}
            </ScrollView>
          );
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
};

interface ContentProps {
  scrollY: Animated.Value;
  searchArgs: ChannelCreateFriendsPaginationQueryVariables;
  selectedUsers: User[];
  setSelectedUsers: (users: User[]) => void;
}

const ContentContainer: FC<ContentProps> = ({
  searchArgs,
  scrollY,
  selectedUsers,
  setSelectedUsers,
}) => {
  const queryResponse = useLazyLoadQuery<ChannelCreateFriendsQuery>(
    friendsQuery,
    searchArgs,
    { fetchPolicy: 'store-or-network' },
  );

  return (
    <FriendsFragment
      friend={queryResponse}
      scrollY={scrollY}
      searchArgs={searchArgs}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
    />
  );
};

interface ChannelCreateProps {
  navigation: MainStackNavigationProps<'ChannelCreate'>;
}

const ChannelCreate: FC<ChannelCreateProps> = (props) => {
  const { navigation } = props;
  const [searchText, setSearchText] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const debouncedText = useDebounce(searchText, 500);
  const scrollY = new Animated.Value(0);

  const [
    commitChannel,
    isChannelInFlight,
  ] = useMutation<ChannelCreateFindOrCreatePrivateChannelMutation>(
    findOrCreatePrivateChannel,
  );

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

  const pressDone = (): void => {
    const userIds = selectedUsers.map((v) => v.id);

    const mutationConfig = {
      variables: {
        peerUserIds: userIds,
      },
      onCompleted: (
        response: ChannelCreateFindOrCreatePrivateChannelMutationResponse,
      ): void => {
        const channel = response.findOrCreatePrivateChannel as Channel;

        navigation.replace('Message', {
          channel,
          users: selectedUsers,
        });
      },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
    };

    commitChannel(mutationConfig);
  };

  navigation.setOptions({
    headerRight: (): ReactElement => (
      <TouchableOpacity testID="touch-done" onPress={pressDone}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            {getString('DONE')}
          </Text>
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
      <Suspense fallback={<LoadingIndicator />}>
        <ContentContainer
          scrollY={scrollY}
          searchArgs={searchArgs}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </Suspense>
      {isChannelInFlight ? <LoadingIndicator /> : null}
    </Container>
  );
};

export default ChannelCreate;
