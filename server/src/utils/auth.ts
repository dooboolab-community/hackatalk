import NodeRSA from 'node-rsa';
import {Request} from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import qs from 'querystring';
import {verify} from 'jsonwebtoken';

const SALT_ROUND = 10;

const {
  APPLE_CLIENT_ID,
  REDIRECT_URL,
  JWT_SECRET = 'undefined',
  JWT_SECRET_ETC = 'etc',
} = process.env;

export const APP_SECRET = JWT_SECRET;
export const APP_SECRET_ETC = JWT_SECRET_ETC;

const env = process.env.NODE_ENV;

const envPath =
  env === 'development'
    ? path.resolve(__dirname, '../dotenv/dev.env')
    : env === 'test'
    ? path.resolve(__dirname, '../dotenv/test.env')
    : path.resolve(__dirname, '../dotenv/.env');

// eslint-disable-next-line
require('dotenv').config({path: envPath});

interface Token {
  userId: string;
}

export function getUserId(authorization?: string): string | null {
  if (!authorization) {
    return null;
  }

  const token = authorization.replace('Bearer ', '');
  const verifiedToken = verify(token, APP_SECRET) as Token;

  return verifiedToken && verifiedToken.userId;
}

export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line prettier/prettier
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export interface GoogleUser {
  iss: string;
  sub: string;
  azp: string;
  aud: string;
  iat: number | string;
  exp: number | string;

  /* eslint-disable */
  email?: string;
  email_verified?: boolean | string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
  /* eslint-enable */
}

/**
 * Verify google token and return user
 * @param token
 * @returns GoogleUser
 */

export const verifyGoogleId = async (token: string): Promise<GoogleUser> => {
  const {data} = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
  );

  return data as GoogleUser;
};

export interface FacebookUser {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
}

export const verifyFacebookId = async (
  accessToken: string,
): Promise<FacebookUser> => {
  const {data} = await axios.get('https://graph.facebook.com/v13.0/me', {
    params: {
      access_token: accessToken,
      fields: 'id,name,email,picture',
    },
  });

  return data as FacebookUser;
};

const getApplePublicKey = async (): Promise<string> => {
  const {data} = await axios.get('https://appleid.apple.com/auth/keys');

  // @ts-ignore
  const key = data.keys[0];

  const pubKey = new NodeRSA();

  pubKey.importKey(
    {n: Buffer.from(key.n, 'base64'), e: Buffer.from(key.e, 'base64')},
    'components-public',
  );

  return pubKey.exportKey('public');
};

interface AppleUser {
  iss: string;
  sub: string;
  aud: string;
  iat: number | string;
  exp: number | string;

  nonce: string;

  /* eslint-disable */
  nonce_supported: boolean;
  email: string;
  email_verified: boolean | string;
  is_private_email: boolean;
  real_user_status: number;
  /* eslint-enable */
}

/**
 * @deprecated
 * Switched to `verify-apple-id-token` library since this failed intermittently.
 *
 * Verify apple token and return user
 * @param token
 * @returns AppleUser
 */

export const verifyAppleId = async (idToken: string): Promise<AppleUser> => {
  const clientID = APPLE_CLIENT_ID;
  const TOKEN_ISSUER = 'https://appleid.apple.com';

  const applePublicKey = await getApplePublicKey();

  const appleUser = verify(idToken, applePublicKey, {
    algorithms: ['RS256'],
  }) as AppleUser;

  if (appleUser.iss !== TOKEN_ISSUER) {
    throw new Error(
      `id token is not issued by: ${TOKEN_ISSUER} | from: + ${appleUser.iss}`,
    );
  }

  if (clientID !== undefined && appleUser.aud !== clientID) {
    throw new Error(
      `parameter does not include: ${appleUser.aud} | expected: ${clientID}`,
    );
  }

  if (appleUser.exp < Date.now() / 1000) {
    throw new Error('id token has expired');
  }

  return appleUser;
};

export const encryptCredential = async (password: string): Promise<string> => {
  const SALT = await bcrypt.genSalt(SALT_ROUND);
  const hash = await bcrypt.hash(password, SALT);

  // Fix the 404 ERROR that occurs when the hash contains 'slash' or 'dot' value
  return hash.replace(/\//g, 'slash').replace(/\.$/g, 'dot');
};

export const validateCredential = async (
  value: string,
  hashedValue: string,
): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    // Fix the 404 ERROR that occurs when the hash contains 'slash' or 'dot' value
    hashedValue = hashedValue.replace(/slash/g, '/');
    hashedValue = hashedValue.replace(/dot$/g, '.');

    bcrypt.compare(value, hashedValue, (err, res) => {
      if (err) {
        return reject(err);
      }

      resolve(res);
    });
  });

export const getEmailVerificationHTML = (
  verificationToken: string,
  req: Request,
): string => {
  const templateString = fs.readFileSync(
    path.resolve(__dirname, '../../html/email_verification.html'),
    'utf-8',
  );

  const rendered = ejs.render(templateString, {
    REDIRECT_URL: `${REDIRECT_URL}/verify_email/${verificationToken}`,
    WELCOME_SIGNUP: req.t('WELCOME_SIGNUP'),
    WELCOME: req.t('WELCOME'),
    VERIFY_EMAIL: req.t('VERIFY_EMAIL'),
    MESSAGE_SENT_ONLY: req.t('MSG_SENT_ONLY'),
    SERVICE_CENTER: req.t('SERVICE_CENTER'),
  });

  return rendered;
};

export const getPasswordResetHTML = (
  token: string,
  password: string,
  req: Request,
): string => {
  const templateString = fs.readFileSync(
    path.resolve(__dirname, '../../html/password_reset.html'),
    'utf-8',
  );

  const rendered = ejs.render(templateString, {
    REDIRECT_URL: `${REDIRECT_URL}/reset_password/${token}/${qs.escape(
      password,
    )}`,
    HELLO: req.t('HELLO'),
    CLICK_TO_RESET_PW: req.t('CLICK_TO_RESET_PW'),
    PASSWORD: req.t('PASSWORD'),
    CHANGE_PASSWORD: req.t('CHANGE_PASSWORD'),
    MSG_SENT_ONLY: req.t('MSG_SENT_ONLY'),
    SERVICE_CENTER: req.t('SERVICE_CENTER'),
    randomPassword: password,
  });

  return rendered;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getToken = (req: Request): string | null => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};
