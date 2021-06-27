---
id: pagination
title: 페이지네이션
sidebar_label: 페이지네이션
---

[Pagination](https://graphql.org/learn/pagination)은 [graphql](https://graphql.org)을 사용할 때 도전적인 과제일 수 있습니다. 페이스북에서 제공한 [relay cursor pagination](https://relay.dev/graphql/connections.htm)을 활용하면 현재 많은 모바일 화면에서 제공되는 [무한 스크롤 리스트뷰](https://github.com/pronebird/UIScrollView-InfiniteScroll)를 구현하는데 매우 용이합니다.

<img src="https://user-images.githubusercontent.com/27461460/89128314-dad82900-d52f-11ea-86b4-0b54dbba2860.png" width="400"/>

하지만 `relay cursor pagination` 또한 위에서 보이는 `offset pagination`을 구현하는데 한계점들이 존재합니다. 하지만 현재(**2021년 6월 25일**)는 모바일에서 제공되는 무한 스크롤뷰를 구현하기 위해 `cursor pagination`이 가장 이상적인 방법입니다. 

### 서버

과거에는 `relay cursor pagination`을 [sequelize](https://sequelize.org)를 이용하여 구현하면 복잡한 상황을 초래했습니다. 관련하여 과거 경험을 [미디엄 포스트](https://medium.com/graphql-seoul/graphql-pagination-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-relays-cursor-based-connection-pattern-72ab0daceed4)에서 읽어볼 수 있습니다.

하지만, 우리는 이제 [prisma2](https://prisma.io)와 [nexus](https:/www.nexusjs.org)로 마이그레이션을 완료하였고 이제는 더욱 편리하게 `relay cursor paginiation`을 적용할 수 있습니다. 심지어 `nexus`는 [connection plugin](https://nexusjs.org/components-standalone/schema/plugins/connection#connection-plugin)을 제공하며 해커톡에서 이를 사용하고 있습니다.

### 클라이언트

클라이언트에서는 [relay](https://relay.dev)를 사용하여 서버의 `graphql api`를 소비하고 있습니다. [해당 글](https://www.howtographql.com/react-relay/8-pagination)에서는 [리액트](https://reactjs.org)에서 `relay cursor pagination`을 사용하는 방법에 대해 설명하고 있습니다.
