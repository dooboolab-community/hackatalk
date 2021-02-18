import * as Notifications from 'expo-notifications';

import {Channel, User} from '../../types/graphql';
import type {
  ChannelsQuery,
  ChannelsQueryResponse,
  ChannelsQueryVariables,
} from '../../__generated__/ChannelsQuery.graphql';
import {LoadingIndicator, useTheme} from 'dooboo-ui';
import React, {FC, Suspense, useEffect, useMemo} from 'react';
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
  useQueryLoader,
} from 'react-relay/hooks';

import type {MainChannelComponent_channel$key} from '../../__generated__/MainChannelComponent_channel.graphql';
import MainChannelTemp from '../templates/MainChannelTemp';
import {MainStackNavigationProps} from '../navigations/MainStackNavigator';
import {MessageLastMessageQuery} from '../../__generated__/MessageLastMessageQuery.graphql';
import {SvgPlus} from '../../utils/Icons';
import {TouchableOpacity} from 'react-native';
import {channelsQuery} from '../../relay/queries/Channel';
import {lastMessageQuery} from '../../relay/queries/Message';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.background};
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
  background: ${({theme}) => theme.fab};
`;

const ITEM_CNT = 20;

const channelsPaginationFragment = graphql`
  fragment MainChannelComponent_channel on Query
  @argumentDefinitions(
    first: {type: "Int!"}
    after: {type: "String"}
    withMessage: {type: "Boolean"}
  )
  @refetchable(queryName: "Channels") {
    channels(first: $first, after: $after, withMessage: $withMessage)
      @connection(
        key: "MainChannelComponent_channels"
        filters: ["withMessage"]
      ) {
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

interface ChannelProps {
  channel: MainChannelComponent_channel$key;
  searchArgs: ChannelsQueryVariables;
}

const ChannelsFragment: FC<ChannelProps> = ({channel, searchArgs}) => {
  const navigation = useNavigation();

  const {data, loadNext, isLoadingNext, refetch} = usePaginationFragment<
    ChannelsQuery,
    MainChannelComponent_channel$key
  >(channelsPaginationFragment, channel);

  const [, loadLastMessage] = useQueryLoader<MessageLastMessageQuery>(
    lastMessageQuery,
  );

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

  const channels = useMemo(() => {
    return data?.channels?.edges ?? [];
  }, [data?.channels?.edges]);

  return (
    <MainChannelTemp
      // @ts-ignore
      channels={channels}
      isLoadingNext={isLoadingNext}
      onEndReached={onEndReached}
      onRefresh={() => {
        refetch(searchArgs, {fetchPolicy: 'network-only'});
      }}
      onChannelPressed={(item: Channel): void => {
        navigation.navigate('Message', {
          channel: item,
          users: item?.memberships?.map(
            (membership) => membership?.user,
          ) as User[],
        });
      }}
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
  const {theme} = useTheme();
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
