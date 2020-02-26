import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { EThree } from '@virgilsecurity/e3kit-native';

const { ROOT_URL } = Config;

export let eThree: EThree;

export const getTokenFactory = (identity: string): () => Promise<string> => {
  return (): Promise<string> =>
    fetch(`${ROOT_URL}/virgil-jwt/${encodeURIComponent(identity)}`)
      .then((res) => res.text());
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

export const initializeEThree = async (userId: string): Promise<void> => {
  const getToken = getTokenFactory(userId);
  // @ts-ignore ==> https://github.com/VirgilSecurity/virgil-e3kit-js/issues/82
  eThree = await EThree.initialize(getToken, { AsyncStorage });
  eThree.register();
};
