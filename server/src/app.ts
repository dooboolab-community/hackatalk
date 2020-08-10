import {
  encryptCredential,
  getToken,
  validateCredential,
} from './utils/auth';
import { resetPassword, verifyEmail } from './types/models/User';

import FilesystemBackend from 'i18next-node-fs-backend';
import cors from 'cors';
import ejs from 'ejs';
import express from 'express';
import fs from 'fs';
import i18next from 'i18next';
import middleware from 'i18next-express-middleware';
import multer from 'multer';
import path from 'path';
import qs from 'querystring';
import { uploadFileToAzureBlobFromFile } from './utils/azure';
import { verify } from 'jsonwebtoken';

// eslint-disable-next-line
require('dotenv').config();

interface VerificationToken {
  email: string;
  type: 'verifyEmail' | 'findPassword';
}

const {
  STORAGE_ENDPOINT,
  NODE_ENV,
} = process.env;

i18next
  .use(middleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({
    lng: 'en',
    preload: ['en', 'ko'],
    load: 'languageOnly',
    backend: {
      loadPath: path.join(__dirname, '../locales', '{{lng}}.json'),
      addPath: path.join(__dirname, '../locales', '{{lng}}.missing.json'),
    },
    fallbackLng: ['en', 'ko'],
    saveMissing: true,
    debug: false,
  });

export const createApp = (): express.Application => {
  const app = express();

  const filePath = path.join(__dirname, '../files');
  const verifyEmailToken = (token: string, appSecret: string)
    : VerificationToken =>
    verify(token, appSecret) as VerificationToken;

  app.use(cors());
  app.use(middleware.handle(i18next));
  app.use(express.static(filePath));
  app.use((req: ReqI18n, res, next) => {
    const { JWT_SECRET2 } = process.env;
    req.appSecret = JWT_SECRET2;
    next();
  });

  app.set('views', path.join(__dirname, '../html'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');

  app.get('/reset_password/:token/:password', async (req: ReqI18n, res) => {
    const token = qs.unescape(req.params.token);
    const randomPassword = qs.unescape(req.params.password);

    try {
      const validated = verifyEmailToken(token, req.appSecret);
      if (validated?.email && validated.type === 'findPassword') {
        const password = await encryptCredential(randomPassword);
        await resetPassword(validated.email, password);
        return res.render('password_changed', {
          REDIRECT_URL: 'https://hackatalk.dev',
          title: req.t('PW_CHANGED_TITLE'),
          text: req.t('PW_CHANGED'),
          SERVICE_CENTER: req.t('SERVICE_CENTER'),
        });
      }
      res.send('Error occured. Plesae try again.');
    } catch (err) {
      res.send('Error occured. Plesae try again.');
    }
  });
  app.get('/verify_email/:token', async (req: ReqI18n, res) => {
    const token = qs.unescape(req.params.token);

    try {
      const validated = verifyEmailToken(token, req.appSecret);
      if (validated?.email && validated.type === 'verifyEmail') {
        await verifyEmail(validated.email);
        return res.render('email_verified', {
          REDIRECT_URL: 'https://hackatalk.dev',
          TITLE: req.t('EMAIL_VERIFIED_TITLE'),
          TEXT: req.t('EMAIL_VERIFIED'),
          SERVICE_CENTER: req.t('SERVICE_CENTER'),
          GO_TO_SIGN_IN: req.t('GO_TO_SIGN_IN'),
        });
      }
      res.send('Error occured. Plesae try again.');
    } catch (err) {
      res.send('Error occured. Plesae try again.');
    }
  });

  app.post(
    '/upload_single',
    multer({ dest: './files' }).single('inputFile'),
    async (req, res) => {
      interface Result {
        message: string | unknown;
        status: number;
        url?: string;
      }

      const result: Result = {
        message: '',
        status: 0,
      };

      const token = getToken(req);

      if (!token) {
        result.message = 'User has not signed in.';
        result.status = 401;
        return res.json(result);
      }

      if (!req.file) {
        result.message = 'File is missing.';
        result.status = 400;
        return res.json(result);
      }

      const dir: string = req.body.dir ? req.body.dir : 'defaults';
      try {
        const resultUpload = await uploadFileToAzureBlobFromFile(
          `./files/${req.file.filename}`,
          req.file.filename,
          dir,
        );
        result.status = 200;
        result.message = resultUpload;
        result.url = `${STORAGE_ENDPOINT}/${dir}/${req.file.filename}`;
        res.json(result);
      } catch (err) {
        result.message = err;
        result.status = 400;
        res.json(result);
      } finally {
        fs.unlink(`./files/${req.file.filename}`, () => {
          // eslint-disable-next-line no-console
          console.log(`Local temp file deleted: ${req.file.filename}`);
        });
      }
    },
  );

  app.get('/', (req, res) => {
    // @ts-ignore
    res.send(`${req.t('IT_WORKS')} - Version 0.0.1\nENV: ${NODE_ENV}`);
  });

  return app;
};
