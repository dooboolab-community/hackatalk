/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SocialSignInButtonFacebookSignInMutationVariables = {
    token: string;
};
export type SocialSignInButtonFacebookSignInMutationResponse = {
    readonly signInWithFacebook: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly name: string | null;
            readonly nickname: string | null;
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
      email
      name
      nickname
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
                            "name": "nickname",
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
            "cacheID": "cecbee289e8cf5a4a313c95ffe414a4c",
            "id": null,
            "metadata": {},
            "name": "SocialSignInButtonFacebookSignInMutation",
            "operationKind": "mutation",
            "text": "mutation SocialSignInButtonFacebookSignInMutation(\n  $token: String!\n) {\n  signInWithFacebook(accessToken: $token) {\n    token\n    user {\n      id\n      email\n      name\n      nickname\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '4136b1130e4314532ce436342c61b6f9';
export default node;
