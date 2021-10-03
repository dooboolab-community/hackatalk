/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserSignInAppleMutationVariables = {
    accessToken: string;
};
export type UserSignInAppleMutationResponse = {
    readonly signInWithApple: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly name: string | null;
            readonly photoURL: string | null;
            readonly verified: boolean | null;
            readonly profile: {
                readonly authType: unknown | null;
            } | null;
        };
    };
};
export type UserSignInAppleMutation = {
    readonly response: UserSignInAppleMutationResponse;
    readonly variables: UserSignInAppleMutationVariables;
};



/*
mutation UserSignInAppleMutation(
  $accessToken: String!
) {
  signInWithApple(accessToken: $accessToken) {
    token
    user {
      id
      email
      name
      photoURL
      verified
      profile {
        authType
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
    "name": "accessToken"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "accessToken",
        "variableName": "accessToken"
      }
    ],
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "signInWithApple",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "authType",
                "storageKey": null
              }
            ],
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
    "name": "UserSignInAppleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserSignInAppleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "05828268b57653965d9b3bbb0958f417",
    "id": null,
    "metadata": {},
    "name": "UserSignInAppleMutation",
    "operationKind": "mutation",
    "text": "mutation UserSignInAppleMutation(\n  $accessToken: String!\n) {\n  signInWithApple(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      name\n      photoURL\n      verified\n      profile {\n        authType\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f40963ef2a9220b26fa19a785b32ff15';
export default node;
