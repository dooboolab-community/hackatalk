/**
 * @generated SignedSource<<5acf0878310c84ec3bf8cb91a4f81558>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserVerifyEmailMutation$variables = {
  email: string;
};
export type UserVerifyEmailMutation$data = {
  readonly sendVerification: boolean;
};
export type UserVerifyEmailMutation = {
  variables: UserVerifyEmailMutation$variables;
  response: UserVerifyEmailMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "kind": "ScalarField",
    "name": "sendVerification",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserVerifyEmailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserVerifyEmailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7dfaf132dbbb270cd9437480acfdd55d",
    "id": null,
    "metadata": {},
    "name": "UserVerifyEmailMutation",
    "operationKind": "mutation",
    "text": "mutation UserVerifyEmailMutation(\n  $email: String!\n) {\n  sendVerification(email: $email)\n}\n"
  }
};
})();

(node as any).hash = "4c0bb0c06641cea7b028298a7441f161";

export default node;
