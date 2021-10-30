import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
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

export type BlockedUser = {
  __typename?: 'BlockedUser';
  blockedUser?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type Channel = {
  __typename?: 'Channel';
  channelType?: Maybe<Scalars['ChannelType']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  /** Get latest message sent to the channel. */
  lastMessage?: Maybe<Message>;
  lastMessageId?: Maybe<Scalars['String']>;
  /** Get memberships assigned to channel. If excludeMe is set, it will not return authenticated user. */
  memberships?: Maybe<Array<Membership>>;
  messages?: Maybe<MessageConnection>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type ChannelMembershipsArgs = {
  excludeMe?: Maybe<Scalars['Boolean']>;
};


export type ChannelMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ChannelConnection = {
  __typename?: 'ChannelConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<ChannelEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type ChannelCreateInput = {
  channelType?: Maybe<Scalars['ChannelType']>;
  name?: Maybe<Scalars['String']>;
  userIds?: Maybe<Array<Scalars['String']>>;
};

export type ChannelEdge = {
  __typename?: 'ChannelEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Channel>;
};

export type Friend = {
  __typename?: 'Friend';
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  friend?: Maybe<User>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type Membership = {
  __typename?: 'Membership';
  alertMode?: Maybe<Scalars['AlertMode']>;
  channel?: Maybe<Channel>;
  createdAt?: Maybe<Scalars['DateTime']>;
  isVisible?: Maybe<Scalars['Boolean']>;
  membershipType?: Maybe<Scalars['MembershipType']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  channel?: Maybe<Channel>;
  channelId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  fileUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  imageUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  messageType: Scalars['MessageType'];
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  replies?: Maybe<Array<Maybe<Reply>>>;
  sender?: Maybe<User>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<MessageEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type MessageCreateInput = {
  fileUrls?: Maybe<Array<Scalars['String']>>;
  imageUrls?: Maybe<Array<Scalars['String']>>;
  messageType?: Maybe<Scalars['MessageType']>;
  text?: Maybe<Scalars['String']>;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend?: Maybe<Friend>;
  changeEmailPassword?: Maybe<Scalars['Boolean']>;
  createBlockedUser?: Maybe<BlockedUser>;
  /**
   * Creates channel of [ChannelType].
   *   The private channel is unique by the unique members while
   *   the public channel can be created by each request.
   *   The public channel is something like an open chat while
   *   private channel is all kinds of direct messages.
   *   The [Membership] of private channel will be identical to all users which is (member).
   *
   *   <Optional> The channel can be created with message of [MessageType].
   *   Please becareful when creating message and provide proper [MessageType].
   *   This query will return [Channel] with [Membership] without [Message] that has just created.
   */
  createChannel?: Maybe<Channel>;
  createMessage?: Maybe<Message>;
  createNotification?: Maybe<Notification>;
  createReport?: Maybe<Report>;
  deleteBlockedUser?: Maybe<BlockedUser>;
  deleteFriend?: Maybe<Friend>;
  deleteMessage?: Maybe<Message>;
  deleteNotification?: Maybe<Notification>;
  /** Find or create channel associated to peer user id. */
  findOrCreatePrivateChannel?: Maybe<Channel>;
  findPassword: Scalars['Boolean'];
  /** Adds some users into [public] channel. */
  inviteUsersToChannel?: Maybe<Channel>;
  /** Removes some users from [public] channel. */
  kickUsersFromChannel?: Maybe<Channel>;
  /**
   * User leaves [public] channel.
   *   Users cannot leave the [private] channel
   *   and rather this is going to be invisible in [Membership].
   *   This will reset to true when new [Message] is created to channel.
   *   User will leave the [public] channel and membership will be removed.
   */
  leaveChannel?: Maybe<Membership>;
  sendVerification: Scalars['Boolean'];
  signInEmail: AuthPayload;
  signInWithApple: AuthPayload;
  signInWithFacebook: AuthPayload;
  signInWithGoogle: AuthPayload;
  signUp: User;
  singleUpload: Scalars['String'];
  /** Update user profile. Becareful that nullable fields will be updated either. */
  updateProfile?: Maybe<User>;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationChangeEmailPasswordArgs = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateBlockedUserArgs = {
  blockedUserId: Scalars['String'];
};


export type MutationCreateChannelArgs = {
  channel: ChannelCreateInput;
  message?: Maybe<MessageCreateInput>;
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['String'];
  deviceKey: Scalars['String'];
  message: MessageCreateInput;
};


export type MutationCreateNotificationArgs = {
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};


export type MutationCreateReportArgs = {
  report: Scalars['String'];
  reportedUserId: Scalars['String'];
};


export type MutationDeleteBlockedUserArgs = {
  blockedUserId: Scalars['String'];
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String'];
};


export type MutationDeleteNotificationArgs = {
  token: Scalars['String'];
};


export type MutationFindOrCreatePrivateChannelArgs = {
  peerUserIds: Array<Scalars['String']>;
};


export type MutationFindPasswordArgs = {
  email: Scalars['String'];
};


export type MutationInviteUsersToChannelArgs = {
  channelId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};


export type MutationKickUsersFromChannelArgs = {
  channelId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};


export type MutationLeaveChannelArgs = {
  channelId: Scalars['String'];
};


export type MutationSendVerificationArgs = {
  email: Scalars['String'];
};


export type MutationSignInEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInWithAppleArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignInWithFacebookArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignInWithGoogleArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignUpArgs = {
  photoUpload?: Maybe<Scalars['Upload']>;
  user: UserCreateInput;
};


export type MutationSingleUploadArgs = {
  dir?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
};


export type MutationUpdateProfileArgs = {
  user: UserUpdateInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt?: Maybe<Scalars['DateTime']>;
  device?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  os?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  authType?: Maybe<Scalars['Auth']>;
  socialId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  /** Arguments are not needed. Only find blocked users of signed in user */
  blockedUsers?: Maybe<Array<Maybe<User>>>;
  /** Get single channel */
  channel?: Maybe<Channel>;
  channels?: Maybe<ChannelConnection>;
  friends?: Maybe<UserConnection>;
  /** Fetch current user profile when authenticated. */
  me?: Maybe<User>;
  /** Get single message */
  message?: Maybe<Message>;
  messages?: Maybe<MessageConnection>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  reports?: Maybe<Array<Maybe<Report>>>;
  /** Fetch user profile */
  user?: Maybe<User>;
  /** Query users with relay pagination. This is filterable but it will not return user itself and the blocked users. */
  users?: Maybe<UserConnection>;
};


export type QueryChannelArgs = {
  channelId: Scalars['String'];
};


export type QueryChannelsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  withMessage?: Maybe<Scalars['Boolean']>;
};


export type QueryFriendsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  includeMe?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  searchText?: Maybe<Scalars['String']>;
};


export type QueryMessageArgs = {
  id: Scalars['String'];
};


export type QueryMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  channelId: Scalars['String'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  searchText?: Maybe<Scalars['String']>;
};


export type QueryNotificationsArgs = {
  userId: Scalars['String'];
};


export type QueryReportsArgs = {
  userId: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  searchText?: Maybe<Scalars['String']>;
};

export type Reaction = {
  __typename?: 'Reaction';
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  fileUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  imageUrls?: Maybe<Array<Maybe<Scalars['String']>>>;
  messageType: Scalars['MessageType'];
  sender: User;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Report = {
  __typename?: 'Report';
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  report: Scalars['String'];
  reportedUser?: Maybe<User>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  deleteMessage?: Maybe<Message>;
  onMessage?: Maybe<Message>;
  userSignedIn?: Maybe<User>;
  userUpdated?: Maybe<User>;
};


export type SubscriptionDeleteMessageArgs = {
  channelId: Scalars['String'];
};


export type SubscriptionOnMessageArgs = {
  deviceKey: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  birthday?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Gender']>;
  /** Check if the user is blocked by the user who have signed in. */
  hasBlocked?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  /** This user is a friend of the authenticated user. */
  isFriend?: Maybe<Scalars['Boolean']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  lastSignedIn?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  phone?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  statusMessage?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type UserCreateInput = {
  birthday?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['Gender']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<User>;
};

export type UserUpdateInput = {
  birthday?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Gender']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
};
