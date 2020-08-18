export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AlertMode: any;
  Auth: any;
  ChannelType: any;
  /**
   * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
   */
  Date: any;
  DateTime: any;
  Gender: any;
  MembershipType: any;
  MessageType: any;
  /** The `Upload` scalar type represents a file upload. */
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
  id: Scalars['String'];
  channelType: Scalars['ChannelType'];
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** Get latest message sent to the channel. */
  lastMessage?: Maybe<Message>;
  messages: MessageConnection;
  /** Get memberships assigned to channel. */
  memberships?: Maybe<Array<Membership>>;
};


export type ChannelMessagesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type ChannelCreateInput = {
  channelType?: Maybe<Scalars['ChannelType']>;
  name?: Maybe<Scalars['String']>;
  userIds?: Maybe<Array<Scalars['String']>>;
};




export type Friend = {
  __typename?: 'Friend';
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  friend?: Maybe<User>;
};


export type Membership = {
  __typename?: 'Membership';
  alertMode?: Maybe<Scalars['AlertMode']>;
  membershipType?: Maybe<Scalars['MembershipType']>;
  isVisible: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  channel?: Maybe<Channel>;
};


export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  messageType: Scalars['MessageType'];
  text?: Maybe<Scalars['String']>;
  imageUrls: Array<Scalars['String']>;
  fileUrls: Array<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  channel?: Maybe<Channel>;
  sender?: Maybe<User>;
  replies?: Maybe<Array<Reply>>;
  reactions?: Maybe<Array<Reaction>>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<MessageEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type MessageCreateInput = {
  messageType?: Maybe<Scalars['MessageType']>;
  text?: Maybe<Scalars['String']>;
  imageUrls?: Maybe<Array<Scalars['String']>>;
  fileUrls?: Maybe<Array<Scalars['String']>>;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Message;
};


export type Mutation = {
  __typename?: 'Mutation';
  signUp: User;
  signInEmail: AuthPayload;
  signInWithFacebook: AuthPayload;
  signInWithApple: AuthPayload;
  signInWithGoogle: AuthPayload;
  sendVerification: Scalars['Boolean'];
  updateProfile: User;
  findPassword: Scalars['Boolean'];
  changeEmailPassword: Scalars['Boolean'];
  createNotification: Notification;
  deleteNotification?: Maybe<Notification>;
  singleUpload?: Maybe<Scalars['String']>;
  addFriend: Friend;
  deleteFriend: Friend;
  /**
   * Creates channel of [ChannelType].
   *   The private channel is unique by the unique members while
   *   the public channel can be created by each request.
   *   The public channel is something like an open chat while
   *   private channel is all kinds of direct messages.
   * 
   *   The [Membership] of private channel will be identical to all users which is (member).
   *   
   *   <Optional> The channel can be created with message of [MessageType].
   *   Please becareful when creating message and provide proper [MessageType].
   *   This query will return [Channel] with [Membership] without [Message] that has just created.
   */
  createChannel: Channel;
  /**
   * User leaves [public] channel.
   *   Users cannot leave the [private] channel
   *   and rather this is going to be invisible in [Membership].
   *   This will reset to true when new [Message] is created to channel.
   *   User will leave the [public] channel and membership will be removed.
   */
  leaveChannel: Membership;
};


export type MutationSignUpArgs = {
  user?: Maybe<UserCreateInput>;
};


export type MutationSignInEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInWithFacebookArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignInWithAppleArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignInWithGoogleArgs = {
  accessToken: Scalars['String'];
};


export type MutationSendVerificationArgs = {
  email: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  user?: Maybe<UserUpdateInput>;
};


export type MutationFindPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangeEmailPasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateNotificationArgs = {
  token: Scalars['String'];
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['Int'];
};


export type MutationSingleUploadArgs = {
  file?: Maybe<Scalars['Upload']>;
  dir?: Maybe<Scalars['String']>;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  channel?: Maybe<ChannelCreateInput>;
  message?: Maybe<MessageCreateInput>;
};


export type MutationLeaveChannelArgs = {
  channelId: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['Int'];
  token: Scalars['String'];
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  user: User;
  createdAt?: Maybe<Scalars['DateTime']>;
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  socialId?: Maybe<Scalars['String']>;
  authType?: Maybe<AuthType>;
};

export type Query = {
  __typename?: 'Query';
  users: UserConnection;
  me: User;
  notifications?: Maybe<Array<Notification>>;
  /** Get single channel */
  channel: Channel;
  /** Get all channels which auth user has joined */
  myChannels?: Maybe<Array<Channel>>;
};


export type QueryUsersArgs = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryNotificationsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryChannelArgs = {
  channelId?: Maybe<Scalars['String']>;
};

export type Reaction = {
  __typename?: 'Reaction';
  id: Scalars['Int'];
  value: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  id: Scalars['Int'];
  messageType: Scalars['MessageType'];
  text?: Maybe<Scalars['String']>;
  imageUrls: Array<Scalars['String']>;
  fileUrls: Array<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  sender?: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userSignedIn: User;
  userUpdated: User;
};


export type SubscriptionUserSignedInArgs = {
  userId: Scalars['String'];
};


export type SubscriptionUserUpdatedArgs = {
  userId: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Scalars['Gender']>;
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  lastSignedIn?: Maybe<Scalars['DateTime']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  profile?: Maybe<Profile>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  notifications?: Maybe<Array<Notification>>;
  friends?: Maybe<Array<User>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['Gender']>;
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: User;
};

export type UserUpdateInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Gender']>;
};
