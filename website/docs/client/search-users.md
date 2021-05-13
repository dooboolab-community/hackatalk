---
id: search-users
title: Search Users
sidebar_label: Searching users
---

## SearchUser screen

<img src="https://miro.medium.com/max/287/1*EOsuX75bI_fGjp93Gbm_5Q.gif" width="200"/>

Users will be fetched in infinite scrollview. Relay style cursor pagination is applied in this implementation as written in [medium blog](https://medium.com/@dooboolab/relay-experimental-cursor-pagination-6a9e448d3146).

### Searching Users

When searching users, you can just send `searchText` argument to grapqhl `query` and it will likey return the list of users who might be related.
