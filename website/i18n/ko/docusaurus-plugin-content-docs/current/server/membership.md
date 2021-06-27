---
id: membership
title: 멤버십
sidebar_label: 멤버십
---

[채널](docs/server/channel)에서 설명했듯이 `Membership` 모델은 [single table inheritance](https://medium.com/@User3141592/when-to-use-single-table-inheritance-vs-multiple-table-inheritance-db7e9733ae2e)입니다.

채널의 한 사용자만 다른 사용자에게 채널에 대한 권한을 부여할 수 있습니다. 이 구성원을 소유자(owner)라고합니다.

## 멤버십 종류

> 멤버십 유형은 `MembershipType`에 정의되어 있습니다. `MembershipType`은 채널이 **public** 인 경우에만 고려됩니다. 채널이 **private** 인 경우 모든 사용자는 동일한 `membershipType`을 갖게됩니다.

1. owner
   * 채널의 소유자는 **channel**에서 `admin` 사용자를 추가하거나 삭제할 수 있습니다.
   * 소유자 **public** 채널에서 나가기를 희망한다면 소유권을 먼저 다른 사용자에게 이전해야합니다.
   * **public** 채널의 소유자는 **channel** 정보를 변경할 수 있습니다.
2. admin
   * `admin` 사용자는 더 많은 사용자를 채널에 추가 할 수 있습니다.
3. member
   * **public** 채널에서 회원이 할 수 있는 유일한 작업은 메시지를 보내거나 채널에서 나가는 것입니다.

