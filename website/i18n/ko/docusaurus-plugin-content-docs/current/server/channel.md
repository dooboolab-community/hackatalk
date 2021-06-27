---
id: channel
title: 채널
sidebar_label: 채널
---

해당 페이지에서는 컨트리뷰팅을 희망하시는 분들께 해커톡 데이터 구조를 파악하는데 도움을 드리고자 합니다. 해커톡에 있는 `Channel`들이 어떻게 구성되어 있고 또 생성되는 알아보겠습니다.

`Channel` (aka `Chatroom`) 모델은 채팅 앱을 만들 때 굉장히 중요한 요소입니다. `Channel`은 사용자를 모아 채팅 환경을 준비합니다. 많은 관계형 모델이 `User`와 `Channel`사이에 존재할 수 있습니다. 이러한 중간 관계를 통해 개발자는 해커톡에 다양한 비즈니스 피쳐들을 쉽게 추가 할 수 있습니다. 그 중 하나인 `Membership` 모델을 살펴보겠습니다.

사용자가 다른 사용자에게 `Channel`에 대한 액세스 권한을 부여하며 `User`, `Membership`, `Channel`간에 관계가 생성됩니다. `Membership` 테이블에는 `User` 모델의 `userId`와 `Channel` 모델의`channelId`를 [primary key](https://en.wikipedia.org/wiki/Primary_key)로 지니고 있습니다.

또한, 사용자가 본인이 속한 `Channel`의 알림음을 조절하고자 할 때에도 `Membership` 테이블이 각 유저들의 알림음을 설정할 수 있도록 도와줍니다. 혹은 `Sound` 테이블을 별도로 `User`와 `Channel` 사이의 관계형 모델로 생성할 수도 있습니다. 이렇게 복잡한 로직들을 관계형 모델을 통해 구현해나갈 수 있습니다.

## [개체 관계 모델](https://en.wikipedia.org/wiki/Entity–relationship_model)

아래 [엔티티 관계 모델](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) 설계도는 해커톡의 첫 `proposal`입니다.

<img src="https://user-images.githubusercontent.com/27461460/88914167-2de67d80-d29d-11ea-8230-6762a4cfe1b4.png" width="1000"/>

> 위 [UML](https://creately.com/blog/diagrams/uml-diagram-types-examples)은 개발이 진행됨에 따라 계속 수정이 이루어지고 있기 때문에 최신 상태를 유지하지 않을 수 있습니다.

위 다이어그램에서 볼 수 있듯이 `Membership`에는 `userAlert`, `userMode` 그리고 `type`과 같은 필드들이 존재합니다. `type` 필드는 사용자가 `Channel`에서 어떤 권한을 가지고 있는지 구분해주고 있습니다. 이렇게 다양한 피쳐들을 하나의 모델에서 해결할 때 주로 [single table inheritance](https://en.wikipedia.org/wiki/Single_Table_Inheritance)로 칭합니다.

해당 다이어그램은 앞으로 해커톡에 기여하고자 하는 분들을 위해 제공되었습니다. 다시 한번 지속적이 변경이 이루어질 수 있음을 상기시켜드립니다.

## 채널 생성

다음으로 고유의 사용자를 확인하고 `Channel`을 찾는 방법에 대해 알아봅니다.

[ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)을 사용하여 개발을 하다 보면 [IN operator](https://stackoverflow.com/questions/42719750/sequelize-relation-with-where-in-array?rq=1)를 사용하는 경우가 있습니다. 이는 주로 하위 배열이 쿼리의 조건을 충족하는지 알아보기 위해 사용합니다.

해커톡에서는 [Prisma 필터링](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/filtering#filter-on-related-records)을 통해 이를 확인합니다. 하지만 `IN` 오퍼레이터를 사용하면 고유의 배열을 가진 결과만 받아오는 것은 아닙니다. ['tom', 'jerry']만 포함하는 `Channel`을 가져오고 싶지만 ['tom', 'jerry']를 포함하는 모든 `row`들을 불러옵니다.

<img src="https://user-images.githubusercontent.com/27461460/90379570-da09d000-e0b5-11ea-8215-df2828108b58.png" width="200"/>

위 이미지에서 보이는 것처럼 `tom`과 `jerry`를 포함한 결과를 `IN` 오퍼레이터를 통해 불러오면 `tom`과 `jerry`만 포함되는 결과만 받아오지 않습니다. 고유한 채팅방을 찾으려면 우리는 `tom`과 `jerry`만 포함된 결과를 받아올 수 있어야 합니다. 관련하여 비슷한 토론을 [Prisma1 forum](https://v1.prisma.io/forum/t/query-for-exact-match-of-array-of-ids/5700/17)에서 볼 수 있습니다.

해커톡에서는 `Channel`의 `userIDs` 외에 고유 사용자 수를 확인하여 문제를 해결하고 있습니다. 아래의 코드 외에 더 좋은 코드에 대한 제안이 있으시면 `PR` 요청을 해주세요! 관련 코드는 [Channel/mutation.ts](https://github.com/dooboolab/hackatalk/blob/master/server/src/resolvers/Channel/mutation.ts)에 있습니다. **2020년 8월 17일**

아래 코드는 간략한 구현사항입니다.

`userIds` = 채널에 속한 모든 `userId`에서 로그인 된 사용자를 제외한 배열입니다.

1. `findChannelWithUserIds()`는 먼저 `userIds`를 포함하는 모든 `channel`들을 불러옵니다.
2. `totalUsers`에는 우리가 찾으려고 하는 `userIds`의 길이를 대입합니다. 
3. `For` 루프 문을 돌면서 `totalUsers`와 동일한 길이의 사용자들을 지닌 `Channel`을 찾습니다.
4. 매칭된 채널은 `existingChannel`에 대입하고 리턴합니다.

```ts
const findChannelWithUserIds = async () => {
  const channels = await ctx.prisma.channel.findMany({
    include: {
      membership: {
        select: {
          userId: true,
          membershipType: true,
        },
      },
    },
    where: {
      membership: {
        every: {
          userId: { in: [userId, ...userIds] },
        },
      },
    },
  });

  const totalUsers = userIds.length + 1; // +1 for auth user

  let existingChannel: Channel;

  for (const channel of channels) {
    if (totalUsers === channel.membership.length) {
      existingChannel = channel;
      break;
    }
  }

  return existingChannel;
};

const existingChannel = await findChannelWithUserIds();
```

이렇게 고유한 `userId` 배열로 `unique`한 `private` 채널을 관리하고 있습니다.

## 메시지를 보내며 채널 만들기

채널을 생성함과 동시에 메시지를 보낼 수도 있습니다. 아래 코드는 [Channel/mutation.ts](https://github.com/dooboolab/hackatalk/blob/master/server/src/resolvers/Channel/mutation.ts)에서 볼 수 있습니다.

```ts
message && await createMessage(message, existingChannel.id);
```

메시지 파라미터가 `null`이 아닌지를 확인한 후 `createMessage`를 실행합니다.

```ts
const createMessage = (
  { text, messageType = MessageType.text, fileUrls = [], imageUrls = [] } : Message,
  channelId: string,
) => ctx.prisma.message.create({
  data: {
    text,
    messageType,
    fileUrls: { set: fileUrls },
    imageUrls: { set: imageUrls },
    channel: { connect: { id: channelId } },
    sender: { connect: { id: userId } },
  },
});
```

## Types of channels

채널의 종류는 `ChannelType`으로 정의되어 있으며 **private**과 **public** 두가지 속성을 가집니다.

**public** 채널은 채널에 속한 사람들이 고유할 필요가 없습니다. 하지만 **private** 채널은 고유한 사람들로 형성이 되어 있어 중복될 수 없습니다.
* `userIds` 배열을 `ChannelCreateInput`에 전달하면서 해당 사용자들은 새로운 채널에 속할 수 있는 `Permission`을 가집니다. 만약 채널이 **public**이면 채널에 속한 각각의 사용자들은 다른 `permissionType`들을 가질 수 있고 한명만이 `owner` 권한을 가질 것입니다.

## 채널 나가기


이번 섹션에서는 사용자가 채널을 나가는 과정을 설명합니다.

`private` 채널의 경우 `Membership` 모델 내에 `isVisible`이란 필드를 가집니다. 사용자가 채널을 떠나면 `isVisible` 값이 `false`가 되어 클라이언트에서 채널을 숨길 수 있습니다. 의도적으로 떠난 사용자만 채널이 보이지 않아야 합니다.

하지만 다시 대화가 시작되면 `isVisible`은 다시 `true`로 변경될 것입니다. 이때 `changeVisibilityWhenInvisible`이 실행됩니다. 현 시나리오는 [slack direct messaging](https://slack.com/intl/en-kr/help/articles/212281468-What-is-a-direct-message)을 참고했습니다.

```ts
const changeVisibilityWhenInvisible = () => ctx.prisma.membership.update({
  data: { isVisible: true },
  where: {
    userId_channelId: {
      userId,
      channelId: existingChannel.id,
    },
  },
});
```

## 현재 상황

#### 08/17/2020

모바일 앱에서는 현재 **private** 채널만 구현이 되어있습니다. 그리고 **public** 채널 시나리오는 미래에 구현될 예정입니다. **public** 채널은 [slack의 DM](https://slack.com/intl/en-kr/help/articles/212281468-What-is-a-direct-message)을 제외한 모든 종류의 그룹 채팅입니다.
