import {Animated, TouchableOpacity, View} from 'react-native';
import React, {FC, ReactElement, Suspense, useState} from 'react';
import type {
  UserUsersPaginationQuery,
  UserUsersPaginationQueryResponse,
  UserUsersPaginationQueryVariables,
} from '../../__generated__/UserUsersPaginationQuery.graphql';
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay/hooks';

import EmptyListItem from '../UI/molecules/EmptyListItem';
import {FontAwesome} from '@expo/vector-icons';
import {LoadingIndicator} from 'dooboo-ui';
import SearchTextInput from '../UI/atoms/SearchTextInput';
import type {SearchUserComponent_user$key} from '../../__generated__/SearchUserComponent_user.graphql';
import {User} from '../../types/graphql';
import UserListItem from '../UI/molecules/UserListItem';
import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';
import useDebounce from '../../hooks/useDebounce';
import {useNavigation} from '@react-navigation/native';
import {useProfileContext} from '../../providers/ProfileModalProvider';
import {usersQuery} from '../../relay/queries/User';

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({theme}) => theme.background};
`;

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
`;

const StyledFlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

const ITEM_CNT = 10;

const usersFragment = graphql`
  fragment SearchUserComponent_user on Query
  @argumentDefinitions(
    first: {type: "Int"}
    after: {type: "String"}
    searchText: {type: "String"}
  )
  @refetchable(queryName: "SearchUsersQuery") {
    users(first: $first, after: $after, searchText: $searchText)
      @connection(key: "SearchUserComponent_users") {
      edges {
        cursor
        node {
          id
          email
          name
          nickname
          hasBlocked
          photoURL
          thumbURL
          statusMessage
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

type UserProps = {
  scrollY: Animated.Value;
  user: SearchUserComponent_user$key;
  searchArgs: UserUsersPaginationQueryVariables;
};

const UsersFragment: FC<UserProps> = ({user, searchArgs}) => {
  const {data, loadNext, isLoadingNext, refetch} = usePaginationFragment<
    UserUsersPaginationQuery,
    SearchUserComponent_user$key
  >(usersFragment, user);

  const {showModal} = useProfileContext();

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: {node: User; cursor: string};
    index: number;
  }): React.ReactElement => {
    const itemTestID = `user-list-item${index}`;

    const pressUserItem = (): void => {
      showModal({
        user: item.node,
        isFriend: false,
      });
    };

    return (
      <UserListItem
        testID={itemTestID}
        user={item?.node}
        onPress={pressUserItem}
      />
    );
  };

  const users = data?.users?.edges || [];

  return (
    <StyledFlatList
      testID="animated-flatlist"
      contentContainerStyle={
        users.length === 0
          ? {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }
          : undefined
      }
      keyExtractor={(item, index): string => index.toString()}
      data={users}
      // @ts-ignore
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListItem>{getString('NO_RECENT_SEARCH')}</EmptyListItem>
      }
      refreshing={isLoadingNext}
      onRefresh={() => {
        refetch(searchArgs, {fetchPolicy: 'network-only'});
      }}
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
      scrollEventThrottle={500}
    />
  );
};

interface ContentProps {
  scrollY: Animated.Value;
  searchArgs: UserUsersPaginationQueryVariables;
}

const ContentContainer: FC<ContentProps> = ({searchArgs, scrollY}) => {
  const data: UserUsersPaginationQueryResponse = useLazyLoadQuery<UserUsersPaginationQuery>(
    usersQuery,
    searchArgs,
    {fetchPolicy: 'store-or-network'},
  );

  return (
    <UsersFragment scrollY={scrollY} user={data} searchArgs={searchArgs} />
  );
};

const Screen: FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedText = useDebounce(searchText, 500);
  const scrollY = new Animated.Value(0);
  const navigation = useNavigation();

  navigation.setOptions({
    headerRight: (): ReactElement => (
      <TouchableOpacity onPress={() => navigation.navigate('BlockedUser')}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <FontAwesome name="ban" size={24} color="white" />
        </View>
      </TouchableOpacity>
    ),
  });

  const searchArgs: UserUsersPaginationQueryVariables = {
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

  return (
    <StyledSafeAreaView>
      <Container>
        <SearchTextInput
          testID="text-input"
          containerStyle={{marginTop: 12}}
          onChangeText={onChangeText}
          value={searchText}
        />
        <Suspense fallback={<LoadingIndicator />}>
          <ContentContainer scrollY={scrollY} searchArgs={searchArgs} />
        </Suspense>
      </Container>
    </StyledSafeAreaView>
  );
};

export default Screen;
