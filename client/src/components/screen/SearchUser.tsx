import { Animated, FlatList } from 'react-native';
import React, { FC, Suspense, useState } from 'react';
import type {
  SearchUsersPaginationQuery,
  SearchUsersPaginationQueryResponse,
  SearchUsersPaginationQueryVariables,
} from '../../__generated__/SearchUsersPaginationQuery.graphql';
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
  useRelayEnvironment,
} from 'react-relay/hooks';

import EmptyListItem from '../shared/EmptyListItem';
import { LoadingIndicator } from 'dooboo-ui';
import SearchTextInput from '../shared/SearchTextInput';
import type {
  SearchUserComponent_user$key,
} from '../../__generated__/SearchUserComponent_user.graphql';
import { User } from '../../types/graphql';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import useDebounce from '../../hooks/useDebounce';
import { useProfileContext } from '../../providers/ProfileModalProvider';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }): string => theme.background};
`;

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
`;

const StyledAnimatedFlatList = styled(AnimatedFlatList)`
  width: 100%;
  height: 100%;
`;

const ITEM_CNT = 10;

const usersQuery = graphql`
  query SearchUsersPaginationQuery($first: Int! $after: String $searchText: String) {
    ...SearchUserComponent_user @arguments(first: $first, after: $after, searchText: $searchText)
  }
`;

const usersFragment = graphql`
  fragment SearchUserComponent_user on Query
    @argumentDefinitions(
      first: {type: "Int"}
      after: {type: "String"}
      searchText: {type: "String"}
    )
    @refetchable(queryName: "SearchUsersQuery") {
      users(first: $first after: $after searchText: $searchText)
      @connection(key: "SearchUserComponent_users") {
        edges {
          cursor
          node {
            id
            email
            name
            nickname
            hasBlocked
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
  scrollY: Animated.Value,
  user: SearchUserComponent_user$key,
  searchArgs: SearchUsersPaginationQueryVariables;
}

const UsersFragment: FC<UserProps> = ({
  scrollY,
  user,
  searchArgs,
}) => {
  const {
    data,
    loadNext,
    isLoadingNext,
    refetch,
  } = usePaginationFragment<SearchUsersPaginationQuery, SearchUserComponent_user$key>(
    usersFragment,
    user,
  );

  const { showModal } = useProfileContext();

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { node: User, cursor: string };
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
    // @ts-ignore
    <StyledAnimatedFlatList
      testID="animated-flatlist"
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
      contentContainerStyle={
        users.length === 0
          ? {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }
          : undefined
      }
      keyExtractor={(item: Record<string, unknown>, index: number): string => index.toString()}
      data={users}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListItem>{getString('NO_RECENT_SEARCH')}</EmptyListItem>
      }
      refreshing={isLoadingNext}
      onRefresh={() => {
        refetch(searchArgs, { fetchPolicy: 'network-only' });
      }}
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
      scrollEventThrottle={500}
    />
  );
};

interface ContentProps {
  scrollY: Animated.Value,
  searchArgs: SearchUsersPaginationQueryVariables;
}

const ContentContainer: FC<ContentProps> = ({
  searchArgs,
  scrollY,
}) => {
  const data: SearchUsersPaginationQueryResponse =
    useLazyLoadQuery<SearchUsersPaginationQuery>(
      usersQuery,
      searchArgs,
      { fetchPolicy: 'store-or-network' },
    );

  return <UsersFragment
    scrollY={scrollY}
    user={data}
    searchArgs={searchArgs}
  />;
};

const Screen: FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedText = useDebounce(searchText, 500);
  const environment = useRelayEnvironment();
  const scrollY = new Animated.Value(0);

  const searchArgs: SearchUsersPaginationQueryVariables = {
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
          containerStyle={{ marginTop: 12 }}
          onChangeText={onChangeText}
          value={searchText}
        />
        <Suspense fallback={<LoadingIndicator/>}>
          <ContentContainer scrollY={scrollY} searchArgs={searchArgs}/>
        </Suspense>
      </Container>
    </StyledSafeAreaView>
  );
};

export default Screen;
