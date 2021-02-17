import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IC_CIRCLE_X, IC_NO_IMAGE} from '../../utils/Icons';
import React, {FC, ReactElement} from 'react';
import {User, UserEdge} from '../../types/graphql';

import ErroView from '../UI/molecules/ErrorView';
import UserListItem from '../UI/molecules/UserListItem';
import {getString} from '../../../STRINGS';
import produce from 'immer';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'dooboo-ui';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.backgroundDark};
  flex-direction: column;
`;

const FriendThumbView = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
`;

type Props = {
  friendEdges: UserEdge[];
  selectedUsers: User[];
  setSelectedUsers: (users: User[]) => void;
};

const ChannelCreateTemp: FC<Props> = ({
  friendEdges,
  selectedUsers,
  setSelectedUsers,
}) => {
  const {theme} = useTheme();

  const navigation = useNavigation();

  const removeFriend = (user: User): void => {
    const nextState = produce(selectedUsers, (draftState) => {
      const index = selectedUsers.findIndex((v) => v.id === user.id);

      draftState.splice(index, 1);
    });

    setSelectedUsers(nextState);
  };

  const renderFriendThumbnail = (user: User, index: number): ReactElement => {
    return (
      <FriendThumbView key={user.id}>
        <View
          style={{
            marginTop: 12,
            marginRight: 16,
            marginBottom: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 60,
              height: 60,
            }}
            source={user.thumbURL ? {uri: user.thumbURL} : IC_NO_IMAGE}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              marginTop: 4,
              color: theme.text,
            }}>
            {user.nickname || user.name}
          </Text>
        </View>
        <TouchableOpacity
          testID={`remove-${index}`}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          onPress={(): void => removeFriend?.(user)}>
          <Image source={IC_CIRCLE_X} style={{width: 32, height: 32}} />
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
        style={{alignSelf: 'stretch'}}
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
              style={{paddingHorizontal: 24, marginBottom: 12}}
              horizontal>
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

export default ChannelCreateTemp;
