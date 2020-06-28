import { VirgilAccessTokenSigner, VirgilCrypto, initCrypto } from 'virgil-crypto';

import { JwtGenerator } from 'virgil-sdk';

let virgilJwtGenerator: JwtGenerator | null;
const createOrGetVirgilJwtGenerator = async (): Promise<JwtGenerator> => {
  if (virgilJwtGenerator) {
    return virgilJwtGenerator;
  }

  await initCrypto();
  const virgilCrypto = new VirgilCrypto();

  const requiredParams = [
    'VIRGIL_APP_ID',
    'VIRGIL_APP_KEY_ID',
    'VIRGIL_APP_KEY',
  ].filter((name) => !process.env[name]);

  if (requiredParams.length > 0) {
    throw new Error(`Invalid configuration. Missing: ${requiredParams.join(', ')} in .env file`);
  }

  virgilJwtGenerator = new JwtGenerator({
    appId: process.env.VIRGIL_APP_ID,
    apiKeyId: process.env.VIRGIL_APP_KEY_ID,
    apiKey: virgilCrypto.importPrivateKey(process.env.VIRGIL_APP_KEY),
    accessTokenSigner: new VirgilAccessTokenSigner(virgilCrypto),
  });

  return virgilJwtGenerator;
};

export default createOrGetVirgilJwtGenerator;
