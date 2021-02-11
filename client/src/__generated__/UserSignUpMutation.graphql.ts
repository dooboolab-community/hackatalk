/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserCreateInput = {
    email: string;
    password: string;
    name?: string | null;
    nickname?: string | null;
    thumbURL?: string | null;
    photoURL?: string | null;
    birthday?: unknown | null;
    gender?: unknown | null;
    phone?: string | null;
    statusMessage?: string | null;
};
export type UserSignUpMutationVariables = {
    user: UserCreateInput;
};
export type UserSignUpMutationResponse = {
    readonly signUp: {
        readonly id: string;
        readonly email: string | null;
        readonly name: string | null;
        readonly photoURL: string | null;
        readonly verified: boolean | null;
    };
};
export type UserSignUpMutation = {
    readonly response: UserSignUpMutationResponse;
    readonly variables: UserSignUpMutationVariables;
};



/*
mutation UserSignUpMutation(
  $user: UserCreateInput!
) {
  signUp(user: $user) {
    id
    email
    name
    photoURL
    verified
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user",
        "variableName": "user"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "signUp",
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
        "name": "email",
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
        "name": "photoURL",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "verified",
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
    "name": "UserSignUpMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserSignUpMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0392e1dd69d7dbe47d28ec02dd07b203",
    "id": null,
    "metadata": {},
    "name": "UserSignUpMutation",
    "operationKind": "mutation",
    "text": "mutation UserSignUpMutation(\n  $user: UserCreateInput!\n) {\n  signUp(user: $user) {\n    id\n    email\n    name\n    photoURL\n    verified\n  }\n}\n"
  }
};
})();
(node as any).hash = '6323b0c85cbbb1ecc6a8360caffd1cbd';
export default node;
