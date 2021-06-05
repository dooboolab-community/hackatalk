/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessagesQueryVariables = {
    first: number;
    after?: string | null;
    channelId: string;
    searchText?: string | null;
};
export type MessagesQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"MessageComponent_message">;
};
export type MessagesQuery = {
    readonly response: MessagesQueryResponse;
    readonly variables: MessagesQueryVariables;
};



/*
query MessagesQuery(
  $first: Int!
  $after: String
  $channelId: String!
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "channelId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "searchText"
},
v4 = [
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessagesQuery",
    "selections": [
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MessageComponent_message"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "MessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
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
                  (v5/*: any*/),
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
                      (v5/*: any*/),
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
        "args": (v4/*: any*/),
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
    "cacheID": "c9cf2878efe3c492733b3a7dfff4e230",
    "id": null,
    "metadata": {},
    "name": "MessagesQuery",
    "operationKind": "query",
    "text": "query MessagesQuery(\n  $first: Int!\n  $after: String\n  $channelId: String!\n  $searchText: String\n) {\n  ...MessageComponent_message_WlZsr\n}\n\nfragment MessageComponent_message_WlZsr on Query {\n  messages(first: $first, after: $after, channelId: $channelId, searchText: $searchText) {\n    edges {\n      cursor\n      node {\n        id\n        imageUrls\n        text\n        sender {\n          id\n          name\n          nickname\n        }\n        createdAt\n        ...MessageListItem_message\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n\nfragment MessageListItem_message on Message {\n  id\n  messageType\n  text\n  imageUrls\n  fileUrls\n  createdAt\n  updatedAt\n  sender {\n    id\n    name\n    nickname\n    thumbURL\n    ...ProfileModal_user\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n"
  }
};
})();
(node as any).hash = '06622ff6f54faabf675e48932f249991';
export default node;
