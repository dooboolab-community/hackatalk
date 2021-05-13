---
id: start-direct-messaging
title: Start direct messaging
sidebar_label: Start direct messaging
---

<img width="220" alt="start-chatting" src="https://user-images.githubusercontent.com/27461460/92318266-8f400000-f044-11ea-873f-96145e5645e4.png"/>

If we want to chat with the user from the pop-up modal shown above,  you might find trouble when thinking of the message screen shown below. This is because you will come up with the scenario of revealing the `Message` screen in two different cases.

<img width="220" alt="message" src="https://user-images.githubusercontent.com/27461460/92318281-cadaca00-f044-11ea-9acf-bae1ddd448f6.png"/>

## Message screen

When a user enters a message screen, the user can have his or her own `channelId` which has already been created. This point is which I've called two different cases. If the user wants to chat directly from the user modal, the user may not know the `channelId` dedicated to them. Then we might have to think of code to differentiate them.

In `MainStackNavigator.tsx`,

```tsx
interface MessageItemChannel {
  channelId: string;
}

interface MessageItemUser {
  user: User;
}

export type MainStackParamList = {
  default: undefined;
  MainTab: undefined;
  Message: MessageItemChannel | MessageItemUser;
  ProfileUpdate: undefined;
  SearchUser: undefined;
  Settings: undefined;
  ChangePw: undefined;
  ChannelCreate: undefined;
  PinchZoomViewPager: undefined;
};
```

and in `Message.tsx`.
```tsx
const MessageScreen: FC<Props> = (props) => {
  const { route: { params } } = props;

  let channelId: string;
  let user: User;

  if ('channelId' in params) {
    channelId = params.channelId;
  } else {
    user = params.user;
  }
...
```

In `MainStackNavigator.tsx`, we are sending `Message` screen a params which can be `MessageItemChannel` or `MessageItemUser`. Therefore in `Message.tsx`, we applied type-guard to handle different cases. We wanted to make this simple so we came up with providing an ad-hoc resolver called `findOrCreatePrivateChannel` in our backend. This will return the `Channel` data and fulfill your data to be loaded in the `Message` screen. Therefore, `findOrCreatePrivateChannel` should be called every time before entering the `Message` screen.
> This could be partially handled in client-side to prevent re-fetching.