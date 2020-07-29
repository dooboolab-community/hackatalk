/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SocialSignInButtonFacebookSignInMutationVariables = {
    token: string;
};
export type SocialSignInButtonFacebookSignInMutationResponse = {
    readonly signInWithFacebook: {
        readonly token: string;
        readonly user: {
            readonly id: string;
        };
    };
};
export type SocialSignInButtonFacebookSignInMutation = {
    readonly response: SocialSignInButtonFacebookSignInMutationResponse;
    readonly variables: SocialSignInButtonFacebookSignInMutationVariables;
};



/*
mutation SocialSignInButtonFacebookSignInMutation(
  $token: String!
) {
  signInWithFacebook(accessToken: $token) {
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
            "name": "SocialSignInButtonFacebookSignInMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SocialSignInButtonFacebookSignInMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "fe92e0a4a508022f173f8b7aa65fa5d8",
            "id": null,
            "metadata": {},
            "name": "SocialSignInButtonFacebookSignInMutation",
            "operationKind": "mutation",
            "text": "mutation SocialSignInButtonFacebookSignInMutation(\n  $token: String!\n) {\n  signInWithFacebook(accessToken: $token) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '67bef5067ac978f18537b63abe53716d';
export default node;
