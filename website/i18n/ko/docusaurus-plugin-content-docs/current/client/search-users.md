---
id: search-users
title: 사용자 검색
sidebar_label: 사용자 검색
---

## Search user

<img src="https://miro.medium.com/max/287/1*EOsuX75bI_fGjp93Gbm_5Q.gif" width="200"/>

사용자는 무한 스크롤 뷰로 가져옵니다. 릴레이 스타일 `cursor pagination`은 무한 스크롤 리스트뷰를 적용하는데 최상의 경험을 제공해줍니다. 관련 내용은 [medium 포스트](https://medium.com/@dooboolab/relay-experimental-cursor-pagination-6a9e448d3146)에 작성되었습니다.

### Search Users

GraphQL`query`를 이용하여 사용자를 검색 할 때 `searchText` 매개변수를 보내면 단어와 연관이 있는 사용자 목록을 불러올 수 있습니다.