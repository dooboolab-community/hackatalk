/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ProfileUpdateMeQueryVariables = {};
export type ProfileUpdateMeQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly email: string | null;
        readonly name: string | null;
        readonly nickname: string | null;
        readonly statusMessage: string | null;
        readonly verified: boolean | null;
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
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "ProfileUpdateMeQuery",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "ProfileUpdateMeQuery",
            "operationKind": "query",
            "text": "query ProfileUpdateMeQuery {\n  me {\n    id\n    email\n    name\n    nickname\n    statusMessage\n    verified\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '2460b110f26e597c5977148989d76bec';
export default node;
