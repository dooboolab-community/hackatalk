/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MainStackNavigatorChannelQueryVariables = {
    channelId: string;
};
export type MainStackNavigatorChannelQueryResponse = {
    readonly channel: {
        readonly id: string;
        readonly channelType: unknown;
        readonly name: string | null;
        readonly memberships: ReadonlyArray<{
            readonly user: {
                readonly name: string | null;
                readonly nickname: string | null;
                readonly thumbURL: string | null;
                readonly photoURL: string | null;
            } | null;
        }> | null;
    };
};
export type MainStackNavigatorChannelQuery = {
    readonly response: MainStackNavigatorChannelQueryResponse;
    readonly variables: MainStackNavigatorChannelQueryVariables;
};



/*
query MainStackNavigatorChannelQuery(
  $channelId: String!
) {
  channel(channelId: $channelId) {
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
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "channelId"
        } as any)
    ], v1 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
    } as any), v2 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "channelId",
                    "variableName": "channelId"
                }
            ],
            "concreteType": "Channel",
            "kind": "LinkedField",
            "name": "channel",
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
                    "name": "channelType",
                    "storageKey": null
                },
                (v1 /*: any*/),
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
                                (v1 /*: any*/),
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
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "MainStackNavigatorChannelQuery",
            "selections": (v2 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "MainStackNavigatorChannelQuery",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "cacheID": "336487d4868c72feeb5ab0dc387701ac",
            "id": null,
            "metadata": {},
            "name": "MainStackNavigatorChannelQuery",
            "operationKind": "query",
            "text": "query MainStackNavigatorChannelQuery(\n  $channelId: String!\n) {\n  channel(channelId: $channelId) {\n    id\n    channelType\n    name\n    memberships(excludeMe: true) {\n      user {\n        name\n        nickname\n        thumbURL\n        photoURL\n      }\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'bb39e3cc53a51ddbf8d4a649b41c9805';
export default node;
