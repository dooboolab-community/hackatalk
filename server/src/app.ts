import {
  encryptCredential,
  getToken,
  validateCredential,
} from './utils/auth';
import { resetPassword, verifyEmail } from './types/models/User';

import FilesystemBackend from 'i18next-node-fs-backend';
import cors from 'cors';
import createOrGetVirgilJwtGenerator from './utils/virgil';
import express from 'express';
import fs from 'fs';
import i18next from 'i18next';
import middleware from 'i18next-express-middleware';
import multer from 'multer';
import path from 'path';
import qs from 'querystring';
import { uploadFileToAzureBlobFromFile } from './utils/azure';

// eslint-disable-next-line
require('dotenv').config();

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

  app.use(cors());
  app.use(middleware.handle(i18next));

  app.get('/reset_password/:email/:hashed', async (req, res) => {
    const email = qs.unescape(req.params.email);
    const hashed = qs.unescape(req.params.hashed);

    try {
      const validated = await validateCredential(email, hashed);
      if (validated) {
        const password = await encryptCredential('dooboolab2017');
        await resetPassword(email, password);
        return res.send(
          'Your password has successfully changed. Please sign in and change the password.',
        );
      }
      res.send('Error occured. Plesae try again.');
    } catch (err) {
      res.send('Error occured. Plesae try again.');
    }
  });
  app.get('/verify_email/:email/:hashed', async (req, res) => {
    const email = qs.unescape(req.params.email);
    const hashed = qs.unescape(req.params.hashed);

    try {
      const validated = await validateCredential(email, hashed);
      if (validated) {
        await verifyEmail(email);
        return res.send(
          'Your email has been verified. Please continue with HackaTalk 👊',
        );
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

  app.get('/virgil-jwt/:identity', async (req: express.Request, res) => {
    const jwtGenerator = await createOrGetVirgilJwtGenerator();
    // @ts-ignore
    const jwt = jwtGenerator.generateToken(req.params.identity);
    res.send(jwt.toString());
  });

  app.get('/', (req, res) => {
    // @ts-ignore
    res.send(`${req.t('IT_WORKS')} - Version 0.0.1\nENV: ${NODE_ENV}`);
  });

  return app;
};
