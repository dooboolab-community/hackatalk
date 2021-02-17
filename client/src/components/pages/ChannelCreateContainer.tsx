import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {Channel, User, UserConnection} from '../../types/graphql';
import {
  ChannelCreateFriendsPaginationQuery,
  ChannelCreateFriendsPaginationQueryVariables,
} from '../../__generated__/ChannelCreateFriendsPaginationQuery.graphql';
import {
  ChannelFindOrCreatePrivateChannelMutation,
  ChannelFindOrCreatePrivateChannelMutationResponse,
} from '../../__generated__/ChannelFindOrCreatePrivateChannelMutation.graphql';
import React, {FC, ReactElement, Suspense, useMemo, useState} from 'react';
import {
  graphql,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from 'react-relay/hooks';

import ChannelCreateTemp from '../templates/ChannelCreateTemp';
import {ChannelCreate_friends$key} from '../../__generated__/ChannelCreate_friends.graphql';
import {FriendsQuery} from '../../__generated__/FriendsQuery.graphql';
import {LoadingIndicator} from 'dooboo-ui';
import {MainStackNavigationProps} from '../navigations/MainStackNavigator';
import SearchTextInput from '../UI/atoms/SearchTextInput';
import {findOrCreatePrivateChannel} from '../../relay/queries/Channel';
import {friendsQuery} from '../../relay/queries/Friend';
import {getString} from '../../../STRINGS';
import {showAlertForError} from '../../utils/common';
import styled from 'styled-components/native';
import useDebounce from '../../hooks/useDebounce';

const ITEM_CNT = 20;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundDark};
  flex-direction: column;
`;

interface ChannelCreate extends User {
  checked?: boolean;
}

const friendsFragment = graphql`
  fragment ChannelCreate_friends on Query
  @argumentDefinitions(
    first: {type: "Int!"}
    after: {type: "String"}
    searchText: {type: "String"}
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
  scrollY,
  searchArgs,
  selectedUsers,
  setSelectedUsers,
}) => {
  const {data} = usePaginationFragment<
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

  // const [friends, setFriends] = useState<Friend[]>(fakeFriends);

  return (
    <ChannelCreateTemp
      friendEdges={friendEdges}
      selectedUsers={selectedUsers}
      setSelectedUsers={setSelectedUsers}
    />
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
  const queryResponse = useLazyLoadQuery<FriendsQuery>(
    friendsQuery,
    searchArgs,
    {fetchPolicy: 'store-or-network'},
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
  const {navigation} = props;
  const [searchText, setSearchText] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const debouncedText = useDebounce(searchText, 500);
  const scrollY = new Animated.Value(0);

  const [
    commitChannel,
    isChannelInFlight,
  ] = useMutation<ChannelFindOrCreatePrivateChannelMutation>(
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
        response: ChannelFindOrCreatePrivateChannelMutationResponse,
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
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
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
