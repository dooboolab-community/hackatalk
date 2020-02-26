import AsyncStorage from '@react-native-community/async-storage';
import { EThree } from '@virgilsecurity/e3kit-native';

export let eThree: EThree;

const getVirgilToken = async (): Promise<string> => {
  const virgilToken = await AsyncStorage.getItem('virgil_token');
  return virgilToken || '';
};

export const encryptMessage = async (users: string[]): Promise<string | Buffer> => {
  if (!eThree) {
    throw new Error('eThree is not registered');
  }

  const receiversCard = await eThree.findUsers(users);
  const encryptedMessage = await eThree.encrypt('Hello Receivers!', receiversCard);

  return encryptedMessage;
};

export const decryptMessage = async (users: string[], encryptedMessage: string): Promise<string | Buffer> => {
  if (!eThree) {
    throw new Error('eThree is not registered');
  }

  const sendersCard = await eThree.findUsers(users);

  const decryptedMessage = await eThree.decrypt(
    encryptedMessage,
    sendersCard,
  );

  return decryptedMessage;
};

export const initializeEThree = async (): Promise<void> => {
  // @ts-ignore ==> https://github.com/VirgilSecurity/virgil-e3kit-js/issues/82
  eThree = await EThree.initialize(getVirgilToken, { AsyncStorage });
  await eThree.register();
};
