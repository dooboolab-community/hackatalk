/**
 * @generated SignedSource<<194d50d72ed7da61a5413c1703a73404>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MessageLastMessageQuery$variables = {
  messageId: string;
};
export type MessageLastMessageQuery$data = {
  readonly message: {
    readonly id: string;
    readonly messageType: any;
    readonly text: string | null;
    readonly imageUrls: ReadonlyArray<string | null> | null;
    readonly fileUrls: ReadonlyArray<string | null> | null;
    readonly createdAt: any | null;
    readonly sender: {
      readonly id: string;
    } | null;
    readonly channel: {
      readonly id: string;
      readonly lastMessage: {
        readonly id: string;
      } | null;
    } | null;
  } | null;
};
export type MessageLastMessageQuery = {
  variables: MessageLastMessageQuery$variables;
  response: MessageLastMessageQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "messageId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "messageId"
      }
    ],
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "message",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "sender",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Channel",
        "kind": "LinkedField",
        "name": "channel",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "lastMessage",
            "plural": false,
            "selections": (v2/*: any*/),
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
    "name": "MessageLastMessageQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageLastMessageQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "eead5c942d3a463b72b7455923c4f68a",
    "id": null,
    "metadata": {},
    "name": "MessageLastMessageQuery",
    "operationKind": "query",
    "text": "query MessageLastMessageQuery(\n  $messageId: String!\n) {\n  message(id: $messageId) {\n    id\n    messageType\n    text\n    imageUrls\n    fileUrls\n    createdAt\n    sender {\n      id\n    }\n    channel {\n      id\n      lastMessage {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c3f84b35476b61285bb36e9693482766";

export default node;
