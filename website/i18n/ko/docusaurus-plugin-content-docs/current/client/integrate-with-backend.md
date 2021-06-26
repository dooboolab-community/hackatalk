---
id: integrate-with-backend
title: Backend 연동
sidebar_label: Backend 연동
---

## Graphql Client

해커톡에서는 [relay](https://relay.dev)를 graphql 클라이언트로 사용하고 있습니다. 프로젝트에서 주로 [react-hook](https://reactjs.org/docs/hooks-intro.html)을 사용하려고 하므로 [relay experimental](https://relay.dev/docs/en/experimental/a-guided-tour-of-relay)을 주로 사용하였습니다. 

Relay 버전 11이상부터는 `hook`이 포함되므로 더이상 `relay experimental`을 사용하지 않아도 됩니다.

> **주의**
  * [relay-hooks](https://github.com/relay-tools/relay-hooks)는 다른 라이브러리이니 혼동하지 마세요.