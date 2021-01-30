import * as Notifications from 'expo-notifications';

import {Channel, User} from '../../types/graphql';
import type {
  ChannelsQuery,
  ChannelsQueryResponse,
  ChannelsQueryVariables,
} from '../../__generated__/ChannelsQuery.graphql';
import {FlatList, Platform, TouchableOpacity, View} from 'react-native';
import React, {FC, Suspense, useEffect, useMemo, useState} from 'react';
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
  useQueryLoader,
} from 'react-relay/hooks';
import useOrientation, {Orientation} from '../../hooks/useOrientation';

import {AdMobBanner} from 'expo-ads-admob';
import type {ChannelComponent_channel$key} from '../../__generated__/ChannelComponent_channel.graphql';
import {ChannelLastMessageQuery} from '../../__generated__/ChannelLastMessageQuery.graphql';
import ChannelListItem from '../shared/ChannelListItem';
import EmptyListItem from '../shared/EmptyListItem';
import {LoadingIndicator} from 'dooboo-ui';
import {MainStackNavigationProps} from '../navigation/MainStackNavigator';
import {SvgPlus} from '../../utils/Icons';
import {getString} from '../../STRINGS';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useTheme as useThemeContext} from '../../providers/ThemeProvider';

const Container = styled.View`
  flex: 1;
  background: ${({theme}): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Fab = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
  background: ${({theme}): string => theme.fab};
`;

const ITEM_CNT = 20;

const channelsQuery = graphql`
  query ChannelsQuery($first: Int!, $after: String, $withMessage: Boolean) {
    ...ChannelComponent_channel
      @arguments(first: $first, after: $after, withMessage: $withMessage)
  }
`;

const channelsPaginationFragment = graphql`
  fragment ChannelComponent_channel on Query
  @argumentDefinitions(
    first: {type: "Int!"}
    after: {type: "String"}
    withMessage: {type: "Boolean"}
  )
  @refetchable(queryName: "Channels") {
    channels(first: $first, after: $after, withMessage: $withMessage)
      @connection(key: "ChannelComponent_channels", filters: ["withMessage"]) {
      edges {
        cursor
        node {
          id
          channelType
          name
          memberships(excludeMe: true) {
            user {
              name
              nickname
              thumbURL
              photoURL
            }
          }
          lastMessage {
            id
            messageType
            text
            imageUrls
            fileUrls
            createdAt
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const lastMessageQuery = graphql`
  query ChannelLastMessageQuery($messageId: String!) {
    message(id: $messageId) {
      id
      messageType
      text
      imageUrls
      fileUrls
      createdAt
      sender {
        id
      }
      channel {
        id
        lastMessage {
          id
        }
      }
    }
  }
`;

interface ChannelProps {
  channel: ChannelComponent_channel$key;
  searchArgs: ChannelsQueryVariables;
}

const ChannelsFragment: FC<ChannelProps> = ({channel, searchArgs}) => {
  const {data, loadNext, isLoadingNext, refetch} = usePaginationFragment<
    ChannelsQuery,
    ChannelComponent_channel$key
  >(channelsPaginationFragment, channel);

  const [, loadLastMessage] = useQueryLoader<ChannelLastMessageQuery>(
    lastMessageQuery,
  );

  const [bannerError, setBannerError] = useState<boolean>(false);
  const orientation = useOrientation();
  const navigation = useNavigation<MainStackNavigationProps<'MainTab'>>();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      async (response) => {
        const messageId = JSON.parse(
          response.notification.request.content.data.data as string,
        ).messageId;

        if (typeof messageId === 'string') loadLastMessage({messageId});
      },
    );

    // Add notification handler.
    const responseListener = Notifications.addNotificationReceivedListener(
      (event) => {
        const messageId = JSON.parse(event.request.content.data.data as string)
          .messageId;

        loadNext(ITEM_CNT);

        if (typeof messageId === 'string') loadLastMessage({messageId});
      },
    );

    // Clean up : remove notification handler.
    return () => {
      Notifications.removeNotificationSubscription(responseListener);
      subscription.remove();
    };
  }, [loadLastMessage, loadNext]);

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: {node: Channel; cursor: string};
    index: number;
  }): React.ReactElement | null => {
    if (!item.node?.memberships || !item.node?.memberships.length)
      return <View key={index} />;

    return (
      <ChannelListItem
        testID={`list-item-${index}`}
        key={index.toString()}
        item={item.node}
        onPress={(): void => {
          navigation.navigate('Message', {
            channel: item.node,
            users: item.node?.memberships?.map(
              (membership) => membership?.user,
            ) as User[],
          });
        }}
      />
    );
  };

  const channels = useMemo(() => {
    return data?.channels?.edges ?? [];
  }, [data?.channels?.edges]);

  return (
    <FlatList
      style={{
        alignSelf: 'stretch',
      }}
      contentContainerStyle={
        channels.length === 0
          ? {
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }
          : null
      }
      keyExtractor={(_, index): string => index.toString()}
      // @ts-ignore
      data={channels}
      renderItem={renderItem}
      ListHeaderComponent={
        !bannerError && orientation === Orientation.PORTRAIT
          ? Platform.select({
              android: (
                <AdMobBanner
                  bannerSize={'smartBannerPortrait'}
                  // adUnitID="ca-app-pub-3940256099942544/6300978111"
                  adUnitID="ca-app-pub-7837089095803162/8109702961"
                  onDidFailToReceiveAdWithError={() => setBannerError(true)}
                />
              ),
              ios: (
                <AdMobBanner
                  bannerSize={'smartBannerPortrait'}
                  // adUnitID="ca-app-pub-3940256099942544/2934735716"
                  adUnitID="ca-app-pub-7837089095803162/4326063134"
                  onDidFailToReceiveAdWithError={() => setBannerError(true)}
                />
              ),
            })
          : null
      }
      ListEmptyComponent={
        <EmptyListItem>{getString('NO_CHANNELLIST')}</EmptyListItem>
      }
      ListFooterComponent={<View style={{height: 60}} />}
      refreshing={isLoadingNext}
      onRefresh={() => {
        refetch(searchArgs, {fetchPolicy: 'network-only'});
      }}
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
    />
  );
};

interface ContentProps {
  searchArgs: ChannelsQueryVariables;
}

const ContentContainer: FC<ContentProps> = ({searchArgs}) => {
  const data: ChannelsQueryResponse = useLazyLoadQuery<ChannelsQuery>(
    channelsQuery,
    searchArgs,
    {fetchPolicy: 'store-or-network'},
  );

  return <ChannelsFragment channel={data} searchArgs={searchArgs} />;
};

interface Props {
  navigation: MainStackNavigationProps<'Message'>;
}

const Screen: FC<Props> = () => {
  const {theme} = useThemeContext();
  const navigation = useNavigation();

  const searchArgs: ChannelsQueryVariables = {
    first: ITEM_CNT,
    withMessage: true,
  };

  return (
    <Container>
      <Suspense fallback={<LoadingIndicator />}>
        <ContentContainer searchArgs={searchArgs} />
      </Suspense>
      <TouchableOpacity
        activeOpacity={0.65}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 44,
        }}
        onPress={(): void => navigation.navigate('ChannelCreate')}>
        <Fab>
          <SvgPlus fill={theme.background} />
        </Fab>
      </TouchableOpacity>
    </Container>
  );
};

export default Screen;
