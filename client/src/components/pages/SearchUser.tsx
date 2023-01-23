import {Animated, FlatList, TouchableOpacity, View} from 'react-native';
import type {FC, ReactElement} from 'react';
import React, {Suspense, useLayoutEffect, useMemo, useState} from 'react';
import type {
  UserUsersPaginationQuery,
  UserUsersPaginationQuery$data,
  UserUsersPaginationQuery$variables,
} from '../../__generated__/UserUsersPaginationQuery.graphql';
import {graphql, useLazyLoadQuery, usePaginationFragment} from 'react-relay';

import CustomLoadingIndicator from '../uis/CustomLoadingIndicator';
import EmptyListItem from '../uis/EmptyListItem';
import {FontAwesome} from '@expo/vector-icons';
import type {ListRenderItem} from 'react-native';
import type {MainStackNavigationProps} from '../navigations/MainStackNavigator';
import SearchTextInput from '../uis/SearchTextInput';
import type {SearchUserComponent_user$key} from '../../__generated__/SearchUserComponent_user.graphql';
import UserListItem from '../uis/UserListItem';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';
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
          ...ProfileModal_user
          ...UserListItem_user
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
  searchArgs: UserUsersPaginationQuery$variables;
};

const UsersFragment: FC<UserProps> = ({user, searchArgs}) => {
  const {data, loadNext, isLoadingNext, refetch} = usePaginationFragment<
    UserUsersPaginationQuery,
    SearchUserComponent_user$key
  >(usersFragment, user);

  const nodes = useMemo(() => {
    return (
      data.users?.edges
        ?.filter((x): x is NonNullable<typeof x> => x !== null)
        .map((x) => x.node)
        .filter((x): x is NonNullable<typeof x> => x !== null) ?? []
    );
  }, [data]);

  const {showModal} = useProfileContext();

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const renderItem: ListRenderItem<(typeof nodes)[number]> = ({item}) => {
    const pressUserItem = (): void => {
      showModal({
        user: item,
      });
    };

    return <UserListItem user={item} onPress={pressUserItem} />;
  };

  const users = data?.users?.edges || [];

  return (
    <FlatList
      style={{
        width: '100%',
        height: '100%',
      }}
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
      data={nodes}
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
  searchArgs: UserUsersPaginationQuery$variables;
}

const ContentContainer: FC<ContentProps> = ({searchArgs, scrollY}) => {
  const data: UserUsersPaginationQuery$data =
    useLazyLoadQuery<UserUsersPaginationQuery>(usersQuery, searchArgs, {
      fetchPolicy: 'store-or-network',
    });

  return (
    <UsersFragment scrollY={scrollY} user={data} searchArgs={searchArgs} />
  );
};

const Screen: FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedText = useDebounce(searchText, 500);
  const scrollY = new Animated.Value(0);
  const navigation = useNavigation<MainStackNavigationProps<'SearchUser'>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (): ReactElement => (
        <TouchableOpacity onPress={() => navigation.navigate('BlockedUser')}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <FontAwesome name="ban" size={24} color="white" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const searchArgs: UserUsersPaginationQuery$variables = {
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
          containerStyle={{marginVertical: 8}}
          onChangeText={onChangeText}
          value={searchText}
        />
        <Suspense fallback={<CustomLoadingIndicator />}>
          <ContentContainer scrollY={scrollY} searchArgs={searchArgs} />
        </Suspense>
      </Container>
    </StyledSafeAreaView>
  );
};

export default Screen;
