/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MainStackNavigatorFindOrCreatePrivateChannelMutationVariables = {
    peerUserId: string;
};
export type MainStackNavigatorFindOrCreatePrivateChannelMutationResponse = {
    readonly findOrCreatePrivateChannel: {
        readonly id: string;
        readonly name: string | null;
    };
};
export type MainStackNavigatorFindOrCreatePrivateChannelMutation = {
    readonly response: MainStackNavigatorFindOrCreatePrivateChannelMutationResponse;
    readonly variables: MainStackNavigatorFindOrCreatePrivateChannelMutationVariables;
};



/*
mutation MainStackNavigatorFindOrCreatePrivateChannelMutation(
  $peerUserId: String!
) {
  findOrCreatePrivateChannel(peerUserId: $peerUserId) {
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
            "name": "peerUserId"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "peerUserId",
                    "variableName": "peerUserId"
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
            "name": "MainStackNavigatorFindOrCreatePrivateChannelMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "MainStackNavigatorFindOrCreatePrivateChannelMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "ecff917854f09eed34602ddf2f794f8b",
            "id": null,
            "metadata": {},
            "name": "MainStackNavigatorFindOrCreatePrivateChannelMutation",
            "operationKind": "mutation",
            "text": "mutation MainStackNavigatorFindOrCreatePrivateChannelMutation(\n  $peerUserId: String!\n) {\n  findOrCreatePrivateChannel(peerUserId: $peerUserId) {\n    id\n    name\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '606f28da88de79b9fc7bd61e0a1f26dc';
export default node;
