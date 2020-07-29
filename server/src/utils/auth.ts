import { Context } from '../context';
import axios from 'axios';
import bcrypt from 'bcrypt-nodejs';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import qs from 'querystring';
import { verify } from 'jsonwebtoken';

const SALT_ROUND = 10;

const { REDIRECT_URL, JWT_SECRET = 'undefined' } = process.env;
export const APP_SECRET = JWT_SECRET;

const env = process.env.NODE_ENV;
const envPath = env === 'development'
  ? path.resolve(__dirname, '../dotenv/dev.env')
  : env === 'test'
    ? path.resolve(__dirname, '../dotenv/test.env')
    : path.resolve(__dirname, '../dotenv/.env');

// eslint-disable-next-line
require('dotenv').config({ path: envPath });

interface Token {
  userId: string;
}

export function getUserId(context: Context): string {
  const Authorization = context.request.req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}

export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

interface GoogleUser {
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
  const { data } = await axios.get(
     `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
  );

  return data as GoogleUser;
};

interface FacebookUser {
  id: string;
  name: string;
  email: string;
}

export const verifyFacebookId = async (accessToken: string): Promise<FacebookUser> => {
  const { data } = await axios.get(
    'https://graph.facebook.com/v7.0/me',
    {
      params: {
        access_token: accessToken,
        fields: 'id,name,email',
      },
    },
  );

  return data as FacebookUser;
};

export const encryptCredential = async (password: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const SALT = bcrypt.genSaltSync(SALT_ROUND);

    bcrypt.hash(password, SALT, null, (err, hash) => {
      if (err) {
        return reject(err);
      }
      // Fix the 404 ERROR that occurs when the hash contains 'slash' or 'dot' value
      hash = hash.replace(/\//g, 'slash');
      hash = hash.replace(/\.$/g, 'dot');

      resolve(hash);
    });
  });

export const validateCredential = async (
  value: string,
  hashedValue: string,
): Promise<boolean> => new Promise<boolean>((resolve, reject) => {
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
  email: string,
  hashedEmail: string,
  req: ReqI18n,
): string => {
  const templateString = fs.readFileSync(
    path.resolve(__dirname, '../../html/email_verification.html'),
    'utf-8',
  );

  const rendered = ejs.render(templateString, {
    REDIRECT_URL: `${REDIRECT_URL}/verify_email/${qs.escape(email)}/${qs.escape(hashedEmail)}`,
    WELCOME_SIGNUP: req.t('WELCOME_SIGNUP'),
    WELCOME: req.t('WELCOME'),
    VERIFY_EMAIL: req.t('VERIFY_EMAIL'),
    MESSAGE_SENT_ONLY: req.t('MSG_SENT_ONLY'),
    SERVICE_CENTER: req.t('SERVICE_CENTER'),
  });

  return rendered;
};

export const getPasswordResetHTML = (
  email: string,
  hashedEmail: string,
  password: string,
  req: ReqI18n,
): string => {
  const templateString = fs.readFileSync(
    path.resolve(__dirname, '../../html/password_reset.html'),
    'utf-8',
  );

  const rendered = ejs.render(templateString, {
    REDIRECT_URL: `${REDIRECT_URL}/reset_password/${qs.escape(email)}/${qs.escape(hashedEmail)}/${qs.escape(password)}`,
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

// eslint-disable-next-line
export const getToken = (req: Request & any): string => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};
