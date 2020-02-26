import AsyncStorage from '@react-native-community/async-storage';
import { EThree } from '@virgilsecurity/e3kit-native';

export let eThree: EThree;

const getVirgilToken = async (): Promise<string> => {
  const virgilToken = await AsyncStorage.getItem('virgil_token');
  return virgilToken || '';
};

export const initializeEThree = async (): Promise<void> => {
  // @ts-ignore ==> https://github.com/VirgilSecurity/virgil-e3kit-js/issues/82
  const eThreePromise = EThree.initialize(getVirgilToken, { AsyncStorage });
  eThree = await eThreePromise;
};
