/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileModalFindOrCreatePrivateChannelMutationVariables = {
    peerUserId: string;
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
            "cacheID": "bb3817a5b3188142225aeec376b02285",
            "id": null,
            "metadata": {},
            "name": "ProfileModalFindOrCreatePrivateChannelMutation",
            "operationKind": "mutation",
            "text": "mutation ProfileModalFindOrCreatePrivateChannelMutation(\n  $peerUserId: String!\n) {\n  findOrCreatePrivateChannel(peerUserId: $peerUserId) {\n    id\n    name\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '8f6f8c601dd5d032985f8f5107351824';
export default node;
