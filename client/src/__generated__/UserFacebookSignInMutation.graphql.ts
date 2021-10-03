/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserFacebookSignInMutationVariables = {
    accessToken: string;
};
export type UserFacebookSignInMutationResponse = {
    readonly signInWithFacebook: {
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
export type UserFacebookSignInMutation = {
    readonly response: UserFacebookSignInMutationResponse;
    readonly variables: UserFacebookSignInMutationVariables;
};



/*
mutation UserFacebookSignInMutation(
  $accessToken: String!
) {
  signInWithFacebook(accessToken: $accessToken) {
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
    "name": "signInWithFacebook",
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
    "name": "UserFacebookSignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserFacebookSignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a84a13de21bb31078dcab6eb033f1e92",
    "id": null,
    "metadata": {},
    "name": "UserFacebookSignInMutation",
    "operationKind": "mutation",
    "text": "mutation UserFacebookSignInMutation(\n  $accessToken: String!\n) {\n  signInWithFacebook(accessToken: $accessToken) {\n    token\n    user {\n      id\n      email\n      name\n      photoURL\n      verified\n      profile {\n        authType\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7d54ecc87ecd2ae786f3a92a9ba77d74';
export default node;
