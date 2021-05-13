---
id: pagination
title: Pagination
sidebar_label: Pagination
---

One of the challenges when using graphql is [pagination](https://graphql.org/learn/pagination). Facebook's [relay cursor pagination](https://relay.dev/graphql/connections.htm) seems currently the best solution on implementing [infinite scroll view](https://github.com/pronebird/UIScrollView-InfiniteScroll) which we normally see in many mobile apps.

<img src="https://user-images.githubusercontent.com/27461460/89128314-dad82900-d52f-11ea-86b4-0b54dbba2860.png" width="400"/>

Although it has some limitations when we face offset pagination scenario as above, `relay cursor pagination` is currently the most ideal way to support mobile's infinite scrollview.

### Server

Previously, implementing `relay-cursor-pagination` with orm like [sequelize](https://sequelize.org) was a bit complicated. Here's how we've it done in [medium post](https://medium.com/graphql-seoul/graphql-pagination-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-relays-cursor-based-connection-pattern-72ab0daceed4) previously.

However, we've migrated to [primsa2](prisma.io) and [nexus](https://www.nexusjs.org) so this becomes much easier. `Nexus` even supports [connection plugin](https://nexusjs.org/components-standalone/schema/plugins/connection#connection-plugin) and we'll be using it in our server.

### Client

In client, we use [relay](https://relay.dev). There is a great explanation on using [relay pagination](https://www.howtographql.com/react-relay/8-pagination) in [react](https://reactjs.org).
