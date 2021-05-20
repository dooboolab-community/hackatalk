/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MainStackNavigatorOnMessageSubscriptionVariables = {};
export type MainStackNavigatorOnMessageSubscriptionResponse = {
    readonly onMessage: {
        readonly id: string;
        readonly imageUrls: ReadonlyArray<string | null> | null;
        readonly channel: {
            readonly id: string;
            readonly lastMessage: {
                readonly id: string;
                readonly messageType: unknown;
                readonly text: string | null;
                readonly imageUrls: ReadonlyArray<string | null> | null;
                readonly fileUrls: ReadonlyArray<string | null> | null;
                readonly createdAt: unknown | null;
            } | null;
        } | null;
        readonly sender: {
            readonly id: string;
            readonly name: string | null;
            readonly nickname: string | null;
        } | null;
        readonly createdAt: unknown | null;
        readonly " $fragmentRefs": FragmentRefs<"MessageListItem_message">;
    } | null;
};
export type MainStackNavigatorOnMessageSubscription = {
    readonly response: MainStackNavigatorOnMessageSubscriptionResponse;
    readonly variables: MainStackNavigatorOnMessageSubscriptionVariables;
};



/*
subscription MainStackNavigatorOnMessageSubscription {
  onMessage {
    id
    imageUrls
    channel {
      id
      lastMessage {
        id
        messageType
        text
        imageUrls
        fileUrls
        createdAt
      }
    }
    sender {
      id
      name
      nickname
    }
    createdAt
    ...MessageListItem_message
  }
}

fragment MessageListItem_message on Message {
  id
  messageType
  text
  imageUrls
  fileUrls
  createdAt
  updatedAt
  sender {
    id
    name
    nickname
    thumbURL
    ...ProfileModal_user
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
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrls",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "messageType",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fileUrls",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Channel",
  "kind": "LinkedField",
  "name": "channel",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Message",
      "kind": "LinkedField",
      "name": "lastMessage",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v1/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nickname",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainStackNavigatorOnMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "onMessage",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "sender",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MessageListItem_message"
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
    "name": "MainStackNavigatorOnMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "onMessage",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "sender",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "18658598b6d85ba73ad7ef4f5bc09637",
    "id": null,
    "metadata": {},
    "name": "MainStackNavigatorOnMessageSubscription",
    "operationKind": "subscription",
    "text": "subscription MainStackNavigatorOnMessageSubscription {\n  onMessage {\n    id\n    imageUrls\n    channel {\n      id\n      lastMessage {\n        id\n        messageType\n        text\n        imageUrls\n        fileUrls\n        createdAt\n      }\n    }\n    sender {\n      id\n      name\n      nickname\n    }\n    createdAt\n    ...MessageListItem_message\n  }\n}\n\nfragment MessageListItem_message on Message {\n  id\n  messageType\n  text\n  imageUrls\n  fileUrls\n  createdAt\n  updatedAt\n  sender {\n    id\n    name\n    nickname\n    thumbURL\n    ...ProfileModal_user\n  }\n}\n\nfragment ProfileModal_user on User {\n  id\n  photoURL\n  name\n  nickname\n  hasBlocked\n  statusMessage\n  isFriend\n}\n"
  }
};
})();
(node as any).hash = 'befdb0a2235749160b96a256ca4e03bc';
export default node;
