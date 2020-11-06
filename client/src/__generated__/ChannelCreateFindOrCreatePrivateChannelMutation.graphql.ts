/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChannelCreateFindOrCreatePrivateChannelMutationVariables = {
    peerUserId: string;
};
export type ChannelCreateFindOrCreatePrivateChannelMutationResponse = {
    readonly findOrCreatePrivateChannel: {
        readonly id: string;
        readonly name: string | null;
    };
};
export type ChannelCreateFindOrCreatePrivateChannelMutation = {
    readonly response: ChannelCreateFindOrCreatePrivateChannelMutationResponse;
    readonly variables: ChannelCreateFindOrCreatePrivateChannelMutationVariables;
};



/*
mutation ChannelCreateFindOrCreatePrivateChannelMutation(
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
            "name": "ChannelCreateFindOrCreatePrivateChannelMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ChannelCreateFindOrCreatePrivateChannelMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "1d0a8cc48aa29922537b5cd4920e1201",
            "id": null,
            "metadata": {},
            "name": "ChannelCreateFindOrCreatePrivateChannelMutation",
            "operationKind": "mutation",
            "text": "mutation ChannelCreateFindOrCreatePrivateChannelMutation(\n  $peerUserId: String!\n) {\n  findOrCreatePrivateChannel(peerUserId: $peerUserId) {\n    id\n    name\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '0c05e3fecb2f638e6839d1a9d5bdab30';
export default node;
