/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type MessagePaginationQueryVariables = {
    after?: string | null;
    channelId: string;
    first: number;
    searchText?: string | null;
};
export type MessagePaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"MessageComponent_message">;
};
export type MessagePaginationQuery = {
    readonly response: MessagePaginationQueryResponse;
    readonly variables: MessagePaginationQueryVariables;
};



/*
query MessagePaginationQuery(
  $after: String
  $channelId: String!
  $first: Int!
  $searchText: String
) {
  ...MessageComponent_message_WlZsr
}

fragment MessageComponent_message_WlZsr on Query {
  messages(first: $first, after: $after, channelId: $channelId, searchText: $searchText) {
    edges {
      cursor
      node {
        id
        imageUrls
        text
        sender {
          id
          name
          nickname
        }
        createdAt
        ...MessageListItem_message
        __typename
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}

fragment MessageListItem_message on Message {
  id
  messageType
  text
  imageUrls
  fileUrls
  createdAt
  updatedAt
  sender {
    id
    name
    nickname
    thumbURL
    photoURL
    ...ProfileModal_user
  }
}

fragment ProfileModal_user on User {
  id
  photoURL
  name
  nickname
  hasBlocked
  statusMessage
  isFriend
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "channelId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchText"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "channelId",
    "variableName": "channelId"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "searchText",
    "variableName": "searchText"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MessagePaginationQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "MessageComponent_message"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessagePaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessageConnection",
        "kind": "LinkedField",
        "name": "messages",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MessageEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "imageUrls",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "text",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "sender",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "nickname",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "thumbURL",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "photoURL",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasBlocked",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "statusMessage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFriend",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "messageType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "fileUrls",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "updatedAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "channelId",
          "searchText"
        ],
        "handle": "connection",
        "key": "MessageComponent_messages",
        "kind": "LinkedHandle",
        "name": "messages"
      }
    ]
  },
  "params": {
    "cacheID": "c6f729384e859e115b8a5a80c76c7d1c",
    "id": null,
    "metadata": {},
    "name": "MessagePaginationQuery",
    "operationKind": "query",
    "text": "query MessagePaginationQuery(\n  $after: String\n  $channelId: String!\n  $first: Int!\n  $searchText: String\n) {\n  ...MessageComponent_message_WlZsr\n}\n\nfragment MessageComponent_message_WlZsr on Query {\n  messages(first: $first, after: $after, channelId: $channelId, searchText: $searchText) {\n    edges {\n      cursor\n      node {\n        id\n        imageUrls\n        text\n        sender {\n          id\n          name\n          nickname\n        }\n        createdAt\n        ...MessageListItem_message\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n\nfragment MessageListItem_message on Message {\n  id\n  messageType\n  text\n  imageUrls\n  fileUrls\n  createdAt\n  updatedAt\n  sender {\n    id\n    name\n    nickname\n    thumbURL\n    photoURL\n    ...ProfileModal_user\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n"
  }
};
})();
(node as any).hash = '8b046f4256a182e785d6b79388dc36f5';
export default node;
