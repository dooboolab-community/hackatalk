import React, {FC, ReactElement} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LicenseAgreementTemp from '../templates/LicenseAgreementTemp';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {getString} from '../../../STRINGS';
import {useTheme} from 'dooboo-ui';

interface Props {
  navigation: RootStackNavigationProps<'default'>;
}

const Page: FC<Props> = ({navigation}) => {
  const {theme} = useTheme();

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

  return <LicenseAgreementTemp />;
};

export default Page;
