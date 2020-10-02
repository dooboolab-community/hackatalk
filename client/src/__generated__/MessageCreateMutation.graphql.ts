/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MessageCreateInput = {
    messageType?: unknown | null;
    text?: string | null;
    imageUrls?: Array<string> | null;
    fileUrls?: Array<string> | null;
};
export type MessageCreateMutationVariables = {
    channelId: string;
    message: MessageCreateInput;
};
export type MessageCreateMutationResponse = {
    readonly createMessage: {
        readonly id: string;
        readonly text: string | null;
        readonly messageType: unknown;
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
            readonly lastMessage: {
                readonly messageType: unknown;
                readonly text: string | null;
                readonly imageUrls: ReadonlyArray<string> | null;
                readonly fileUrls: ReadonlyArray<string> | null;
                readonly createdAt: unknown | null;
            } | null;
        } | null;
    };
};
export type MessageCreateMutation = {
    readonly response: MessageCreateMutationResponse;
    readonly variables: MessageCreateMutationVariables;
};



/*
mutation MessageCreateMutation(
  $channelId: String!
  $message: MessageCreateInput!
) {
  createMessage(channelId: $channelId, message: $message) {
    id
    text
    messageType
    channel {
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
        messageType
        text
        imageUrls
        fileUrls
        createdAt
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
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "message"
        } as any)
    ], v1 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
    } as any), v3 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "messageType",
        "storageKey": null
    } as any), v4 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
    } as any), v5 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "channelId",
                    "variableName": "channelId"
                },
                {
                    "kind": "Variable",
                    "name": "message",
                    "variableName": "message"
                }
            ],
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "createMessage",
            "plural": false,
            "selections": [
                (v1 /*: any*/),
                (v2 /*: any*/),
                (v3 /*: any*/),
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "Channel",
                    "kind": "LinkedField",
                    "name": "channel",
                    "plural": false,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "channelType",
                            "storageKey": null
                        },
                        (v4 /*: any*/),
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
                                        (v4 /*: any*/),
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
                                (v3 /*: any*/),
                                (v2 /*: any*/),
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
                        }
                    ],
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
            "name": "MessageCreateMutation",
            "selections": (v5 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "MessageCreateMutation",
            "selections": (v5 /*: any*/)
        },
        "params": {
            "cacheID": "fc852c7521e214e0b45b3d3bdeee9c9b",
            "id": null,
            "metadata": {},
            "name": "MessageCreateMutation",
            "operationKind": "mutation",
            "text": "mutation MessageCreateMutation(\n  $channelId: String!\n  $message: MessageCreateInput!\n) {\n  createMessage(channelId: $channelId, message: $message) {\n    id\n    text\n    messageType\n    channel {\n      id\n      channelType\n      name\n      memberships(excludeMe: true) {\n        user {\n          name\n          nickname\n          thumbURL\n          photoURL\n        }\n      }\n      lastMessage {\n        messageType\n        text\n        imageUrls\n        fileUrls\n        createdAt\n      }\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '969c9d2478384ba63b7d4323857734ad';
export default node;
