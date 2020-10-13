/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ChannelsVariables = {
    after?: string | null;
    before?: string | null;
    first?: number | null;
    last?: number | null;
    withMessage?: boolean | null;
};
export type ChannelsResponse = {
    readonly " $fragmentRefs": FragmentRefs<"ChannelComponent_channel">;
};
export type Channels = {
    readonly response: ChannelsResponse;
    readonly variables: ChannelsVariables;
};



/*
query Channels(
  $after: String
  $before: String
  $first: Int
  $last: Int
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
            "name": "withMessage"
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
    ], v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v3 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
    } as any);
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "Channels",
            "selections": [
                {
                    "args": (v1 /*: any*/),
                    "kind": "FragmentSpread",
                    "name": "ChannelComponent_channel"
                }
            ],
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "Channels",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
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
                                        (v2 /*: any*/),
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "channelType",
                                            "storageKey": null
                                        },
                                        (v3 /*: any*/),
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
                                                        (v3 /*: any*/),
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
                    "args": (v1 /*: any*/),
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
            "cacheID": "4e03539b8697b16e30bc17f229ba4aec",
            "id": null,
            "metadata": {},
            "name": "Channels",
            "operationKind": "query",
            "text": "query Channels(\n  $after: String\n  $before: String\n  $first: Int\n  $last: Int\n  $withMessage: Boolean\n) {\n  ...ChannelComponent_channel_2EXBWN\n}\n\nfragment ChannelComponent_channel_2EXBWN on Query {\n  channels(first: $first, last: $last, before: $before, after: $after, withMessage: $withMessage) {\n    edges {\n      cursor\n      node {\n        id\n        channelType\n        name\n        memberships(excludeMe: true) {\n          user {\n            name\n            nickname\n            thumbURL\n            photoURL\n          }\n        }\n        lastMessage {\n          id\n          messageType\n          text\n          imageUrls\n          fileUrls\n          createdAt\n        }\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '59aa0720fa9d4eb1cac2bd7a39f64ce9';
export default node;
