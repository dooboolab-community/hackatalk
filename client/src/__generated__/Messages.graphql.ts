/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessagesVariables = {
    after?: string | null;
    channelId: string;
    first: number;
    searchText?: string | null;
};
export type MessagesResponse = {
    readonly " $fragmentRefs": FragmentRefs<"MessageComponent_message">;
};
export type Messages = {
    readonly response: MessagesResponse;
    readonly variables: MessagesVariables;
};



/*
query Messages(
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
        messageType
        text
        imageUrls
        fileUrls
        sender {
          id
          name
          nickname
          thumbURL
          photoURL
        }
        createdAt
        updatedAt
        __typename
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "after"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "channelId"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "first"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "searchText"
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "after",
            "variableName": "after"
        } as any),
        ({
            "kind": "Variable",
            "name": "channelId",
            "variableName": "channelId"
        } as any),
        ({
            "kind": "Variable",
            "name": "first",
            "variableName": "first"
        } as any),
        ({
            "kind": "Variable",
            "name": "searchText",
            "variableName": "searchText"
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "Messages",
            "selections": [
                {
                    "args": (v1 /*: any*/),
                    "kind": "FragmentSpread",
                    "name": "MessageComponent_message"
                }
            ],
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "Messages",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
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
                                            "name": "text",
                                            "storageKey": null
                                        },
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
                                            "name": "fileUrls",
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
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "id",
                                                    "storageKey": null
                                                },
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
                    "args": (v1 /*: any*/),
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
            "cacheID": "9863c762e8113024cc0a8956791ebf3b",
            "id": null,
            "metadata": {},
            "name": "Messages",
            "operationKind": "query",
            "text": "query Messages(\n  $after: String\n  $channelId: String!\n  $first: Int!\n  $searchText: String\n) {\n  ...MessageComponent_message_WlZsr\n}\n\nfragment MessageComponent_message_WlZsr on Query {\n  messages(first: $first, after: $after, channelId: $channelId, searchText: $searchText) {\n    edges {\n      cursor\n      node {\n        messageType\n        text\n        imageUrls\n        fileUrls\n        sender {\n          id\n          name\n          nickname\n          thumbURL\n          photoURL\n        }\n        createdAt\n        updatedAt\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '88a86178fb5462d83f0c764acb58caa2';
export default node;
