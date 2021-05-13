---
id: installation
title: Installation
sidebar_label: Installation
---

Client project belongs to seperate directory [client](https://github.com/dooboolab/hackatalk/tree/master/client), in [github](https://github.com/dooboolab/hackatalk).


**You need to follow [react-native environment setup](https://reactnative.dev/docs/environment-setup) and [expo installation](https://docs.expo.io/get-started/installation) to continue further steps.**

> We recommend to fork the `repository` first instead of cloning directly.

1. Clone the sourcecode.
2. Navigate to `/client`
   ```
   cd client
   ```
   - Also note that yarn.lock and package-lock.json sometimes make collision. Try to delete one of them.

3. Copy the environment file.
   ```
   cp config.sample.ts config.ts
   ```
4. Install packages. We recommend using [yarn](https://classic.yarnpkg.com) instead of `npm`.
   ```
   yarn
   ```
5. Finally run `HackaTalk` by running `yarn start`.
   ```
   yarn start
   ```
   - If you have an error in node_modules, try
   ```
   rm -rf node_modules && yarn
   ```
   this will reinstall node_modules and yarn after this, run yarn start again.

6. Login to Hackatalk
   
   - You can log into Hackatalk with 
      ID : hackatalk@gmail.com
      pass : password12!
