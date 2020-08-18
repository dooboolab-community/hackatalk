/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SocialSignInButtonGoogleSignInMutationVariables = {
    token: string;
};
export type SocialSignInButtonGoogleSignInMutationResponse = {
    readonly signInWithGoogle: {
        readonly token: string;
        readonly user: {
            readonly id: string;
        };
    };
};
export type SocialSignInButtonGoogleSignInMutation = {
    readonly response: SocialSignInButtonGoogleSignInMutationResponse;
    readonly variables: SocialSignInButtonGoogleSignInMutationVariables;
};



/*
mutation SocialSignInButtonGoogleSignInMutation(
  $token: String!
) {
  signInWithGoogle(accessToken: $token) {
    token
    user {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "token"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "accessToken",
                    "variableName": "token"
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
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "SocialSignInButtonGoogleSignInMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SocialSignInButtonGoogleSignInMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "81b9a31bae5c1ceab9aa498c0e535143",
            "id": null,
            "metadata": {},
            "name": "SocialSignInButtonGoogleSignInMutation",
            "operationKind": "mutation",
            "text": "mutation SocialSignInButtonGoogleSignInMutation(\n  $token: String!\n) {\n  signInWithGoogle(accessToken: $token) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '55670a6ac6f2038ced30fbbc7d83aeb6';
export default node;
