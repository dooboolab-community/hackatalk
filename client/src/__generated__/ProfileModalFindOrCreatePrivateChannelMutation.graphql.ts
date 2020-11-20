/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileModalFindOrCreatePrivateChannelMutationVariables = {
    peerUserIds: Array<string>;
};
export type ProfileModalFindOrCreatePrivateChannelMutationResponse = {
    readonly findOrCreatePrivateChannel: {
        readonly id: string;
        readonly name: string | null;
    };
};
export type ProfileModalFindOrCreatePrivateChannelMutation = {
    readonly response: ProfileModalFindOrCreatePrivateChannelMutationResponse;
    readonly variables: ProfileModalFindOrCreatePrivateChannelMutationVariables;
};



/*
mutation ProfileModalFindOrCreatePrivateChannelMutation(
  $peerUserIds: [String!]!
) {
  findOrCreatePrivateChannel(peerUserIds: $peerUserIds) {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "peerUserIds"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "peerUserIds",
                    "variableName": "peerUserIds"
                }
            ],
            "concreteType": "Channel",
            "kind": "LinkedField",
            "name": "findOrCreatePrivateChannel",
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
            "name": "ProfileModalFindOrCreatePrivateChannelMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ProfileModalFindOrCreatePrivateChannelMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "9f9903a1e41446a3b7cef6fde3753500",
            "id": null,
            "metadata": {},
            "name": "ProfileModalFindOrCreatePrivateChannelMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileModalFindOrCreatePrivateChannelMutation(\n  $peerUserIds: [String!]!\n) {\n  findOrCreatePrivateChannel(peerUserIds: $peerUserIds) {\n    id\n    name\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '7e15a801d4f366330e041d1522ccdbfe';
export default node;
