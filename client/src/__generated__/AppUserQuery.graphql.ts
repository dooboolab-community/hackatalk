/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type AppUserQueryVariables = {};
export type AppUserQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly email: string;
        readonly verified: boolean;
    } | null;
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
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "AppUserQuery",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "AppUserQuery",
            "operationKind": "query",
            "text": "query AppUserQuery {\n  me {\n    id\n    email\n    verified\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '1c5a61f1624f7307c03ab3532479a1d0';
export default node;
