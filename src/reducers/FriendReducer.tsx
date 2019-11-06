import { User } from '../types';
import produce from 'immer';

export interface FriendAction {
  readonly type: string;
  readonly payload: {
    friend?: User;
    friends?: User[];
  };
}

export interface FriendState {
  friendList: User[];
}

const sortMethod: (a: User, b: User) => number = (a, b) => {
  return a.displayName > b.displayName ? 1 : -1;
};

const fakeFriends = [
  {
    uid: '9',
    displayName: 'mars2',
    thumbURL:
      'https://github.com/marsinearth/violin-mockup/blob/master/static/favicons/android-chrome-192x192.png?raw=true',
    photoURL:
      'https://github.com/marsinearth/violin-mockup/blob/master/static/favicons/android-chrome-192x192.png?raw=true',
    statusMsg: 'I\'m mars2.',
    online: true,
  },
  {
    uid: '10',
    displayName: 'gordon2',
    thumbURL:
      'https://miro.medium.com/fit/c/256/256/2*rbUkfoA5vfuphYYULjIG_Q.png',
    photoURL:
      'https://miro.medium.com/fit/c/256/256/2*rbUkfoA5vfuphYYULjIG_Q.png',
    statusMsg: 'I\'m gordon2',
    online: true,
  },
];

fakeFriends.sort(sortMethod);

export const initialFriend: FriendState = {
  // friendList: [],
  friendList: fakeFriends,
};

export const friendReducer = (state: FriendState = initialFriend, action: any): FriendState => {
  return produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case 'add-friend': {
        const index = draft.friendList.findIndex((friend) => {
          return payload.friend.displayName.toLowerCase() < friend.displayName.toLowerCase();
        });
        draft.friendList.splice(index === -1 ? draft.friendList.length : index, 0, payload.friend);
        break;
      }
      case 'add-friends': {
        draft.friendList.concat(payload.friends);
        draft.friendList.sort(sortMethod);
        break;
      }
      case 'delete-friend': {
        const index = draft.friendList.findIndex((friend) => friend.uid === payload.friend.uid);
        if (index !== -1) {
          draft.friendList.splice(index, 1);
        }
      }
    }
  });

  /*
  // without immer
  const { type, payload } = action;
  switch (type) {
    case 'add-friend': {
      const friendList = [...state.friendList];
      const index = friendList.findIndex((friend) => {
        return payload.friend.displayName.toLowerCase() < friend.displayName.toLowerCase();
      });
      friendList.splice(index === -1 ? friendList.length : index, 0, payload.friend);
      return {
        ...state,
        friendList,
      };
    }
    case 'add-friends': {
      const friendList = state.friendList.concat(payload.friends);
      friendList.sort(sortMethod);
      return {
        ...state,
        friendList,
      };
    }
    case 'delete-friend': {
      const friendList = [...state.friendList];
      const index = friendList.findIndex((friend) => friend.uid === payload.friend.uid);
      if (index !== -1) {
        friendList.splice(index, 1);
      }
      return {
        ...state,
        friendList,
      };
    }
    default:
      return state;
  }
  */
};
