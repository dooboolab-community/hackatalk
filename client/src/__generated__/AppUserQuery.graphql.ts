/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AuthType = "apple" | "email" | "facebook" | "google" | "%future added value";
export type AppUserQueryVariables = {};
export type AppUserQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly email: string | null;
        readonly verified: boolean | null;
        readonly profile: {
            readonly authType: AuthType | null;
        } | null;
    };
};
export type AppUserQuery = {
    readonly response: AppUserQueryResponse;
    readonly variables: AppUserQueryVariables;
};



/*
query AppUserQuery {
  me {
    id
    email
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
            "name": "AppUserQuery",
            "selections": (v0 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "AppUserQuery",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "cacheID": "5bad95919cfec5b3a48edb5d0ebfba84",
            "id": null,
            "metadata": {},
            "name": "AppUserQuery",
            "operationKind": "query",
            "text": "query AppUserQuery {\n  me {\n    id\n    email\n    verified\n    profile {\n      authType\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '741765a762e78c334bb1f46e7d73852e';
export default node;
