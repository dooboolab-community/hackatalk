import type {
  ChannelsQuery,
  ChannelsQueryResponse,
  ChannelsQueryVariables,
} from '../../__generated__/ChannelsQuery.graphql';
import {
  FlatList,
  Modal,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, Suspense, useMemo, useState} from 'react';
import {channelsQuery, leaveChannel} from '../../relay/queries/Channel';
import {
  graphql,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from 'react-relay';
import useOrientation, {Orientation} from '../../hooks/useOrientation';

import {AdMobBanner} from 'expo-ads-admob';
import {Channel} from '../../types/graphql';
import {ChannelLeaveChannelMutation} from '../../__generated__/ChannelLeaveChannelMutation.graphql';
import ChannelListItem from '../uis/ChannelListItem';
import CustomLoadingIndicator from '../uis/CustomLoadingIndicator';
import EmptyListItem from '../uis/EmptyListItem';
import type {MainChannelComponent_channel$key} from '../../__generated__/MainChannelComponent_channel.graphql';
import {MainStackNavigationProps} from '../navigations/MainStackNavigator';
import {MaterialTopTabNavigationProps} from '../navigations/MainTabNavigator';
import {SvgPlus} from '../../utils/Icons';
import {getString} from '../../../STRINGS';
import {showAlertForError} from '../../utils/common';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'dooboo-ui';

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
          memberships(excludeMe: false) {
            user {
              id
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

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalViewContainer = styled.View`
  width: 80%;
  height: 25%;
  background-color: ${({theme}) => theme.modalBackbround};
  border: ${({theme}) => theme.modalBtnPrimaryFont};
  border-radius: 20px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

const ModalBtnContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  width: 80%;

  justify-content: space-between;
`;

const ModalBtnStyle = styled.View`
  background-color: ${({theme}) => theme.primary};
  border-radius: 10px;
  border-color: ${({theme}) => theme.primary};
  opacity: 0.8;
  width: 120px;
  height: 40px;
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;

const ModalBtnText = styled.Text`
  color: ${({theme}) => theme.light};
  font-weight: bold;
  font-size: 18px;
`;

const ModalText = styled.Text`
  color: ${({theme}) => theme.text};
  opacity: 1;
  font-weight: bold;
  font-size: 21px;
  margin-top: 15px;
`;

var choiceItem = '';

const ChannelsFragment: FC<ChannelProps> = ({channel, searchArgs}) => {
  const {data, loadNext, isLoadingNext, refetch} = usePaginationFragment<
    ChannelsQuery,
    MainChannelComponent_channel$key
  >(channelsPaginationFragment, channel);

  const [bannerError, setBannerError] = useState<boolean>(false);
  const orientation = useOrientation();
  const navigation = useNavigation<MainStackNavigationProps<'MainTab'>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [leaveChannelUpdate, isLeaveChannelComplete] =
    useMutation<ChannelLeaveChannelMutation>(leaveChannel);

  const onEndReached = (): void => {
    loadNext(ITEM_CNT);
  };

  const showLeaveModal = (channelId: any): void => {
    setModalVisible(true);

    choiceItem = channelId.channelId;
  };

  const leaveTheChannel = (): void => {
    const mutationConfig = {
      variables: {
        channelId: choiceItem,
      },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
      onCompleted: (): void => {
        refetch(searchArgs, {fetchPolicy: 'network-only'});

        setModalVisible(false);
      },
    };

    leaveChannelUpdate(mutationConfig);
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
        key={index.toString()}
        item={item.node}
        onPress={(): void => {
          navigation.navigate('Message', {
            channelId: item.node.id,
          });
        }}
        onLongPress={(): void => {
          showLeaveModal({
            channelId: item.node.id,
          });
        }}
      />
    );
  };

  const channels = useMemo(() => {
    return data?.channels?.edges ?? [];
  }, [data?.channels?.edges]);

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ModalContainer>
          <ModalViewContainer>
            <ModalText>{getString('LEAVE_CHANNEL')}</ModalText>

            <ModalBtnContainer>
              <TouchableHighlight
                onPress={() => {
                  leaveTheChannel();
                }}>
                <ModalBtnStyle>
                  <ModalBtnText>
                    <ModalBtnText>{getString('YES')}</ModalBtnText>
                  </ModalBtnText>
                </ModalBtnStyle>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(false);
                }}>
                <ModalBtnStyle>
                  <ModalBtnText>
                    <ModalBtnText>{getString('NO')}</ModalBtnText>
                  </ModalBtnText>
                </ModalBtnStyle>
              </TouchableHighlight>
            </ModalBtnContainer>
          </ModalViewContainer>
        </ModalContainer>
      </Modal>
      <FlatList
        scrollIndicatorInsets={{right: 1}}
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
        refreshing={isLoadingNext || isLeaveChannelComplete}
        onRefresh={() => {
          refetch(searchArgs, {fetchPolicy: 'network-only'});
        }}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
      />
    </View>
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

const Screen: FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<MaterialTopTabNavigationProps<'Channel'>>();

  const searchArgs: ChannelsQueryVariables = {
    first: ITEM_CNT,
    withMessage: true,
  };

  return (
    <Container>
      <Suspense fallback={<CustomLoadingIndicator />}>
        <ContentContainer searchArgs={searchArgs} />
      </Suspense>
      <TouchableOpacity
        testID="channel-create-fab"
        activeOpacity={0.65}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 44,
        }}
        onPress={(): void => navigation.navigate('ChannelCreate')}
      >
        <Fab>
          <SvgPlus fill={theme.background} />
        </Fab>
      </TouchableOpacity>
    </Container>
  );
};

export default Screen;
