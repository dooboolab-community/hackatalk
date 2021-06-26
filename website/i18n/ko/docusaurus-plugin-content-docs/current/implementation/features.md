---
id: features
title: 기능
sidebar_label: 기능
---

기능 섹션에서는 사용자들이 누릴 수 있는 서비스들에 대해서 기술합니다. 해커톡은 기본적으로 **피어 투 피어** 그리고 **그룹** 채팅을 제공하고자 합니다. 그리고 현대적인 채팅 어플리케이션에서 제공하는 다양한 기능들을 접목시키고자 합니다.

## 채널 생성

<img src="https://user-images.githubusercontent.com/27461460/89128311-d875cf00-d52f-11ea-9107-2ee2e6fe2e58.png" width="200"/>

채널을 생성하는 것은 채팅방을 개설하는 것을 의미합니다. 만약 사용자가 특정 사용자 혹은 여러 사용자들을 선택하여 채널을 개설한다면 이는 **private** 채팅으로 구분됩니다. 또 다른 채널 타입으로 **public**이 있는데 이는 **그룹** 채팅방을 의미합니다. 그룹 채팅방을 개설하려면 채널의 이름(`name`)이 입력되어야 합니다. 이후에 사용자는 다른 사용자들을 **public** 채널에 초대할 수 있습니다. 물론 `end 유저들`한테는 이런한 스탭을 추상화해서 제공해줄 수 있습니다만 서버에서는 해당 절차를 밟아야 합니다. 아래는 3가지의 다른 시나리오 유형들입니다.

<br/>

```graphql
createChannel(channel: ChannelCreateInput): Channel
```

1. 1대1 `private` 채팅
   * 사용자가 다른 사용자 한명을 선택하여 `Channel`을 생성합니다.
2. N대N `private` 채팅
   * 사용자가 여러 사용자들을 선택하여 `Channel`을 개설합니다.
     > 유의해야할 점은 동일한 사용자들이 이미 어떤 `Channel`에 존재한다면 데이터베이스에서는 새로운 채널을 개설하지 않고 기존의 채널을 반환할 것입니다.
3. N대N `public` 채팅
   * 사용자가 채널명을 지정하여 `Channel`을 생성합니다.
     > `public` `Channel`은 중복될 수 있습니다.

<br/>

`Channel`과 `Message` 간에는 `Membership`이라는 관계형 테이블이 존재합니다. `Membership`은 [single table inheritance](https://en.wikipedia.org/wiki/Single_Table_Inheritance)로 사용자들은 해당 테이블에 알림 설정 혹은 사용자별로 `Channel`에 대한 권한을 부여할 수 있습니다.

기본적으로 `Channel`을 개설한 `User`는 `Owner` 권한을 가집니다. 여기서 `Owner` 권한을 가진 사용자는 `Channel`에 있는 사용자들의 역할을 지정할 수 있습니다. 그리고 `Channel` 안에 있는 사용자들은 자유롭게 알림 설정을 하여 `음소거`, `진동`, 그리고 `소리` 등의 설정을 할 수 있습니다. 관련하여 짜여진 [RDBMS](https://techterms.com/definition/rdbms)는 아래의 관계를 가집니다.

<img src="https://user-images.githubusercontent.com/27461460/89128370-3b676600-d530-11ea-9c10-e2d133fed021.png" width="400"/>
<br/>

### 채널 수정 및 삭제

`Owner` 권한을 가진 사용자만 유일하게 채널 정보를 수정하거나 삭제할 수 있습니다. 이 때 우리는 [soft delete](https://guides.cfwheels.org/docs/soft-delete) 정책을 따르며 이는 주요 모델들에게 적용됩니다. 주요 모델은 `User`, `Channel` 등이 있습니다. 종속(`cascade`)된 모델들은 `soft delete` 정책이 적용되지 않아서 삭제 요청시 모든 데이터가 즉각 삭제됩니다.

## 친구 추가

`HacakTalk`에서 회원가입을 한 모든 사용자들을 검색할 수 있습니다.

<img src="https://user-images.githubusercontent.com/27461460/89128315-dad82900-d52f-11ea-9e1b-5a5fd4f29010.png" width="200"/>

위 `SearchUser` 화면에서 사용자를 친구리스트에 추가하거나 바로 채팅을 시작할 수 있습니다.

## 채팅 시작하기

<img src="https://user-images.githubusercontent.com/27461460/89128308-d6ac0b80-d52f-11ea-9368-ebe6e7cb9d15.png" width="200"/>

새로운 사용자가 채팅을 시작하려 하는데 `Channel`이 존재하지 않는다면 내부적으로 새로운 채널을 생성할 것입니다. 이는 [Creating channel](#creating-channel) 플로우에 상세하게 작성되어 있습니다.

현재 3가지 종류`type`의 메시지를 제공하고 있습니다.
1. 텍스트
2. 사진
3. 파일
