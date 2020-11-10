/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AuthType = "apple" | "email" | "facebook" | "google" | "%future added value";
export type ProfileUpdateMeQueryVariables = {};
export type ProfileUpdateMeQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly email: string | null;
        readonly name: string | null;
        readonly nickname: string | null;
        readonly statusMessage: string | null;
        readonly verified: boolean | null;
        readonly photoURL: string | null;
        readonly thumbURL: string | null;
        readonly profile: {
            readonly authType: AuthType | null;
        } | null;
    } | null;
};
export type ProfileUpdateMeQuery = {
    readonly response: ProfileUpdateMeQueryResponse;
    readonly variables: ProfileUpdateMeQueryVariables;
};



/*
query ProfileUpdateMeQuery {
  me {
    id
    email
    name
    nickname
    statusMessage
    verified
    photoURL
    thumbURL
    profile {
      authType
    }
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "me",
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
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "statusMessage",
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
                    "kind": "ScalarField",
                    "name": "photoURL",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "thumbURL",
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
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": [],
            "kind": "Fragment",
            "metadata": null,
            "name": "ProfileUpdateMeQuery",
            "selections": (v0 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "ProfileUpdateMeQuery",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "cacheID": "f71da5b3e1367fc5bd7964b5e6b7caf8",
            "id": null,
            "metadata": {},
            "name": "ProfileUpdateMeQuery",
            "operationKind": "query",
            "text": "query ProfileUpdateMeQuery {\n  me {\n    id\n    email\n    name\n    nickname\n    statusMessage\n    verified\n    photoURL\n    thumbURL\n    profile {\n      authType\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'c57ad9efd9805fc9946d1a4897b43b11';
export default node;
