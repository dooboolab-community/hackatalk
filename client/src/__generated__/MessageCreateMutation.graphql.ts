/**
 * @generated SignedSource<<ac94c4fd964865d75ff3ea51d0dce9ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MessageCreateInput = {
  messageType?: any | null;
  text?: string | null;
  imageUrls?: ReadonlyArray<string> | null;
  fileUrls?: ReadonlyArray<string> | null;
};
export type MessageCreateMutation$variables = {
  channelId: string;
  message: MessageCreateInput;
  deviceKey: string;
};
export type MessageCreateMutation$data = {
  readonly createMessage: {
    readonly id: string;
    readonly text: string | null;
    readonly messageType: any;
    readonly imageUrls: ReadonlyArray<string | null> | null;
    readonly fileUrls: ReadonlyArray<string | null> | null;
    readonly createdAt: any | null;
    readonly sender: {
      readonly id: string;
    } | null;
    readonly channel: {
      readonly id: string;
      readonly channelType: any | null;
      readonly name: string | null;
      readonly memberships: ReadonlyArray<{
        readonly user: {
          readonly id: string;
          readonly name: string | null;
          readonly nickname: string | null;
          readonly thumbURL: string | null;
          readonly photoURL: string | null;
        } | null;
      }> | null;
      readonly lastMessage: {
        readonly messageType: any;
        readonly text: string | null;
        readonly imageUrls: ReadonlyArray<string | null> | null;
        readonly fileUrls: ReadonlyArray<string | null> | null;
        readonly createdAt: any | null;
      } | null;
    } | null;
  } | null;
};
export type MessageCreateMutation = {
  variables: MessageCreateMutation$variables;
  response: MessageCreateMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "channelId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "deviceKey"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "message"
},
v3 = [
  {
    "kind": "Variable",
    "name": "channelId",
    "variableName": "channelId"
  },
  {
    "kind": "Variable",
    "name": "deviceKey",
    "variableName": "deviceKey"
  },
  {
    "kind": "Variable",
    "name": "message",
    "variableName": "message"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "messageType",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrls",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fileUrls",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "sender",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "channelType",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "excludeMe",
      "value": false
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
        (v4/*: any*/),
        (v12/*: any*/),
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
  "storageKey": "memberships(excludeMe:false)"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "createMessage",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Channel",
            "kind": "LinkedField",
            "name": "channel",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "lastMessage",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "MessageCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "createMessage",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Channel",
            "kind": "LinkedField",
            "name": "channel",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Message",
                "kind": "LinkedField",
                "name": "lastMessage",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bf0ad02629ed3114da35a35d5ec634d7",
    "id": null,
    "metadata": {},
    "name": "MessageCreateMutation",
    "operationKind": "mutation",
    "text": "mutation MessageCreateMutation(\n  $channelId: String!\n  $message: MessageCreateInput!\n  $deviceKey: String!\n) {\n  createMessage(channelId: $channelId, message: $message, deviceKey: $deviceKey) {\n    id\n    text\n    messageType\n    imageUrls\n    fileUrls\n    createdAt\n    sender {\n      id\n    }\n    channel {\n      id\n      channelType\n      name\n      memberships(excludeMe: false) {\n        user {\n          id\n          name\n          nickname\n          thumbURL\n          photoURL\n        }\n      }\n      lastMessage {\n        messageType\n        text\n        imageUrls\n        fileUrls\n        createdAt\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "240bf95e484493199ddc1321b0fee1f9";

export default node;
