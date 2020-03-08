# HackaTalk

[![CircleCI](https://circleci.com/gh/dooboolab/hackatalk-mobile.svg?style=shield)](https://circleci.com/gh/dooboolab/hackatalk-mobile)
[![codecov](https://codecov.io/gh/dooboolab/hackatalk-mobile/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/hackatalk-mobile)
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

![aTmc5jrhbo](https://user-images.githubusercontent.com/27461460/65466719-a79e2580-de9a-11e9-965e-c4c28a98346e.gif)

## Contributing to `HackaTalk`

- See also
  - dooboolab's [vision-and-mission](https://github.com/dooboolab/dooboolab.com/blob/master/vision-and-mission.md)
  - dooboolab's [code of conduct](https://github.com/dooboolab/dooboolab.com/blob/master/code-of-conduct.md)
- [Contributing](CONTRIBUTING.md)

> Specification

- [react-native](https://github.com/facebook/react-native)
- [react-navigation](https://github.com/react-navigation/react-navigation)
- [react-native-unimodules](https://github.com/unimodules/react-native-unimodules)
- [typescript](https://github.com/Microsoft/TypeScript)
- [localization](https://github.com/stefalda/ReactNativeLocalization)
- [styled-components](https://github.com/styled-components/styled-components)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [@testing-library/react-native](https://www.native-testing-library.com/docs/install)
- [react-hook](https://reactjs.org/docs/hooks-intro.html)
- [graphql](https://graphql.org)
- [apollo-client](https://www.apollographql.com/docs/react)

### Gain points

```
1. Sample of context-api with `react-hook` (`useContext`).
2. Know how to structure react native app with typescript.
3. Know how to navigate between screens with `react-navigation`.
4. Know how to write `react-native` app with bare work flow from `expo` with `unimodules`.
5. Know how to write test code with `@testing-library/react-native`.
6. Know how to `lint` your project with `eslint`.
7. Know how to localize your project.
8. Know the hack of e2e encryption chat app.
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
│  └─ apollo
│  └─ components
│     └─ navigations
│     └─ screen
│     └─ shared
│  └─ graphql
│  └─ hooks
│  └─ contexts
│  └─ providers
│  └─ types
│  └─ utils
│  └─ App.tsx
│  └─ styled.d.ts
│  └─ theme.ts
├─ test/
├─ .env.sample
├─ .eslintrc.js
├─ .buckconfig
├─ .gitattributes
├─ .gitignore
├─ .watchmanconfig
├─ app.json
├─ babel.config.js
├─ CLA.md
├─ CODE_OF_CONDUCT.md
├─ CONTRIBUTING.md
├─ environment.d.ts
├─ index.js
├─ jest.config.js
├─ metro.config.js
├─ package.json
├─ README.md
├─ STRINGS.ts
├─ tsconfig.jest.json
├─ tsconfig.json
└─ yarn.lock
```

### .ENV

Run below to make your own `app` variables.

> `cp .env.sample .env`

- `env` variables

MYAPP_RELEASE_STORE_FILE=
MYAPP_RELEASE_KEY_ALIAS=
MYAPP_RELEASE_STORE_PASSWORD=
MYAPP_RELEASE_KEY_PASSWORD=


  | Name                      | default | required | description                 |
  | ------------------- | -------------------------------------------------------------------------------- | --------- | ----------------------- |
  | iOSClientId                  |                                      |     | CLIENT_ID in `GoogleService-Info.plist` `firebase` ios app project. |
  | GRAPHQL_URL                  | `http://stage.hackatalk.dev/graphql` | yes |  |
  | ROOT_URL                     | `http://stage.hackatalk.dev`         | yes |  |
  | MYAPP_RELEASE_STORE_FILE     |                                      |     |  |
  | MYAPP_RELEASE_KEY_ALIAS      |                                      |     |  |
  | MYAPP_RELEASE_STORE_PASSWORD |                                      |     |  |
  | MYAPP_RELEASE_KEY_PASSWORD   |                                      |     |  |

  ```
  iOSClientId=iOSClientId
  GRAPHQL_URL=http://stage.hackatalk.dev/graphql
  ROOT_URL=http://stage.hackatalk.dev

  # Android
  MYAPP_RELEASE_STORE_FILE=
  MYAPP_RELEASE_KEY_ALIAS=
  MYAPP_RELEASE_STORE_PASSWORD=
  MYAPP_RELEASE_KEY_PASSWORD=
  ```

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

export const getString = (param: string, mapObj?: object) => {
  if (mapObj) {
    i18n.t(param, mapObj);
  }
  return i18n.t(param);
};
```

#### Android

1. Create new Android project
1. Set package name com.dooboolab.hackatalk
1. Set SHA1 or SHA256 hash keys from `expo fetch:android:hashes`
1. Download `google-services.json` to hackatalk root folder

#### iOS

1. Create new iOS project
1. Set bundleIdentifier com.dooboolab.hackatalk
1. Download `GoogleService-Info.plist` to hackatalk root folder

### Version of react-native

0.61

### React navigation

5

### Troubleshoot

- Experiencing Localization.locale `undefined`? Setup your emulator once again as [decribed here](https://github.com/expo/expo/issues/5735#issuecomment-534063072).
- Build failing with `virgil sdk`? [Here is workaround](https://github.com/dooboolab/hackatalk-mobile/pull/111#issuecomment-590284580).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://dooboolab.com"><img src="https://avatars0.githubusercontent.com/u/27461460?v=4" width="60px;" alt=""/><br /><sub><b>Hyo Chan Jang</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=hyochan" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=hyochan" title="Tests">⚠️</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=hyochan" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/youngsu-han/"><img src="https://avatars1.githubusercontent.com/u/22214150?v=4" width="60px;" alt=""/><br /><sub><b>Youngsu Han</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=heyman333" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=heyman333" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/godon019"><img src="https://avatars1.githubusercontent.com/u/10363850?v=4" width="60px;" alt=""/><br /><sub><b>Dong-Kyun Ko</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=godon019" title="Documentation">📖</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=godon019" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=godon019" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/marsinearth"><img src="https://avatars0.githubusercontent.com/u/6101260?v=4" width="60px;" alt=""/><br /><sub><b>Hwasung Kim</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=marsinearth" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=marsinearth" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/JongtaekChoi"><img src="https://avatars1.githubusercontent.com/u/17980230?v=4" width="60px;" alt=""/><br /><sub><b>Choi, Jongtaek</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=JongtaekChoi" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=JongtaekChoi" title="Tests">⚠️</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=JongtaekChoi" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.facebook.com/huy1965"><img src="https://avatars3.githubusercontent.com/u/1715578?v=4" width="60px;" alt=""/><br /><sub><b>Huy, Tae Young</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=kty1965" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=kty1965" title="Tests">⚠️</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=kty1965" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/YongPilMoon"><img src="https://avatars1.githubusercontent.com/u/22088158?v=4" width="60px;" alt=""/><br /><sub><b>YongPilMoon</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=YongPilMoon" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=YongPilMoon" title="Tests">⚠️</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=YongPilMoon" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/bumjoo"><img src="https://avatars1.githubusercontent.com/u/43266906?v=4" width="60px;" alt=""/><br /><sub><b>bumjoo.lee</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=bumjoo" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=bumjoo" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/hankkuu"><img src="https://avatars2.githubusercontent.com/u/7829802?v=4" width="60px;" alt=""/><br /><sub><b>hankkuu</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=hankkuu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Sandwichj"><img src="https://avatars1.githubusercontent.com/u/11019960?v=4" width="60px;" alt=""/><br /><sub><b>Minseok</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=Sandwichj" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=Sandwichj" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/jb9229"><img src="https://avatars3.githubusercontent.com/u/3200647?v=4" width="60px;" alt=""/><br /><sub><b>cwalker</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=jb9229" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=jb9229" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://geoseong.github.io/"><img src="https://avatars0.githubusercontent.com/u/19166187?v=4" width="60px;" alt=""/><br /><sub><b>TaeSeong Park</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=geoseong" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=geoseong" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/daheeahn"><img src="https://avatars3.githubusercontent.com/u/38369729?v=4" width="60px;" alt=""/><br /><sub><b>daheeahn</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=daheeahn" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=daheeahn" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/devohno"><img src="https://avatars1.githubusercontent.com/u/55861805?v=4" width="60px;" alt=""/><br /><sub><b>Eunho Lee</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=devohno" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=devohno" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://stackoverflow.com/users/515932/jeff-gu-kang?tab=profile"><img src="https://avatars2.githubusercontent.com/u/216363?v=4" width="60px;" alt=""/><br /><sub><b>Jeff Gu Kang</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=JeffGuKang" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=JeffGuKang" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/dlgmltjr0925"><img src="https://avatars0.githubusercontent.com/u/33364619?v=4" width="60px;" alt=""/><br /><sub><b>dlgmltjr0925</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=dlgmltjr0925" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=dlgmltjr0925" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://utaha.moe/about"><img src="https://avatars0.githubusercontent.com/u/12093323?v=4" width="60px;" alt=""/><br /><sub><b>Jaeho Cho (Barney)</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=real0131" title="Code">💻</a></td>
    <td align="center"><a href="https://selina-park.tistory.com/"><img src="https://avatars3.githubusercontent.com/u/31176502?v=4" width="60px;" alt=""/><br /><sub><b>jinsun Park</b></sub></a><br /><a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=ilikeu7246" title="Code">💻</a> <a href="https://github.com/dooboolab/hackatalk-mobile/commits?author=ilikeu7246" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
