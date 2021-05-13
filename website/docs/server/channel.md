---
id: channel
title: Channel
sidebar_label: Channel
---

This page explains how the `Channels` in `Hackatalk` are structured and was created with the purpose of helping our contributors understand Hackatalk's data structure.

The `Channel`(aka `Chatroom`) relational model is an important concept when it comes to building chatting apps. A `Channel` aggregates users and prepares an environment for chatting.  Many relational models can exist in-between `User` and `Channel`. These in-between relationships make it easier for developers to add complex business logic in their chat applications. Among these many realtionships, we will first look at the `Membership` relationship.

When a user grants permission to other users to access a `Channel`, a `Membership`relationship is created between the `Users`, `Membership`, and `Channel`. The `memberships` table has a `userId` and a `channelId` that links `Users` to their `Channel`.

 Another scenario is when the user wants to manage the sound(vibrate, silent, etc) of each channel, we can create `Sound` relation. Like this, we can add more relations in between to handle more complex logic.

## Entity Relationship Model Diagram

<img src="https://user-images.githubusercontent.com/27461460/88914167-2de67d80-d29d-11ea-8230-6762a4cfe1b4.png" width="1000"/>

The decision was made in our first proposal in designing [Entity Relation Model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model).
* Note that the above [UML](https://creately.com/blog/diagrams/uml-diagram-types-examples) diagram is not recent and this is keep 
changing as we continue implementing cool features.

As you can see in the diagram above, there are `userAlert`, `userMode` as well as `type` of membership which determines what type of membership permissions a user has in the `Channel` (view only, leader ...etc). We usually call this a [single table inheritance](https://en.wikipedia.org/wiki/Single_Table_Inheritance) where a single table can have multiple models. We are presenting this diagram to clarify the relationship model for the creation of channels for our contributors. Note that the features that each table has will continue to change.

## Creating a Channel

Below is a description of how to find a channel using the `unique` number of users in each channel. 

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

