import { Context } from '../context';
import bcrypt from 'bcrypt-nodejs';
import ejs from 'ejs';
import fs from 'fs';
import i18next from 'i18next';
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

export const getEmailVerificationHTML = (email: string, hashedEmail: string): string => {
  const templateString = fs.readFileSync(
    path.resolve(__dirname, '../../html/email_verification.html'),
    'utf-8',
  );

  const rendered = ejs.render(templateString, {
    REDIRECT_URL: `${REDIRECT_URL}/verify_email/${qs.escape(email)}/${qs.escape(hashedEmail)}`,
    WELCOME_SIGNUP: i18next.t('WELCOME_SIGNUP'),
    WELCOME: i18next.t('WELCOME'),
    VERIFY_EMAIL: i18next.t('VERIFY_EMAIL'),
    MESSAGE_SENT_ONLY: i18next.t('MSG_SENT_ONLY'),
    SERVICE_CENTER: i18next.t('SERVICE_CENTER'),
  });

  return rendered;
};

export const getPasswordResetHTML = (email: string, hashedEmail: string, password: string): string => {
  const templateString = fs.readFileSync(
    path.resolve(__dirname, '../../html/password_reset.html'),
    'utf-8',
  );

  const rendered = ejs.render(templateString, {
    REDIRECT_URL: `${REDIRECT_URL}/reset_password/${qs.escape(email)}/${qs.escape(hashedEmail)}/${qs.escape(password)}`,
    HELLO: i18next.t('HELLO'),
    CLICK_TO_RESET_PW: i18next.t('CLICK_TO_RESET_PW'),
    PASSWORD: i18next.t('PASSWORD'),
    CHANGE_PASSWORD: i18next.t('CHANGE_PASSWORD'),
    MSG_SENT_ONLY: i18next.t('MSG_SENT_ONLY'),
    SERVICE_CENTER: i18next.t('SERVICE_CENTER'),
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
