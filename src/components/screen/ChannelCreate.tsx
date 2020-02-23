import React, { ReactElement, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { RootStackNavigationProps } from '../navigation/RootStackNavigator';
import SearchTextInput from '../shared/SearchTextInput';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: blue;
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

  const onChangeText = (text: string): void => {
    setSearchText(text);
  };

  return (
    <Container>
      <SearchTextInput
        testID="text-input"
        onChangeText={onChangeText}
        value={searchText}
      />
      <StyledText testID="myText">dooboolab</StyledText>
    </Container>
  );
}

export default Page;
