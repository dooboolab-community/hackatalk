/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessagesQueryVariables = {
    first?: number | null;
    last?: number | null;
    before?: string | null;
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
  $first: Int
  $last: Int
  $before: String
  $after: String
  $channelId: String!
  $searchText: String
) {
  ...MessageComponent_message_3bSSw6
}

fragment MessageComponent_message_3bSSw6 on Query {
  messages(first: $first, last: $last, before: $before, after: $after, channelId: $channelId, searchText: $searchText) {
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
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "after"
    } as any), v1 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "before"
    } as any), v2 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "channelId"
    } as any), v3 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "first"
    } as any), v4 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "last"
    } as any), v5 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "searchText"
    } as any), v6 = [
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
    ];
    return {
        "fragment": {
            "argumentDefinitions": [
                (v0 /*: any*/),
                (v1 /*: any*/),
                (v2 /*: any*/),
                (v3 /*: any*/),
                (v4 /*: any*/),
                (v5 /*: any*/)
            ],
            "kind": "Fragment",
            "metadata": null,
            "name": "MessagesQuery",
            "selections": [
                {
                    "args": (v6 /*: any*/),
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
                (v3 /*: any*/),
                (v4 /*: any*/),
                (v1 /*: any*/),
                (v0 /*: any*/),
                (v2 /*: any*/),
                (v5 /*: any*/)
            ],
            "kind": "Operation",
            "name": "MessagesQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v6 /*: any*/),
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
                    "args": (v6 /*: any*/),
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
            "cacheID": "6157ecfee8c41577609c354d527874d5",
            "id": null,
            "metadata": {},
            "name": "MessagesQuery",
            "operationKind": "query",
            "text": "query MessagesQuery(\n  $first: Int\n  $last: Int\n  $before: String\n  $after: String\n  $channelId: String!\n  $searchText: String\n) {\n  ...MessageComponent_message_3bSSw6\n}\n\nfragment MessageComponent_message_3bSSw6 on Query {\n  messages(first: $first, last: $last, before: $before, after: $after, channelId: $channelId, searchText: $searchText) {\n    edges {\n      cursor\n      node {\n        messageType\n        text\n        imageUrls\n        fileUrls\n        sender {\n          id\n          name\n          nickname\n          thumbURL\n          photoURL\n        }\n        createdAt\n        updatedAt\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '78830a8688896a154b8c387223595791';
export default node;
