# HackaTalk (Expo)

- [Contributing](https://github.com/dooboolab/hackatalk/blob/master/CONTRIBUTING.md#client)

> Specification

- [react-native](https://github.com/facebook/react-native)
- [react-navigation](https://github.com/react-navigation/react-navigation)
- [typescript](https://github.com/Microsoft/TypeScript)
- [localization](https://github.com/stefalda/ReactNativeLocalization)
- [styled-components](https://github.com/styled-components/styled-components)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [expo](https://expo.io)
- [@testing-library/react-native](https://www.native-testing-library.com/docs/install)
- [react-hook](https://reactjs.org/docs/hooks-intro.html)
- [graphql](https://graphql.org)
- [relay](https://relay.dev)

### Gain points

```
1. Sample of context-api with `react-hook` (`useContext`).
2. Know how to structure react native app with typescript.
3. Know how to navigate between screens with `react-navigation`.
4. Know how to write `react-native` app with bare work flow from `expo` with `unimodules`.
5. Know how to write test code with `@testing-library/react-native`.
6. Know how to `lint` your project with `eslint`.
7. Know how to localize your project.
```

### INSTALL

```
npm install && npm start
// or
yarn && yarn start
```

### Structures

```text
app/
├─ .dooboo // necessary if using dooboo-cli
├─ assets
│  └─ icons // app icons
│  └─ images // app images like background images
├─ node_modules/
├─ src/
│  └─ apis
│  └─ components
│     └─ navigations
│     └─ screen
│     └─ shared
│  └─ graphql
│  └─ hooks
│  └─ providers
│  └─ relay
│  └─ types
│  └─ utils
│  └─ App.tsx
│  └─ index.js
│  └─ styled.d.ts
│  └─ theme.ts
├─ test/
├─ web-build/
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .watchmanconfig
├─ app.json
├─ App.tsx
├─ babel.config.js
├─ codegen.yml
├─ config.sample.ts
├─ environment.d.ts
├─ jest.config.js
├─ metro.config.js
├─ package.json
├─ README.md
├─ relay.config.js
├─ schema.graphql
├─ STRINGS.ts
├─ tsconfig.json
├─ tsconfig.jest.json
├─ webpack.config.js
└─ yarn.lock
```

### .ENV

Run below to make your own `app` variables.

> `cp .config.sample.ts .config.ts`

- `env` variables

  | Name                      | default | required | description                 |
  | ------------------- | -------------------------------------------------------------------------------- | --------- | ----------------------- |
  | GRAPHQL_URL                  | `https://hackatalk.azurewebsites.net/graphql` | yes |  |
  | ROOT_URL                     | `https://hackatalk.azurewebsites.net`         | yes |  |
  | MYAPP_RELEASE_STORE_FILE     |                                      |     |  |
  | MYAPP_RELEASE_KEY_ALIAS      |                                      |     |  |
  | MYAPP_RELEASE_STORE_PASSWORD |                                      |     |  |
  | MYAPP_RELEASE_KEY_PASSWORD   |                                      |     |  |

### Running the project

Running the project is as simple as running

```sh
yarn start
```

This runs the `start` script specified in our `package.json`, and will spawn off a server which reloads the page as we save our files.
Typically the server runs at `http://localhost:8080`, but should be automatically opened for you.

### Testing the project

Testing is also just a command away:

```sh
yarn test
```

> Result

```
> jest -u

 PASS  src/components/shared/__tests__/Button.test.tsx
 PASS  src/components/screen/__tests__/Intro.test.tsx
 › 2 snapshots written.

Snapshot Summary
 › 2 snapshots written in 1 test suite.

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   2 added, 4 passed, 6 total
Time:        3.055s, estimated 6s
Ran all test suites
```

### Writing tests with Jest

We've created test examples with jest-ts in `src/components/screen/__tests__` and `src/components/shared/__tests__`. Since react is component oriented, we've designed to focus on writing test in same level of directory with component. You can simply run `npm test` to test if it succeeds and look more closer opening the source.

### Localization

We've defined Localization strings in `STRINGS.js` which is in root dir.
We used [react-native-localization](https://github.com/stefalda/ReactNativeLocalization) pacakage for this one.

```
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {
  HELLO: 'Hello',
  LOGIN: 'Login',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  SIGN_UP: 'SIGN UP',
  FORGOT_PW: 'Forgot password?',
  NAVIGATE: 'Navigate',
  CHANGE_THEME: 'Change theme',
};

const ko = {
  HELLO: '안녕하세요',
  LOGIN: '로그인',
  EMAIL: '이메일',
  PASSWORD: '패스워드',
  SIGN_UP: '회원가입',
  FORGOT_PW: '비밀번호를 잊어버리셨나요?',
  NAVIGATE: '이동하기',
  CHANGE_THEME: '테마변경',
};

i18n.fallbacks = true;
i18n.translations = { en, ko };
i18n.locale = Localization.locale;

export const getString = (param: string, mapObj?: Record<string, unknown>) => {
  if (mapObj) {
    i18n.t(param, mapObj);
  }
  return i18n.t(param);
};
```

### Troubleshoot

- Experiencing Localization.locale `undefined`? Setup your emulator once again as [decribed here](https://github.com/expo/expo/issues/5735#issuecomment-534063072).
