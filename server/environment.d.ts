import {i18n} from 'i18next';

declare global {
  namespace Express {
    interface Request extends i18n {
      appSecret: string;
      appSecretEtc: string;
    }
  }
}
