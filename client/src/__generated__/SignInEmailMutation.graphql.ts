/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SignInEmailMutationVariables = {
    email: string;
    password: string;
};
export type SignInEmailMutationResponse = {
    readonly signInEmail: {
        readonly token: string;
        readonly user: {
            readonly id: string;
            readonly email: string | null;
            readonly name: string | null;
            readonly photoURL: string | null;
            readonly verified: boolean | null;
        };
    };
};
export type SignInEmailMutation = {
    readonly response: SignInEmailMutationResponse;
    readonly variables: SignInEmailMutationVariables;
};



/*
mutation SignInEmailMutation(
  $email: String!
  $password: String!
) {
  signInEmail(email: $email, password: $password) {
    token
    user {
      id
      email
      name
      photoURL
      verified
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "email"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "password"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "email",
                    "variableName": "email"
                },
                {
                    "kind": "Variable",
                    "name": "password",
                    "variableName": "password"
                }
            ],
            "concreteType": "AuthPayload",
            "kind": "LinkedField",
            "name": "signInEmail",
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
            "name": "SignInEmailMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "SignInEmailMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "cacheID": "0e4e51d056e95de0028eefb827e6bb45",
            "id": null,
            "metadata": {},
            "name": "SignInEmailMutation",
            "operationKind": "mutation",
            "text": "mutation SignInEmailMutation(\n  $email: String!\n  $password: String!\n) {\n  signInEmail(email: $email, password: $password) {\n    token\n    user {\n      id\n      email\n      name\n      photoURL\n      verified\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '6cbfdcad3d505598e6b091a886515aa2';
export default node;
