declare module '*.png' {
  const content: any;

  export default content;
}

declare module '*.svg' {
  import { IconType } from './src/types';

  const content: IconType;

  export default content;
}

declare module '*.json' {
  const content: any;

  export default content;
}
