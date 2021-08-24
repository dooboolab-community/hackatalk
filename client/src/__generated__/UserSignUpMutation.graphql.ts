/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserCreateInput = {
    email: string;
    password: string;
    name?: string | null;
    nickname?: string | null;
    birthday?: unknown | null;
    gender?: unknown | null;
    phone?: string | null;
    statusMessage?: string | null;
};
export type UserSignUpMutationVariables = {
    user: UserCreateInput;
    photoUpload?: unknown | null;
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
  $photoUpload: Upload
) {
  signUp(user: $user, photoUpload: $photoUpload) {
    id
    email
    name
    photoURL
    verified
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "photoUpload"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "user"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "photoUpload",
        "variableName": "photoUpload"
      },
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserSignUpMutation",
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
    "name": "UserSignUpMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "29906fac887921ab95c5a709a6c04dcc",
    "id": null,
    "metadata": {},
    "name": "UserSignUpMutation",
    "operationKind": "mutation",
    "text": "mutation UserSignUpMutation(\n  $user: UserCreateInput!\n  $photoUpload: Upload\n) {\n  signUp(user: $user, photoUpload: $photoUpload) {\n    id\n    email\n    name\n    photoURL\n    verified\n  }\n}\n"
  }
};
})();
(node as any).hash = '46810a7b7e003b671ed6a6c75a3fc13f';
export default node;
