/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChannelLastMessageQueryVariables = {
    messageId: string;
};
export type ChannelLastMessageQueryResponse = {
    readonly message: {
        readonly id: string;
        readonly messageType: unknown;
        readonly text: string | null;
        readonly imageUrls: ReadonlyArray<string | null> | null;
        readonly fileUrls: ReadonlyArray<string | null> | null;
        readonly createdAt: unknown | null;
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
export type ChannelLastMessageQuery = {
    readonly response: ChannelLastMessageQueryResponse;
    readonly variables: ChannelLastMessageQueryVariables;
};



/*
query ChannelLastMessageQuery(
  $messageId: String!
) {
  message(id: $messageId) {
    id
    messageType
    text
    imageUrls
    fileUrls
    createdAt
    sender {
      id
    }
    channel {
      id
      lastMessage {
        id
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
    "name": "ChannelLastMessageQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChannelLastMessageQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c29ae19fa452ef1c798507915dade5a9",
    "id": null,
    "metadata": {},
    "name": "ChannelLastMessageQuery",
    "operationKind": "query",
    "text": "query ChannelLastMessageQuery(\n  $messageId: String!\n) {\n  message(id: $messageId) {\n    id\n    messageType\n    text\n    imageUrls\n    fileUrls\n    createdAt\n    sender {\n      id\n    }\n    channel {\n      id\n      lastMessage {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '583780a8ef53622da37fa9f821778923';
export default node;
