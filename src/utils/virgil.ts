import { EThree, ICard, IPrivateKey } from '@virgilsecurity/e3kit-native';

import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

const { ROOT_URL } = Config;

export let eThree: EThree;

/**
 * Virgil Pythia Service has a rate limit of 2 seconds.
 */
const SERVICE_DELAY = 2000;

/**
 * Return a promise that will be resolved after `ms` milliseconds.
 * @param {number} ms - Timeout in milliseconds.
 */
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/**
 * Create a new user in the Virgil Cloud.
 * @param {EThree} e3kit - Instance of EThree class for current user.
 * @param {string} password - User's password.
 */
async function createUser(e3kit: EThree, password: string): Promise<void> {
  try {
    await e3kit.register();
    await e3kit.backupPrivateKey(password);
  } catch (error) {
    if (error.name === ' CloudEntryExistsError') {
      await e3kit.resetPrivateKeyBackup();
      sleep(SERVICE_DELAY);
      await e3kit.backupPrivateKey(password);
    } else {
      throw error;
    }
  }
}

/**
 * Returns true if private key's identifier matches the card's public key identifier.
 * @param {EThree} e3kit - Instance of EThree class for current user.
 * @param {ICard} card - User's Virgil Card.
 */
async function isKeyValid(e3kit: EThree, card: ICard): Promise<boolean> {
  const keyEntry = await e3kit.keyEntryStorage.load(e3kit.identity);

  if (!keyEntry) {
    return false;
  }
  const privateKey: IPrivateKey = e3kit.virgilCrypto.importPrivateKey(keyEntry.value);
  if (privateKey.identifier.byteLength !== card.publicKey.identifier.byteLength) {
    return false;
  }
  for (let i = 0; i < privateKey.identifier.byteLength; i += 1) {
    if (privateKey.identifier[i] !== card.publicKey.identifier[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Rotate user's private key and save it in the Virgil Cloud.
 * @param {EThree} e3kit - Instance of EThree class for current user.
 * @param {string} password - User's password.
 */
async function rotateKey(e3kit: EThree, password: string): Promise<void> {
  await e3kit.cleanup();
  await e3kit.rotatePrivateKey();
  await e3kit.backupPrivateKey(password);
}

export const getTokenFactory = (identity: string): () => Promise<string> => {
  return (): Promise<string> =>
    fetch(`${ROOT_URL}/virgil-jwt/${encodeURIComponent(identity)}`)
      .then((res) => res.text());
};

/**
 * Restore user from the Virgil Cloud.
 * @param {EThree} e3kit - Instance of EThree class for current user.
 * @param {ICard} card - User's Virgil Card.
 * @param {string} password - User's password.
 */
async function restoreUser(e3kit: EThree, card: ICard, password: string): Promise<void> {
  try {
    await e3kit.restorePrivateKey(password);
    const keyValid = await isKeyValid(e3kit, card);
    if (!keyValid) {
      await e3kit.resetPrivateKeyBackup();
      await sleep(SERVICE_DELAY);
      await rotateKey(e3kit, password);
    }
  } catch (error) {
    if (error.name === 'PrivateKeyNoBackupError') {
      await sleep(SERVICE_DELAY);
      await rotateKey(e3kit, password);
    } else {
      throw error;
    }
  }
}

/**
 * Initialize user on current device.
 * @param {EThree} e3kit - Instance of EThree class for current user.
 * @param {string} password - User's password.
 */
export async function initUser(e3kit: EThree, password: string): Promise<void> {
  try {
    await e3kit.cleanup();
    const card = await e3kit.findUsers(e3kit.identity);
    await restoreUser(e3kit, card, password);
  } catch (error) {
    if (error.name === 'UsersNotFoundError') {
      await createUser(e3kit, password);
    } else {
      throw error;
    }
  }
}

export const encryptMessage = async (users: string[]): Promise<string | Buffer> => {
  if (!eThree) {
    throw new Error('eThree is not registered');
  }

  const receiversCard = await eThree.findUsers(users);
  const encryptedMessage = await eThree.encrypt('Hello Receivers!', receiversCard);

  return encryptedMessage;
};

export const decryptMessage = async (users: string[], encryptedMessage: string):
Promise<string | Buffer> => {
  if (!eThree) {
    throw new Error('eThree is not registered');
  }

  const sendersCard = await eThree.findUsers(users);

  const decryptedMessage = await eThree.decrypt(
    encryptedMessage,
    sendersCard[eThree.identity],
  );

  return decryptedMessage;
};

export const initializeEThree = async (userId: string): Promise<void> => {
  const getToken = getTokenFactory(userId);

  try {
    // @ts-ignore ==> https://github.com/VirgilSecurity/virgil-e3kit-js/issues/82
    eThree = await EThree.initialize(getToken, { AsyncStorage });
    const password = await AsyncStorage.getItem('password');
    await initUser(eThree, userId + password);
    AsyncStorage.removeItem('password');
  } catch (err) {
    console.log('Ethree register error', err);
  }
};
