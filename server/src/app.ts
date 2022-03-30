import FilesystemBackend from 'i18next-node-fs-backend';
import RouteApi from './apis/root';
import {assert} from './utils/assert';
import cors from 'cors';
import ejs from 'ejs';
import express from 'express';
import {graphqlUploadExpress} from 'graphql-upload';
import i18Middleware from 'i18next-http-middleware';
import i18next from 'i18next';
import path from 'path';
import {version} from '../package.json';

// eslint-disable-next-line
require('dotenv').config();

/**
 * Express middleware for loading required environment variables into req object.
 */
const environmentVariableMiddleware = (
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
): void => {
  const appSecret = process.env.JWT_SECRET;
  const appSecretEtc = process.env.JWT_SECRET_ETC;

  // Throw an error when there is any missing environment variable.
  assert(appSecret, 'Missing JWT_SECRET environment variable.');
  assert(appSecretEtc, 'Missing JWT_SECRET_ETC environment variable.');

  req.appSecret = appSecret;
  req.appSecretEtc = appSecretEtc;

  next();
};

i18next
  .use(i18Middleware.LanguageDetector)
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

  app.use(i18Middleware.handle(i18next));
  app.use(express.static(filePath));
  app.use(environmentVariableMiddleware);
  app.use(express.json());
  app.use(cors());

  app.use(
    '/graphql',
    graphqlUploadExpress({maxFileSize: 100000000, maxFiles: 10}), // 100mb
  );

  app.get('/', (req, res) => {
    res.send(`${req.t('IT_WORKS')} - ${version}`);
  });

  app.set('views', path.join(__dirname, '../html'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');

  app.use('', RouteApi);

  return app;
};
