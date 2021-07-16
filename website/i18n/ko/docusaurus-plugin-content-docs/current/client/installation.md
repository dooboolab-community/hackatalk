---
id: installation
title: 설치
sidebar_label: 설치
---

Client 프로젝트는 [github 소스코드](https://github.com/dooboolab/hackatalk)에서 별도 디렉터리인 [client](https://github.com/dooboolab/hackatalk/tree/master/client)에서 작성되었습니다.


**다음 단계로 넘어가기 전에 [리액트네이티브 환경설정](https://reactnative.dev/docs/environment-setup) 그리고 [엑스포 설치](https://docs.expo.io/get-started/installation)를 완료해주세요.**

1. 소스코드를 클론합니다.
   ```
   git clone https://github.com/dooboolab/hackatalk.git
   ```
   > `HackaTalk`에 기여하시려면 커뮤니티에서 작성한 [git forking workflow](https://medium.com/dooboolab/quick-start-for-contributing-to-whatssub-with-forking-workflow-16c8c971adc5)를 따라주세요.

2. `/client` 폴더로 이동해주세요.
   ```
   cd client
   ```
   - `yarn.lock`과`package-lock.json`은 때때로 충돌을 일으킵니다. 그들 중 하나를 삭제해주세요.

3. 환경 파일을 복사해주세요.
   ```
   cp .env.sample .env
   ```
   관련 기능을 개발하지 않는 경우`facebookAppId`,`googleWebClientId`,`googleAndroidClientId`,`googleIOSClientId` 및`sentryAuthToken`은 무시해도 무방합니다. 해당 기능을 개발해야하는 경우 직접 본인들의 소셜 계정을 이용해주세요.

   * **참고**로 android emulator에서 실행하는 경우 `localhost` 주소를 내부 `ip` 주소로 바꿔주세요. 예) 192.0.0.6

4. 빈 `google-services.json` 파일을 만들어주세요.
   ```
   touch google-services.json
   ```

5. 패키지를 설치합니다. `npm` 대신 [yarn](https://classic.yarnpkg.com)을 사용하는 것을 추천드립니다.
   ```
   yarn
   ```

6. 마지막으로`yarn start`를 실행하여`HackaTalk`를 실행합니다.
   ```
   yarn start
   ```
   위 스크립트를 실행하면 [expo](https://expo.io) 콘솔이 열립니다.

7. 웹 환경에서 실행하기.
   ```
   yarn web
   ```
   > 위 스크립트르  [react fast refresh](https://javascript.plainenglish.io/react-fast-refresh-the-new-react-hot-reloader-652c6645548c)로 즉각적으로 웹 개발을 해나갈 수 있습니다.

**vscode extentions**
- 컨트리뷰팅을 용이하게 위해 [vscode extension 목록](https://gist.github.com/hyochan/815e9040593180c4725d7694d863e5a1#gistcomment-3019263)들을 설치할 것을 권장드립니다.