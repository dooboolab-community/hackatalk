import {FlatList, View} from 'react-native';
import React, {FC} from 'react';

import EmptyListItem from '../UI/molecules/EmptyListItem';
import {User} from '../../types/graphql';
import UserListItem from '../UI/molecules/UserListItem';
import {getString} from '../../../STRINGS';

type Props = {
  onPressUserItem: (user: User) => void;
  blockedUsers?: User[];
};

const BlockedUserTemp: FC<Props> = ({onPressUserItem, blockedUsers}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: User;
    index: number;
  }): React.ReactElement => {
    const itemTestID = `user-list-item${index}`;

    return (
      <UserListItem
        testID={itemTestID}
        user={item}
        onPress={() => onPressUserItem(item)}
      />
    );
  };

  return (
    <FlatList
      style={{alignSelf: 'stretch'}}
      contentContainerStyle={
        blockedUsers?.length === 0
          ? {
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }
          : null
      }
      keyExtractor={(_, index): string => index.toString()}
      data={blockedUsers}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListItem>{getString('NO_BANNED_USER')}</EmptyListItem>
      }
      ListFooterComponent={<View style={{height: 60}} />}
      onEndReachedThreshold={0.1}
    />
  );
};

export default BlockedUserTemp;
