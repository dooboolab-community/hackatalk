---
id: features
title: Features
sidebar_label: Features
---

Features mainly describes what services we provide to `HackaTalk` users. We generally provide **one-to-one** as well as **group** chats. We would like to provide and try out things that can be done with a modern chat app.

## Creating Channel

<img src="https://user-images.githubusercontent.com/27461460/89128311-d875cf00-d52f-11ea-9107-2ee2e6fe2e58.png" width="200"/>

Creating a `channel` is creating a `chatroom`. If the user creates the channel manually selecting other users they wish to chat with, this will be a **private** channel as well as `1-1 chat`. We have another channel type **public** and this is used for public messaging. To create a **public** channel, users will type in the `name` of channel and get an unique id for that **channel**. Then the user can invite other users to the **public** channel with that unique id. Below are 3 general senarios listed. 
<br/>

```graphql
createChannel(channel: ChannelCreateInput): Channel
```

1. 1-1 private chat
   * Users select one user when creating `Channel`.
2. M-M private chat
   * Users create a channel with multiple users.
     > Note that the private channel will not be created again if the same list of users already exists in the `Channel`.
3. M-M public chat
   * Users create a channel with only the name of channel and recieve a unique id.
     > Note that this can be duplicated (name, list of users ...).

<br/>
A `Membership` is a [single table inheritance](https://en.wikipedia.org/wiki/Single_Table_Inheritance) where `Users` manage the alert mode and `Owner` of the chatroom manages user’s role.
The `User` that creates a `Channel` is the `Owner`. The `owner` manages the `role` of each user in the `Channel` as well as the `alertMode`. The `alertMode` allows you to `mute` specific channel or change the sound mode to `vibrate`. Individual users can also manage the ownership. Their relationship as in [RDBMS](https://techterms.com/definition/rdbms) looks like below.

<img src="https://user-images.githubusercontent.com/27461460/89128370-3b676600-d530-11ea-9c10-e2d133fed021.png" width="400"/>
<br/>

### Updating or deleting Channel

Only the `Role` with the `owner` can update the channels. We follow the [soft delete](https://guides.cfwheels.org/docs/soft-delete) senario for main models which are `User` and `Channel`. Other sub models that can be refered as `cascade` will not follow the `soft deletion`.<br/>

## Adding friends to your chat app

`HacakTalk` allows users to search all users who've signed up.

<img src="https://user-images.githubusercontent.com/27461460/89128315-dad82900-d52f-11ea-9e1b-5a5fd4f29010.png" width="200"/>

From above screen which is `SearchUser`, you can add user to the friend list or chat directly.

## Start messaging

<img src="https://user-images.githubusercontent.com/27461460/89128308-d6ac0b80-d52f-11ea-9368-ebe6e7cb9d15.png" width="200"/>

When a user tries to chat with a new user but the `Channel` doesn't exist, it will automatically create one internally. This flow follows the [Creating channel](#creating-channel) flow described above.

Currently we provide 3 types of messages.
1. Text
2. Photo
3. File
