---
id: channel
title: 채널
sidebar_label: 채널
---

해당 페이지에서는 컨트리뷰팅을 희망하시는 분들께 해커톡 데이터 구조를 파악하는데 도움을 드리고자 합니다. 해커톡에 있는 `Channel`들이 어떻게 구성되어 있고 또 생성되는 알아보겠습니다.

`Channel` (aka `Chatroom`) 모델은 채팅 앱을 만들 때 굉장히 중요한 요소입니다. `Channel`은 사용자를 모아 채팅 환경을 준비합니다. 많은 관계형 모델이 `User`와 `Channel`사이에 존재할 수 있습니다. 이러한 중간 관계를 통해 개발자는 해커톡에 다양한 비즈니스 피쳐들을 쉽게 추가 할 수 있습니다. 그 중 하나인 `Membership` 모델을 살펴보겠습니다.

사용자가 다른 사용자에게 `Channel`에 대한 액세스 권한을 부여하며 `User`, `Membership`, `Channel`간에 관계가 생성됩니다. `Membership` 테이블에는 `User` 모델의 `userId`와 `Channel` 모델의`channelId`를 [primary key](https://en.wikipedia.org/wiki/Primary_key)로 지니고 있습니다.

또한, 사용자가 본인이 속한 `Channel`의 알림음을 조절하고자 할 때에도 `Membership` 테이블이 각 유저들의 알림음을 설정할 수 있도록 도와줍니다. 혹은 `Sound` 테이블을 별도로 `User`와 `Channel` 사이의 관계형 모델로 생성할 수 있습니다. 이렇게 복잡한 로직들을 관계형 모델을 통해 구현해나갈 수 있습니다.

## [개체 관계 모델](https://en.wikipedia.org/wiki/Entity–relationship_model)

<img src="https://user-images.githubusercontent.com/27461460/88914167-2de67d80-d29d-11ea-8230-6762a4cfe1b4.png" width="1000"/>

위 [엔티티 관계 모델](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) 설계도는 해커톡의 첫 `proposal`입니다.
* 위 [UML](https://creately.com/blog/diagrams/uml-diagram-types-examples)은 개발이 진행됨에 따라 계속 수정이 이루어지고 있기 때문에 최신 상태를 유지하지 않을 수 있습니다.

위 다이어그램에서 볼 수 있듯이 `Membership`에는 `userAlert`, `userMode` 그리고 `type`과 같은 필드들이 존재합니다. `type` 필드는 사용자가 `Channel`에서 어떤 권한을 가지고 있는지 구분해주고 있습니다. 이렇게 다양한 피쳐들을 하나의 모델에서 해결할 때 주로 [single table inheritance](https://en.wikipedia.org/wiki/Single_Table_Inheritance)라고 표현합니다. 해다 다이어그램은 앞으로 해커톡에 기여하고자 하는 분들을 위해 제공되었습니다. 다시 한번 지속적이 변경이 이루어질 수 있음을 상기시켜드립니다.

## 채널 생성

다음으로 고유의 사용자를 확인하고 `Channel`을 찾는 방법에 대해 알아봅니다.

In most [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)(Object Relational Mapping), developers use the [IN operator](https://stackoverflow.com/questions/42719750/sequelize-relation-with-where-in-array?rq=1).

Developers usually use this to find if subarray matches the query. This is also possible with [prisma filtering](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/filtering#filter-on-related-records) in a similar way. However, the `in` operator will return all the rows of the query when the subarray matches not just the unique subarray with only [ 'tom', 'jerry' ]. 

<img src="https://user-images.githubusercontent.com/27461460/90379570-da09d000-e0b5-11ea-8215-df2828108b58.png" width="200"/>

As in the image, when you query for users of `tom` and `jerry` using the IN operator, it will return all the other arrays in which the subarray [ 'tom' , 'jerry' ] exists. A similar discussion could be found on [Prisma1 forum](https://v1.prisma.io/forum/t/query-for-exact-match-of-array-of-ids/5700/17).

We resolved the above problem by checking the unique number of users  in addition to the userIDs of a `Channel`. If you have any other suggestions on better code other than the one below, please let shoot us a PR request! The code below is located in `Hackatalk/server/src/types/resolvers/Channel/mutation.ts`. (08/17/2020)

The code below is doing this:

`userIds` = All the userIds in the channel we are trying to find minus the auth user.

1. The `findChannelWithUserIds()` first stores all the `channels` that contain the `userIds`. 
2. The `totalUsers` stores the length of `userIds` we are trying to find. 
3. The `for loop` loops through the channels and find the channel that has the same number of users as `totalUsers`.
4. The matching channel is stored in `existingChannel` and returned.

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

This is how we manage the `unique` channel with unique array of userIds.

## Creating channel with a message

It is also possible to create channel with a message.
The code below is also located at `Hackatalk/server/src/types/resolvers/Channel/mutation.ts`. 

```ts
message && await createMessage(message, existingChannel.id);
```

We check if the message argument is not null then call `createMessage`.

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
* Currently, we are facing issues in redefining types if `Message` since we can't get it from anywhere (08/17/2020).


## Types of channels

There are two types of channels defined in `ChannelType` which are **private** and **public**.

The **public** channel can have a duplicate array of `users` and they can be created continuously while the **private** channel needs unique users.
* By passing array of `userIds` in `ChannelCreateInput`, users will grant the `Permission` to a newly created channel. If the channel is **public**, there will be a different `permissionType` for each user and only one of them will have the `owner` permission.


## Leaving the channel

This section explains the process for when the user leaves a channel. Currently, we have only described the changes scenario for the 'private' channel. The public channel will soon be updated as we make more progress!

For the private channel, the `isVisible` field exists in `Membership` model. When the user leaves the channel, the `isVisible` will be set to `false` and this will affect `myChannels` query results because the channel that the user wishes to leave will no longer be displayed on on their list of channels.

However, the `hidden` channel will be set to `visible` by default when a new **message** has been created. This is defined in `changeVisibilityWhenInvisible` function.

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

## Current status

#### 08/17/2020

In our mobile application, we only have a **private** channel senario and the **public** channel senario will be updated in future when things go well. The **public** channel will be any kind of group chats except the [direct messages in slack](https://slack.com/intl/en-kr/help/articles/212281468-What-is-a-direct-message).

