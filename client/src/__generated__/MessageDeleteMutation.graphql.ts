/**
 * @generated SignedSource<<1614c6a216fbe91373edca8959e1b9b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MessageDeleteMutation$variables = {
  id: string;
};
export type MessageDeleteMutationVariables = MessageDeleteMutation$variables;
export type MessageDeleteMutation$data = {
  readonly deleteMessage: {
    readonly id: string;
    readonly deletedAt: any | null;
    readonly channelId: string;
  } | null;
};
export type MessageDeleteMutationResponse = MessageDeleteMutation$data;
export type MessageDeleteMutation = {
  variables: MessageDeleteMutationVariables;
  response: MessageDeleteMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Message",
    "kind": "LinkedField",
    "name": "deleteMessage",
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
        "name": "deletedAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "channelId",
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
    "name": "MessageDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2578f0fdf750c18ee690ac8932fcad3a",
    "id": null,
    "metadata": {},
    "name": "MessageDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation MessageDeleteMutation(\n  $id: String!\n) {\n  deleteMessage(id: $id) {\n    id\n    deletedAt\n    channelId\n  }\n}\n"
  }
};
})();

(node as any).hash = "3de280feb9b78dc44ac4febe1cbd09c0";

export default node;
