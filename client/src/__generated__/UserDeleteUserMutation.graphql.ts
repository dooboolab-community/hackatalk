/**
 * @generated SignedSource<<2e0008f7fb17accb47ea4b40590c3f87>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserDeleteUserMutation$variables = {
  id: string;
};
export type UserDeleteUserMutation$data = {
  readonly deleteUser: boolean;
};
export type UserDeleteUserMutation = {
  variables: UserDeleteUserMutation$variables;
  response: UserDeleteUserMutation$data;
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
    "kind": "ScalarField",
    "name": "deleteUser",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserDeleteUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserDeleteUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b93bbb3695e30c454540cca3819fc763",
    "id": null,
    "metadata": {},
    "name": "UserDeleteUserMutation",
    "operationKind": "mutation",
    "text": "mutation UserDeleteUserMutation(\n  $id: ID!\n) {\n  deleteUser(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "048e166269f1ce91077f7f2a545faa29";

export default node;
