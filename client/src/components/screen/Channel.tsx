import {
  ChannelsQuery,
  ChannelsQueryResponse,
  ChannelsQueryVariables,
} from '../../__generated__/ChannelsQuery.graphql';
import { FlatList, TouchableOpacity, View } from 'react-native';
import React, { FC, Suspense, useState } from 'react';
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
  useRelayEnvironment,
} from 'react-relay/hooks';

import { Channel } from '../../types/graphql';
import type {
  ChannelComponent_channel$key,
} from '../../__generated__/ChannelComponent_channel.graphql';
import ChannelListItem from '../shared/ChannelListItem';
import EmptyListItem from '../shared/EmptyListItem';
import {
  LoadingIndicator,
} from 'dooboo-ui';
import { MainStackNavigationProps } from '../navigation/MainStackNavigator';
import { SvgPlus } from '../../utils/Icons';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  flex: 1;
  background: ${({ theme }): string => theme.background};
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
  background: ${({ theme }): string => theme.fab};
`;

const ITEM_CNT = 10;

const channelsQuery = graphql`
  query ChannelsQuery($first: Int! $after: String $withMessage: Boolean) {
    ...ChannelComponent_channel @arguments(first: $first, after: $after withMessage: $withMessage)
  }
`;

const channelsFragment = graphql`
  fragment ChannelComponent_channel on Query
    @argumentDefinitions(
      first: {type: "Int!"}
      after: {type: "String"}
      withMessage: {type: "Boolean"}
    )
    @refetchable(queryName: "Channels") {
      channels(first: $first after: $after withMessage: $withMessage)
      @connection(key: "ChannelComponent_channels" filters: ["withMessage"]) {
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
  channel: ChannelComponent_channel$key;
  searchArgs: ChannelsQueryVariables;
}

const ChannelsFragment: FC<ChannelProps> = ({
  channel,
  searchArgs,
}) => {
  const navigation = useNavigation();

  const {
    data,
    loadNext,
    isLoadingNext,
    refetch,
  } = usePaginationFragment<ChannelsQuery, ChannelComponent_channel$key>(
    channelsFragment,
    channel,
  );

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: { node: Channel, cursor: string };
    index: number;
  }): React.ReactElement => {
    return (
      <ChannelListItem
        testID={`list-item-${index}`}
        item={item.node}
        onPress={(): void => {
          navigation.navigate('Message', { messageId: item.node.id });
        }}
      />
    );
  };

  const channels = data?.channels?.edges || [];

  return <FlatList
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
    ListEmptyComponent={
      <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
    }
    ListFooterComponent={
      <View style={{ height: 60 }} />
    }
    refreshing={isLoadingNext}
    onRefresh={() => {
      refetch(searchArgs, { fetchPolicy: 'network-only' });
    }}
    onEndReachedThreshold={0.1}
    onEndReached={onEndReached}
  />;
};

interface ContentProps {
  searchArgs: ChannelsQueryVariables;
}

const ContentContainer: FC<ContentProps> = ({
  searchArgs,
}) => {
  const data: ChannelsQueryResponse =
  useLazyLoadQuery<ChannelsQuery>(
    channelsQuery,
    searchArgs,
    { fetchPolicy: 'store-or-network' },
  );

  return <ChannelsFragment
    channel={data}
    searchArgs={searchArgs}
  />;
};

interface Props {
  navigation: MainStackNavigationProps<'Message'>;
}

const Screen: FC<Props> = () => {
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  const searchArgs: ChannelsQueryVariables = {
    first: ITEM_CNT,
    withMessage: true,
  };

  return (
    <Container>
      <Suspense fallback={<LoadingIndicator/>}>
        <ContentContainer searchArgs={searchArgs}/>
      </Suspense>
      <TouchableOpacity
        activeOpacity={0.65}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 44,
        }}
        onPress={(): void => navigation.navigate('ChannelCreate')}
      >
        <Fab>
          <SvgPlus fill={theme.background}/>
        </Fab>
      </TouchableOpacity>
    </Container>
  );
};

export default Screen;
