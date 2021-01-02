import FilesystemBackend from 'i18next-node-fs-backend';
import RouteApi from './apis/root';
import cors from 'cors';
import ejs from 'ejs';
import express from 'express';
import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import path from 'path';

// eslint-disable-next-line
require('dotenv').config();

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

  app.use(cors());
  app.use(middleware.handle(i18next));
  app.use(express.static(filePath));

  app.use((req: ReqI18n, res, next) => {
    const { JWT_SECRET_ETC } = process.env;

    req.appSecretEtc = JWT_SECRET_ETC;
    next();
  });

  app.set('views', path.join(__dirname, '../html'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');

  app.use('', RouteApi);

  return app;
};
