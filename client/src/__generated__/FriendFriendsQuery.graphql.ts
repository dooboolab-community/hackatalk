/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FriendFriendsQueryVariables = {};
export type FriendFriendsQueryResponse = {
    readonly me: {
        readonly friends: ReadonlyArray<{
            readonly id: string;
            readonly email: string | null;
            readonly name: string | null;
            readonly nickname: string | null;
            readonly thumbURL: string | null;
            readonly photoURL: string | null;
            readonly birthday: unknown | null;
            readonly gender: unknown | null;
            readonly phone: string | null;
            readonly statusMessage: string | null;
            readonly verified: boolean | null;
            readonly lastSignedIn: unknown | null;
            readonly isOnline: boolean | null;
            readonly createdAt: unknown | null;
            readonly updatedAt: unknown | null;
            readonly deletedAt: unknown | null;
        }> | null;
    };
};
export type FriendFriendsQuery = {
    readonly response: FriendFriendsQueryResponse;
    readonly variables: FriendFriendsQueryVariables;
};



/*
query FriendFriendsQuery {
  me {
    friends {
      id
      email
      name
      nickname
      thumbURL
      photoURL
      birthday
      gender
      phone
      statusMessage
      verified
      lastSignedIn
      isOnline
      createdAt
      updatedAt
      deletedAt
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
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "friends",
                    "plural": true,
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
                            "name": "thumbURL",
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
                            "name": "birthday",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "gender",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "phone",
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
                            "name": "lastSignedIn",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOnline",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "createdAt",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "updatedAt",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "deletedAt",
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
            "name": "FriendFriendsQuery",
            "selections": (v0 /*: any*/),
            "type": "Query",
            "abstractKey": null
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": [],
            "kind": "Operation",
            "name": "FriendFriendsQuery",
            "selections": (v0 /*: any*/)
        },
        "params": {
            "cacheID": "d9a37295bb831d92b54523f63c143f71",
            "id": null,
            "metadata": {},
            "name": "FriendFriendsQuery",
            "operationKind": "query",
            "text": "query FriendFriendsQuery {\n  me {\n    friends {\n      id\n      email\n      name\n      nickname\n      thumbURL\n      photoURL\n      birthday\n      gender\n      phone\n      statusMessage\n      verified\n      lastSignedIn\n      isOnline\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'aa8fdc09e1e6728a60f30b221accfb2f';
export default node;
