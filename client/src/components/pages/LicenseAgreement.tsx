import type {FC, ReactElement} from 'react';
import React, {useCallback, useLayoutEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import type {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';
import {useDooboo} from 'dooboo-ui';
import {useNavigation} from '@react-navigation/core';

const Container = styled.SafeAreaView`
  padding: 8px;

  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.text.basic};
`;

const Page: FC = () => {
  const navigation = useNavigation<RootStackNavigationProps<'default'>>();
  const {theme} = useDooboo();

  const pressAgree = useCallback(async (): Promise<void> => {
    await AsyncStorage.setItem('license_agreed', JSON.stringify(true));
    navigation.pop();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: (): ReactElement => (
        <TouchableOpacity testID="touch-done" onPress={pressAgree}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text
              style={{
                color: theme.text.basic,
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              {getString('AGREE')}
            </Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [pressAgree, navigation, theme.text]);

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
