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
        readonly profile: {
            readonly authType: AuthType | null;
        } | null;
    };
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
            "cacheID": "d1997df29a2675627f365ee2d34de6e2",
            "id": null,
            "metadata": {},
            "name": "ProfileUpdateMeQuery",
            "operationKind": "query",
            "text": "query ProfileUpdateMeQuery {\n  me {\n    id\n    email\n    name\n    nickname\n    statusMessage\n    verified\n    profile {\n      authType\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'a90bc09d8e46e51e5b05576eb2e83ff2';
export default node;
