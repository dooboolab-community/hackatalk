---
id: message
title: Message
sidebar_label: Message
---

Creating a message is pretty straightforward as long as you know the `id` of the channel you wish to send the message to.

## Type of message

> Types of message are defined in `MessageType`.

1. text
   * Text message
2. photo
   * Photo type will display images in the client
3. file
   * File type will be displayed and be presented as a downloadable link in the client

The `photo` and the `file` will be provided by the array of string which contains urls. The urls will be provided by `singleUpload` mutation query defined in our [HackaTalk's graphql server](http://hackatalk.azurewebsites.net/graphql).

## Encryption

The encryption is being done in the **text** message only. This should be **encrypted** and **decrpyted** when communicating with the [database](https://en.wikipedia.org/wiki/Database). We are using [aes-192-cbc](https://encode-decode.com/aes-192-cbc-encrypt-online) algorithm with [crypto](https://nodejs.org/api/crypto.html) package in [nodejs](https://nodejs.org).
* You can read more about it in [nodejs crypto](https://nodejs.org/api/crypto.html).


## Push Notification

There are push token id in each device and browser. They are used to receive **push notification** in their devices. Push token in the device is sent to the server when user sign-in. `createNotification` mutation will be called on the client-side. The `id` of the user and the device's `push token` will be mapped in the database and they will be used to send messages via **push notification**. This will be removed with the `deleteNotification` mutation query when the user signs out.
