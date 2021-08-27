/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type MainFriendUserUpdatedSubscriptionVariables = {};
export type MainFriendUserUpdatedSubscriptionResponse = {
    readonly userUpdated: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ProfileModal_user" | "UserListItem_user">;
    } | null;
};
export type MainFriendUserUpdatedSubscription = {
    readonly response: MainFriendUserUpdatedSubscriptionResponse;
    readonly variables: MainFriendUserUpdatedSubscriptionVariables;
};



/*
subscription MainFriendUserUpdatedSubscription {
  userUpdated {
    id
    ...ProfileModal_user
    ...UserListItem_user
  }
}

fragment ProfileModal_user on User {
  id
  photoURL
  name
  nickname
  hasBlocked
  statusMessage
  isFriend
}

fragment UserListItem_user on User {
  id
  photoURL
  nickname
  name
  statusMessage
  isOnline
  hasBlocked
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainFriendUserUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "userUpdated",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProfileModal_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserListItem_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainFriendUserUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "userUpdated",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "33a7f5d012f0b13f5dd22cbf3fc118ef",
    "id": null,
    "metadata": {},
    "name": "MainFriendUserUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription MainFriendUserUpdatedSubscription {\n  userUpdated {\n    id\n    ...ProfileModal_user\n    ...UserListItem_user\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n\nfragment UserListItem_user on User {\n  id\n  photoURL\n  nickname\n  name\n  statusMessage\n  isOnline\n  hasBlocked\n}\n"
  }
};
})();
(node as any).hash = '1e5c38b2d7c2f61bf28dc523f64602d7';
export default node;
