import { Context } from '../context';
import bcrypt from 'bcrypt-nodejs';
import path from 'path';
import qs from 'querystring';
import { verify } from 'jsonwebtoken';

const SALT_ROUND = 10;

const env = process.env.NODE_ENV;
const envPath = env === 'development'
  ? path.resolve(__dirname, '../dotenv/dev.env')
  : env === 'test'
    ? path.resolve(__dirname, '../dotenv/test.env')
    : path.resolve(__dirname, '../dotenv/.env');

// eslint-disable-next-line
require('dotenv').config({ path: envPath });

const { JWT_SECRET = 'undefined' } = process.env;
export const APP_SECRET = JWT_SECRET;

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

export const getEmailVerificationHTML = (email: string, hashedEmail: string): string => `
By visiting below url link, you are able to signin to <strong>HackaTalk</strong> 🙌.<br/><br/>
${process.env.REDIRECT_URL}/verify_email/${qs.escape(email)}/${qs.escape(hashedEmail)}
`;

export const getPasswordResetHTML = (email: string, hashedEmail: string): string => `
By visiting below url link, your password will reset to <strong>dooboolab2017</strong>. <br/><br/>
${process.env.REDIRECT_URL}/reset_password/${qs.escape(email)}/${qs.escape(hashedEmail)}
`;

// eslint-disable-next-line
export const getToken = (req: Request & any): string => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
};
