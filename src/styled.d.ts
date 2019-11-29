import 'styled-components';
import { DoobooTheme } from '@dooboo-ui/native-theme';
import { Theme } from './theme';

type AllTheme = Theme & DoobooTheme;

interface CustomTheme extends AllTheme {
  background: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {
    background: string;
  }
}
