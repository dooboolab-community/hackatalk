---
id: direct-messaging
title: 다이렉트 메시징
sidebar_label: 다이렉트 메시징
---

<img width="220" alt="start-chatting" src="https://user-images.githubusercontent.com/27461460/92318266-8f400000-f044-11ea-873f-96145e5645e4.png"/>

위의 팝업 모달에서 사용자와 채팅을 하고 싶다면 아래의 메시지 화면을 생각할 수 있습니다. `채팅하기` 버튼을 누른 후 메시지 화면을 진입할 때 두 가지 다른 시나리오를 맞이하게 됩니다.

<img width="220" alt="message" src="https://user-images.githubusercontent.com/27461460/92318281-cadaca00-f044-11ea-9acf-bae1ddd448f6.png"/>

## Message screen

사용자가 `Message` 화면에 들어가면 이미 생성된 `channelId`를 가지고 있을 수도 있고 또는 새로 생성된 `channelId`를 받아와야할 수도 있습니다. 사용자가 `modal`에서 직접 채팅을 시도하는 경우 `channelId`를 앱에서 모르고 있는 경우 어떻게 코드를 구분하는지 알아보겠습니다. 

아래는 `MainStackNavigator.tsx` 소스코드의 일부이고,

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

`Message.tsx` 소스코드의 일부입니다.
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

`MainStackNavigator.tsx`에서 `Message`화면에 `MessageItemChannel` 또는 `MessageItemUser`가 될 수 있는 매개변수를 보냅니다. 따라서 `Message.tsx`에서는 이러한 경우를 처리하기 위해 `type-guard`가 작성되었습니다. 해당 부분을 간단하게 구현하기 위해 백엔드에서는 `findOrCreatePrivateChannel`라는 임시 `resolver`를 구현했습니다. 그러면 `Channel`데이터가 반환되고 `Mesage`화면에 로드 될 데이터를 충족시킬 수 있습니다. 따라서 `Message`화면에 진입하기 전에 매번 `findOrCreatePrivateChannel`을 호출해야 합니다.
> 해당 부분에서 `refetch`를 방지하기 위해 클라이언트 측에서 보완 코드를 짤 수 있을 것입니다.
