import React, {FC, ReactElement, memo, useLayoutEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/core';
import {useTheme} from 'dooboo-ui';

const Container = styled.SafeAreaView`
  padding: 8px;

  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.text};
`;

const Page: FC = () => {
  const navigation = useNavigation<RootStackNavigationProps<'default'>>();
  const {theme} = useTheme();

  const pressAgree = async (): Promise<void> => {
    await AsyncStorage.setItem('license_agreed', JSON.stringify(true));
    navigation.pop();
  };

  const headerRight = memo(
    (): ReactElement => (
      <TouchableOpacity testID="touch-done" onPress={pressAgree}>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            {getString('AGREE')}
          </Text>
        </View>
      </TouchableOpacity>
    ),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [headerRight, navigation]);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 8,
          paddingHorizontal: 20,
        }}
      >
        <StyledText>{getString('LICENSE_AGREEMENT_BY_APPLE')}</StyledText>
      </ScrollView>
    </Container>
  );
};

export default Page;
