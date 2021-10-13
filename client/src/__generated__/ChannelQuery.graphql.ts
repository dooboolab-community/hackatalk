/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ChannelQueryVariables = {
    channelId: string;
};
export type ChannelQueryResponse = {
    readonly channel: {
        readonly id: string;
        readonly name: string | null;
        readonly memberships: ReadonlyArray<{
            readonly user: {
                readonly id: string;
                readonly nickname: string | null;
                readonly name: string | null;
                readonly photoURL: string | null;
            } | null;
        }> | null;
    } | null;
};
export type ChannelQuery = {
    readonly response: ChannelQueryResponse;
    readonly variables: ChannelQueryVariables;
};



/*
query ChannelQuery(
  $channelId: String!
) {
  channel(channelId: $channelId) {
    id
    name
    memberships {
      user {
        id
        nickname
        name
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "channelId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
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
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
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
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nickname",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChannelQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChannelQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "1908baffd9bf59db21f394978934a310",
    "id": null,
    "metadata": {},
    "name": "ChannelQuery",
    "operationKind": "query",
    "text": "query ChannelQuery(\n  $channelId: String!\n) {\n  channel(channelId: $channelId) {\n    id\n    name\n    memberships {\n      user {\n        id\n        nickname\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '76c70e6035133a8393ff14106b0ada3f';
export default node;
