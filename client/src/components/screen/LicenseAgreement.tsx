import React, {FC, ReactElement} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackNavigationProps} from '../navigation/RootStackNavigator';
import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';
import {useThemeContext} from '@dooboo-ui/theme';

const Container = styled.SafeAreaView`
  padding: 8px;

  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${({theme}): string => theme.text};
`;

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

const Page: FC<Props> = ({navigation}) => {
  const {theme} = useThemeContext();

  const pressAgree = async (): Promise<void> => {
    await AsyncStorage.setItem('license_agreed', JSON.stringify(true));
    navigation.pop();
  };

  navigation.setOptions({
    headerRight: (): ReactElement => (
      <TouchableOpacity testID="touch-done" onPress={pressAgree}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <Text
            style={{
              color: theme.text,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {getString('AGREE')}
          </Text>
        </View>
      </TouchableOpacity>
    ),
  });

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 8,
          paddingHorizontal: 20,
        }}>
        <StyledText>{getString('LICENSE_AGREEMENT_BY_APPLE')}</StyledText>
      </ScrollView>
    </Container>
  );
};

export default Page;
