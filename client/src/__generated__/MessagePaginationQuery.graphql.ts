/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessagePaginationQueryVariables = {
    after?: string | null;
    before?: string | null;
    channelId: string;
    first?: number | null;
    last?: number | null;
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
  $before: String
  $channelId: String!
  $first: Int
  $last: Int
  $searchText: String
) {
  ...MessageComponent_message_3bSSw6
}

fragment MessageComponent_message_3bSSw6 on Query {
  messages(first: $first, last: $last, before: $before, after: $after, channelId: $channelId, searchText: $searchText) {
    edges {
      cursor
      node {
        id
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
      hasPreviousPage
      startCursor
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
            "name": "before"
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
            "name": "last"
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
            "name": "before",
            "variableName": "before"
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
            "name": "last",
            "variableName": "last"
        } as any),
        ({
            "kind": "Variable",
            "name": "searchText",
            "variableName": "searchText"
        } as any)
    ], v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any);
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "MessagePaginationQuery",
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
            "name": "MessagePaginationQuery",
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
                                        (v2 /*: any*/),
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
                                                (v2 /*: any*/),
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
            "cacheID": "f9b1b0d5b7db7d62a4646af4c01b4fd0",
            "id": null,
            "metadata": {},
            "name": "MessagePaginationQuery",
            "operationKind": "query",
            "text": "query MessagePaginationQuery(\n  $after: String\n  $before: String\n  $channelId: String!\n  $first: Int\n  $last: Int\n  $searchText: String\n) {\n  ...MessageComponent_message_3bSSw6\n}\n\nfragment MessageComponent_message_3bSSw6 on Query {\n  messages(first: $first, last: $last, before: $before, after: $after, channelId: $channelId, searchText: $searchText) {\n    edges {\n      cursor\n      node {\n        id\n        messageType\n        text\n        imageUrls\n        fileUrls\n        sender {\n          id\n          name\n          nickname\n          thumbURL\n          photoURL\n        }\n        createdAt\n        updatedAt\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'e1b999570136b75c08a1521d99641a4e';
export default node;
