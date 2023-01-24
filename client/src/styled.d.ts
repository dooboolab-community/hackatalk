import '@emotion/react';

import type {DoobooTheme} from 'dooboo-ui';
import type {Theme} from './theme';

type AllTheme = Theme & DoobooTheme;

interface CustomTheme extends AllTheme {
  background: string;
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  export interface Theme extends CustomTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
