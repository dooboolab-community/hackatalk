/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MainStackNavigatorUserUpdatedSubscriptionVariables = {};
export type MainStackNavigatorUserUpdatedSubscriptionResponse = {
    readonly userUpdated: {
        readonly id: string;
        readonly photoURL: string | null;
        readonly name: string | null;
        readonly nickname: string | null;
        readonly hasBlocked: boolean | null;
        readonly statusMessage: string | null;
        readonly isFriend: boolean | null;
        readonly isOnline: boolean | null;
    } | null;
};
export type MainStackNavigatorUserUpdatedSubscription = {
    readonly response: MainStackNavigatorUserUpdatedSubscriptionResponse;
    readonly variables: MainStackNavigatorUserUpdatedSubscriptionVariables;
};



/*
subscription MainStackNavigatorUserUpdatedSubscription {
  userUpdated {
    id
    photoURL
    name
    nickname
    hasBlocked
    statusMessage
    isFriend
    isOnline
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "userUpdated",
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
        "name": "photoURL",
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
        "name": "hasBlocked",
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
        "name": "isFriend",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isOnline",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainStackNavigatorUserUpdatedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainStackNavigatorUserUpdatedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "c242df31af22727eb38b9b31ed5d037b",
    "id": null,
    "metadata": {},
    "name": "MainStackNavigatorUserUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription MainStackNavigatorUserUpdatedSubscription {\n  userUpdated {\n    id\n    photoURL\n    name\n    nickname\n    hasBlocked\n    statusMessage\n    isFriend\n    isOnline\n  }\n}\n"
  }
};
})();
(node as any).hash = '0afd2144a9bfbfe7b2a92ceae58c1574';
export default node;
