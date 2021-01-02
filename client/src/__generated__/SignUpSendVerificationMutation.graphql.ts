/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignUpSendVerificationMutationVariables = {
    email: string;
};
export type SignUpSendVerificationMutationResponse = {
    readonly sendVerification: boolean;
};
export type SignUpSendVerificationMutation = {
    readonly response: SignUpSendVerificationMutationResponse;
    readonly variables: SignUpSendVerificationMutationVariables;
};



/*
mutation SignUpSendVerificationMutation(
  $email: String!
) {
  sendVerification(email: $email)
}
*/

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
    "name": "SignUpSendVerificationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpSendVerificationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9089c157ca9878ecaead1fc706d3205d",
    "id": null,
    "metadata": {},
    "name": "SignUpSendVerificationMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpSendVerificationMutation(\n  $email: String!\n) {\n  sendVerification(email: $email)\n}\n"
  }
};
})();
(node as any).hash = '53bedc94bf47909f81e875d308065772';
export default node;
