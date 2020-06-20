export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Upload: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export enum AuthType {
  Email = 'email',
  Facebook = 'facebook',
  Google = 'google',
  Apple = 'apple'
}

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['ID'];
  type?: Maybe<ChannelType>;
  name?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  memberships?: Maybe<Array<Maybe<Membership>>>;
  myMembership?: Maybe<Membership>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type ChannelInput = {
  type?: Maybe<ChannelType>;
  name?: Maybe<Scalars['String']>;
  friendIds: Array<Scalars['String']>;
};

export enum ChannelType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}



export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type Friend = {
  __typename?: 'Friend';
  id: Scalars['ID'];
  user?: Maybe<User>;
  friend?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type FriendPayload = {
  __typename?: 'FriendPayload';
  user: User;
  added?: Maybe<Scalars['Boolean']>;
  deleted?: Maybe<Scalars['Int']>;
};

export type FriendSub = {
  __typename?: 'FriendSub';
  user?: Maybe<User>;
  action?: Maybe<FriendSubAction>;
};

export enum FriendSubAction {
  Added = 'ADDED',
  Updated = 'UPDATED',
  Deleted = 'DELETED'
}

export type Gallery = {
  __typename?: 'Gallery';
  id: Scalars['ID'];
  photoURL: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Membership = {
  __typename?: 'Membership';
  id: Scalars['ID'];
  channel?: Maybe<Channel>;
  user?: Maybe<User>;
  type?: Maybe<MemberType>;
  userAlert?: Maybe<Scalars['Boolean']>;
  userMode?: Maybe<UserModeType>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export enum MemberType {
  Owner = 'OWNER',
  Member = 'MEMBER'
}

export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  channel?: Maybe<Channel>;
  sender?: Maybe<User>;
  type?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  picture?: Maybe<Array<Maybe<Photo>>>;
  filePath?: Maybe<Scalars['String']>;
  replies?: Maybe<Array<Maybe<Reply>>>;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type MessagePayload = {
  __typename?: 'MessagePayload';
  channelId: Scalars['String'];
  message?: Maybe<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signInEmail: AuthPayload;
  signInWithSocialAccount: AuthPayload;
  signInWithFacebook: AuthPayload;
  signUp: AuthPayload;
  findPassword?: Maybe<Scalars['Boolean']>;
  sendVerification?: Maybe<Scalars['Boolean']>;
  addNotificationToken?: Maybe<Notification>;
  removeNotificationToken?: Maybe<Scalars['Int']>;
  updateProfile?: Maybe<User>;
  addFriend?: Maybe<FriendPayload>;
  deleteFriend?: Maybe<FriendPayload>;
  /** `friendIds` in Channel should exclude userid. */
  createChannel?: Maybe<Channel>;
  updateChannel?: Maybe<Scalars['Int']>;
  deleteChannel?: Maybe<Scalars['Int']>;
  /**
   * Create message and return channelId when meessage has successfully sent.
   * Do not pass current userId inside `users`.
   */
  createMessage?: Maybe<MessagePayload>;
  setOnlineStatus?: Maybe<Scalars['Int']>;
  changeEmailPassword?: Maybe<Scalars['Boolean']>;
  createGallery?: Maybe<Gallery>;
  updateGallery?: Maybe<Scalars['Int']>;
  deleteGallery?: Maybe<Scalars['Int']>;
  singleUpload: Scalars['String'];
  createReaction?: Maybe<Reaction>;
  deleteReaction?: Maybe<Scalars['Int']>;
};


export type MutationSignInEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInWithSocialAccountArgs = {
  socialUser: SocialUserInput;
};


export type MutationSignInWithFacebookArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignUpArgs = {
  user: UserInput;
};


export type MutationFindPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSendVerificationArgs = {
  email: Scalars['String'];
};


export type MutationAddNotificationTokenArgs = {
  notification: NotificationCreateInput;
};


export type MutationRemoveNotificationTokenArgs = {
  token: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  user: UserProfileInput;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['ID'];
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['ID'];
};


export type MutationCreateChannelArgs = {
  channel?: Maybe<ChannelInput>;
};


export type MutationUpdateChannelArgs = {
  channel?: Maybe<ChannelInput>;
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['ID'];
};


export type MutationCreateMessageArgs = {
  message: Scalars['String'];
  channelId: Scalars['String'];
};


export type MutationSetOnlineStatusArgs = {
  isOnline?: Maybe<Scalars['Boolean']>;
};


export type MutationChangeEmailPasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateGalleryArgs = {
  photoURL: Scalars['String'];
};


export type MutationUpdateGalleryArgs = {
  galleryId: Scalars['ID'];
  photoURL: Scalars['String'];
};


export type MutationDeleteGalleryArgs = {
  galleryId: Scalars['ID'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
  dir?: Maybe<Scalars['String']>;
};


export type MutationCreateReactionArgs = {
  messageId: Scalars['ID'];
  type: Scalars['String'];
};


export type MutationDeleteReactionArgs = {
  reactionId: Scalars['ID'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  token?: Maybe<Scalars['String']>;
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NotificationCreateInput = {
  token: Scalars['String'];
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['String'];
  thumbURL?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * If filter is true, it will filter user with email, nickname or name.
   * You can add pagination with first and after args.
   */
  users?: Maybe<UsersConnection>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  messages: Array<Message>;
  channels: Array<Channel>;
  friends: Array<User>;
  galleries: Array<Gallery>;
};


export type QueryUsersArgs = {
  user?: Maybe<UserQueryInput>;
  includeUser?: Maybe<Scalars['Boolean']>;
  filter?: Maybe<Scalars['Boolean']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryGalleriesArgs = {
  userId: Scalars['String'];
};

export type Reaction = {
  __typename?: 'Reaction';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type Reply = {
  __typename?: 'Reply';
  id: Scalars['String'];
  sender?: Maybe<User>;
  type?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  filePath?: Maybe<Scalars['String']>;
  replies?: Maybe<Array<Maybe<Reply>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type SocialUserInput = {
  socialId: Scalars['String'];
  authType: AuthType;
  email?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userSignedIn?: Maybe<User>;
  userUpdated?: Maybe<User>;
  friendChanged?: Maybe<FriendSub>;
};


export type SubscriptionUserSignedInArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionUserUpdatedArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionFriendChangedArgs = {
  userId: Scalars['ID'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  socialId?: Maybe<Scalars['String']>;
  authType?: Maybe<AuthType>;
  phone?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  statusMessage?: Maybe<Scalars['String']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  lastSignedIn?: Maybe<Scalars['DateTime']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  node?: Maybe<User>;
  cursor?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export enum UserModeType {
  Default = 'DEFAULT',
  Hidden = 'HIDDEN',
  Block = 'BLOCK'
}

export type UserProfileInput = {
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type UserQueryInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
};

/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  totalCount?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};
