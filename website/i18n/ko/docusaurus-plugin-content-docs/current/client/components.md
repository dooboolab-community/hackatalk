---
id: components
title: 컴포넌트
sidebar_label: 컴포넌트
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Component 만들기

`HackaTalk`에 추가 구성 요소를 생성하려면`dooboo page` 명령을 통해 쉽게 실행할 수 있습니다. 그러려면 먼저 [dooboo-cli](https://www.npmjs.com/package/dooboo-cli)를 설치해야합니다.

### [dooboo-cli](https://www.npmjs.com/package/dooboo-cli) 사용하기

[dooboo-cli](https://www.npmjs.com/package/dooboo-cli)가 **version 3**으로 2019년 12월에 업데이트 되었습니다. [Mediaum 포스트](https://medium.com/dooboolab/announcing-dooboo-cli-v3-5c9fceeb2ac4)에서 관련 내용을 확인 할 수 있습니다.

그리고 **dooboo-cli@6** 버전부터는 템플릿에 다소 변경이 있습니다. 과거에는 `navigation`, `screen`, `shared`로 폴더관리를 했지만 해당 버전부터는 `navigations`, `pages`, 그리고 `uis` 구조로 컴포넌트를 관리하고 있습니다.

<img src={useBaseUrl('img/dooboo-cli-5.png')} alt="dooboo-cli-v5 sample commands" width="600"/>

* 위 스크린샷으로 `dooboo-cli`를 이용하여 빠르게 컴포넌트 템플릿을 만드는 방법을 확인할 수 있습니다.

## 타입

위에서 언급한 것처럼 현재 메인 컴포넌트들은 대표적으로 `navigation`, `page`, `ui` 3가지 특성으로 구분하고 있습니다.

### Navigation

네비게이션 컴포넌트는 하나의 스크린을 담당하는 컴포넌트들을 묶어주는 컴포넌트입니다. 하지만 만약에 여러분의 앱이 굉장히 복잡한 네비게이션 구조를 가지고 있다면 네비게이션 컴포넌트들을 별도 디렉토리가 아닌 `page` 컴포넌트 안에서 작성하는 것을 추천드립니다.

#### 예시
<img src={useBaseUrl('img/nested-navigation-structure.png')} alt="dooboo-cli-v5 sample commands" width='300' />

위 구조는 복잡한 네비게이션 구조 안에서 당신으로 하여금 더 쉽게 원하는 컴포넌트를 찾아갈 수 있도록 도와줍니다.

### Page

`Page` 컴포넌트는 이른바 `full-screen-sized` component로 대개 디바이스 스크린 사이즈만큼 차지하는 컴포넌트들을 말합니다. 하지만 가끔 `탭` 화면으로 가려져 조금 더 작은 스크린 사이즈를 커버하는 화면들이 있습니다. 이러한 경우 만약 하나의 `page` 컴포넌트가 유일하게 나머지 영역을 모두 관할하고 있다면 이 또한 `page` 컴포넌트로 취급합니다.

### UI

UI 컴포넌트는 UI 레이어에 중점을 둔 재사용 가능한 컴포넌트입니다. `Button`, `EditText`, `Calendar` 등과 같은 컴포넌트들이 여기에 해당됩니다. 많은 `page` 컴포넌트들이 UI 컴포넌트들을 재사용할 있습니다.
