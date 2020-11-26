/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChannelCreateFindOrCreatePrivateChannelMutationVariables = {
    peerUserIds: Array<string>;
};
export type ChannelCreateFindOrCreatePrivateChannelMutationResponse = {
    readonly findOrCreatePrivateChannel: {
        readonly id: string;
        readonly name: string | null;
        readonly channelType: unknown;
    } | null;
};
export type ChannelCreateFindOrCreatePrivateChannelMutation = {
    readonly response: ChannelCreateFindOrCreatePrivateChannelMutationResponse;
    readonly variables: ChannelCreateFindOrCreatePrivateChannelMutationVariables;
};



/*
mutation ChannelCreateFindOrCreatePrivateChannelMutation(
  $peerUserIds: [String!]!
) {
  findOrCreatePrivateChannel(peerUserIds: $peerUserIds) {
    id
    name
    channelType
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
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "channelType",
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
            "cacheID": "a8d3262106bfb28cbe87b4008c2d3356",
            "id": null,
            "metadata": {},
            "name": "ChannelCreateFindOrCreatePrivateChannelMutation",
            "operationKind": "mutation",
            "text": "mutation ChannelCreateFindOrCreatePrivateChannelMutation(\n  $peerUserIds: [String!]!\n) {\n  findOrCreatePrivateChannel(peerUserIds: $peerUserIds) {\n    id\n    name\n    channelType\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'a4ba54c3dd6f7d0debf4577aa3883071';
export default node;
