import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactElement, useState } from 'react';

import ErroView from '../shared/ErrorView';
import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import SearchTextInput from '../shared/SearchTextInput';
import { User } from '../../types';
import UserListItem from '../shared/UserListItem';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

function Page(props: Props): ReactElement {
  const { navigation } = props;

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity>
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
          <Text style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
          }}>{getString('DONE')}</Text>
        </View>
      </TouchableOpacity>
    ),
  });

  const [searchText, setSearchText] = useState<string>('');
  const friends: User[] = [];

  const onChangeText = (text: string): void => {
    setSearchText(text);
  };

  const renderFriends = ({
    item,
    index,
  }: {
    item: User;
    index: number;
  }): React.ReactElement => {
    const itemTestID = `user-list-item${index}`;
    const userListOnPressInlineFn = (): void => userListOnPress(item);
    return (
      <UserListItem
        testID={itemTestID}
        user={item}
        onPress={userListOnPressInlineFn}
      />
    );
  };

  return (
    <Container>
      <SearchTextInput
        testID="text-input"
        onChangeText={onChangeText}
        value={searchText}
      />
      <FlatList
        style={{
          alignSelf: 'stretch',
        }}
        contentContainerStyle={
          friends.length === 0
            ? {
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'center',
            }
            : null
        }
        keyExtractor={(_, index): string => index.toString()}
        data={friends}
        renderItem={renderFriends}
        ListEmptyComponent={
          <ErroView
            title={getString('NO_FRIEND')}
            body={getString('NO_FRIEND_BODY')}
            buttonText={getString('GO_BACK')}
            onButtonPressed={(): void => navigation.goBack()}
          />
        }
      />
    </Container>
  );
}

export default Page;
