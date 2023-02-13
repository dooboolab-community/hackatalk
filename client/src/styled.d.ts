import type {DoobooTheme} from 'dooboo-ui';
import type {Theme as HackaTalkTheme} from './theme';

interface AllTheme extends HackaTalkTheme, DoobooTheme {}

declare module '@emotion/react' {
  export interface Theme extends AllTheme {}
}

declare module 'dooboo-ui' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  export interface DoobooTheme extends AllTheme {}
}
