import { i18n } from 'i18next';

declare global {
  type ReqI18n = express.Request & i18n;
}
