/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserChangeEmailPasswordMutationVariables = {
    password: string;
    newPassword: string;
};
export type UserChangeEmailPasswordMutationResponse = {
    readonly changeEmailPassword: boolean | null;
};
export type UserChangeEmailPasswordMutation = {
    readonly response: UserChangeEmailPasswordMutationResponse;
    readonly variables: UserChangeEmailPasswordMutationVariables;
};



/*
mutation UserChangeEmailPasswordMutation(
  $password: String!
  $newPassword: String!
) {
  changeEmailPassword(password: $password, newPassword: $newPassword)
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "newPassword"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "newPassword",
        "variableName": "newPassword"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      }
    ],
    "kind": "ScalarField",
    "name": "changeEmailPassword",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserChangeEmailPasswordMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserChangeEmailPasswordMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "2044b314aa9a246816b4c0edd3a17718",
    "id": null,
    "metadata": {},
    "name": "UserChangeEmailPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation UserChangeEmailPasswordMutation(\n  $password: String!\n  $newPassword: String!\n) {\n  changeEmailPassword(password: $password, newPassword: $newPassword)\n}\n"
  }
};
})();
(node as any).hash = '03344bb98349028625d160a240186b15';
export default node;
