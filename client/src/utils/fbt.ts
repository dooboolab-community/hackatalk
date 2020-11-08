import * as Localization from 'expo-localization';

import { init } from 'fbt';
import intl from '../../assets/translatedFbts.json';

const DEFAULT_LOCALE = 'en';

export const viewerContext = {
  locale: DEFAULT_LOCALE,
};

export const initFbt = (): void => {
  viewerContext.locale = Localization.locale.substr(0, 2);

  init({
    translations: intl as FBT.Translations,
    hooks: {
      getViewerContext: (): { locale: string } => viewerContext,
    },
  });
};
