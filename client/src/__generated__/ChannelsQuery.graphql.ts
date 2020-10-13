/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ChannelsQueryVariables = {
    first?: number | null;
    last?: number | null;
    before?: string | null;
    after?: string | null;
    withMessage?: boolean | null;
};
export type ChannelsQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"ChannelComponent_channel">;
};
export type ChannelsQuery = {
    readonly response: ChannelsQueryResponse;
    readonly variables: ChannelsQueryVariables;
};



/*
query ChannelsQuery(
  $first: Int
  $last: Int
  $before: String
  $after: String
  $withMessage: Boolean
) {
  ...ChannelComponent_channel_2EXBWN
}

fragment ChannelComponent_channel_2EXBWN on Query {
  channels(first: $first, last: $last, before: $before, after: $after, withMessage: $withMessage) {
    edges {
      cursor
      node {
        id
        channelType
        name
        memberships(excludeMe: true) {
          user {
            name
            nickname
            thumbURL
            photoURL
          }
        }
        lastMessage {
          id
          messageType
          text
          imageUrls
          fileUrls
          createdAt
        }
        __typename
      }
    }
    pageInfo {
      hasNextPage
      endCursor
      hasPreviousPage
      startCursor
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
        "name": "first"
    } as any), v3 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "last"
    } as any), v4 = ({
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "withMessage"
    } as any), v5 = [
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
            "name": "withMessage",
            "variableName": "withMessage"
        } as any)
    ], v6 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v7 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
    } as any);
    return {
        "fragment": {
            "argumentDefinitions": [
                (v0 /*: any*/),
                (v1 /*: any*/),
                (v2 /*: any*/),
                (v3 /*: any*/),
                (v4 /*: any*/)
            ],
            "kind": "Fragment",
            "metadata": null,
            "name": "ChannelsQuery",
            "selections": [
                {
                    "args": (v5 /*: any*/),
                    "kind": "FragmentSpread",
                    "name": "ChannelComponent_channel"
                }
            ],
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [
                (v2 /*: any*/),
                (v3 /*: any*/),
                (v1 /*: any*/),
                (v0 /*: any*/),
                (v4 /*: any*/)
            ],
            "kind": "Operation",
            "name": "ChannelsQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v5 /*: any*/),
                    "concreteType": "ChannelConnection",
                    "kind": "LinkedField",
                    "name": "channels",
                    "plural": false,
                    "selections": [
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "ChannelEdge",
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
                                    "concreteType": "Channel",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                        (v6 /*: any*/),
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "channelType",
                                            "storageKey": null
                                        },
                                        (v7 /*: any*/),
                                        {
                                            "alias": null,
                                            "args": [
                                                {
                                                    "kind": "Literal",
                                                    "name": "excludeMe",
                                                    "value": true
                                                }
                                            ],
                                            "concreteType": "Membership",
                                            "kind": "LinkedField",
                                            "name": "memberships",
                                            "plural": true,
                                            "selections": [
                                                {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "User",
                                                    "kind": "LinkedField",
                                                    "name": "user",
                                                    "plural": false,
                                                    "selections": [
                                                        (v7 /*: any*/),
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
                                                }
                                            ],
                                            "storageKey": "memberships(excludeMe:true)"
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Message",
                                            "kind": "LinkedField",
                                            "name": "lastMessage",
                                            "plural": false,
                                            "selections": [
                                                (v6 /*: any*/),
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
                                                    "kind": "ScalarField",
                                                    "name": "createdAt",
                                                    "storageKey": null
                                                }
                                            ],
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
                                }
                            ],
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": (v5 /*: any*/),
                    "filters": [
                        "withMessage"
                    ],
                    "handle": "connection",
                    "key": "ChannelComponent_channels",
                    "kind": "LinkedHandle",
                    "name": "channels"
                }
            ]
        },
        "params": {
            "cacheID": "99e376b085668ca84e825b599c0e2472",
            "id": null,
            "metadata": {},
            "name": "ChannelsQuery",
            "operationKind": "query",
            "text": "query ChannelsQuery(\n  $first: Int\n  $last: Int\n  $before: String\n  $after: String\n  $withMessage: Boolean\n) {\n  ...ChannelComponent_channel_2EXBWN\n}\n\nfragment ChannelComponent_channel_2EXBWN on Query {\n  channels(first: $first, last: $last, before: $before, after: $after, withMessage: $withMessage) {\n    edges {\n      cursor\n      node {\n        id\n        channelType\n        name\n        memberships(excludeMe: true) {\n          user {\n            name\n            nickname\n            thumbURL\n            photoURL\n          }\n        }\n        lastMessage {\n          id\n          messageType\n          text\n          imageUrls\n          fileUrls\n          createdAt\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '111bbf3383323feed25379687c5f552a';
export default node;
