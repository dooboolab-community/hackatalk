/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserGoogleSignInMutationVariables = {
    accessToken: string;
};
export type UserGoogleSignInMutationResponse = {
    readonly signInWithGoogle: {
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
export type UserGoogleSignInMutation = {
    readonly response: UserGoogleSignInMutationResponse;
    readonly variables: UserGoogleSignInMutationVariables;
};



/*
mutation UserGoogleSignInMutation(
  $accessToken: String!
) {
  signInWithGoogle(accessToken: $accessToken) {
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
    "name": "signInWithGoogle",
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
    "name": "UserGoogleSignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserGoogleSignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c53213d3873873ebba7ffcd390648487",
    "id": null,
    "metadata": {},
    "name": "UserGoogleSignInMutation",
    "operationKind": "mutation",
    "text": "mutation UserGoogleSignInMutation(\n  $accessToken: String!\n) {\n  signInWithGoogle(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      name\n      photoURL\n      verified\n      profile {\n        authType\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ff7dc4d845dfb3b4872d2a87a4f3030c';
export default node;
