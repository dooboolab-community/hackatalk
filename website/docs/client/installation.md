---
id: installation
title: Installation
sidebar_label: Installation
---

Client project belongs to seperate directory [client](https://github.com/dooboolab/hackatalk/tree/master/client), in [github](https://github.com/dooboolab/hackatalk).


**You need to follow [react-native environment setup](https://reactnative.dev/docs/environment-setup) and [expo installation](https://docs.expo.io/get-started/installation) to continue further steps.**

1. Clone the sourcecode.
   ```
   git clone https://github.com/dooboolab/hackatalk.git
   ```
   > If you are willing to contribute to `HackaTalk` then please follow the [git forking workflow](https://medium.com/dooboolab/quick-start-for-contributing-to-whatssub-with-forking-workflow-16c8c971adc5) procedure.

2. Navigate to `/client`
   ```
   cd client
   ```
   - Note that `yarn.lock` and `package-lock.json` sometimes make collision. Try to delete one of them.

3. Copy the environment file.
   ```
   cp .env.sample .env
   ```
   You may ignore `facebookAppId`, `googleWebClientId`, `googleAndroidClientId`, `googleIOSClientId` and `sentryAuthToken` if you are not developing related features. Otherwise, you should create your own.

4. Install packages. We recommend using [yarn](https://classic.yarnpkg.com) instead of `npm`.
   ```
   yarn
   ```

   * **Note** If you are using android emulator, you may have to change the `localhost` address to your local `ip` address. Ex) 192.0.0.6

5. Create empty `google-services.json` file.
   ```
   touch google-services.json
   ```

6. Finally run `HackaTalk` by running `yarn start`.
   ```
   yarn start
   ```
   It will open up [expo](https://expo.io) console.

7. Running in `web` environment.
   ```
   yarn web
   ```
   > Above command will let you develop with [react fast refresh](https://javascript.plainenglish.io/react-fast-refresh-the-new-react-hot-reloader-652c6645548c).

**vscode extentions**
- Recommended [vscode extension list](https://gist.github.com/hyochan/815e9040593180c4725d7694d863e5a1#gistcomment-3019263) to help contributing.
