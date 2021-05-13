---
id: authentication
title: Authentication
sidebar_label: Authentication
---

We mainly use [json web token](https://jwt.io) to verify our user. This is very efficient in handling multi-device(phone, tablet, pc) users.

## Resolvers

### Mutations

Below are the mutations you can find in our development server.

#### Register user
You can use the `signUp` mutation to register users to `HackaTalk` and get user info. Note that the token is not delivered directly just by the `signUp` mutation. Users need to `sign in` in order to achieve the `jwt token`.

#### Sign in user
Users sign in into `HackaTalk` and this returns `AuthPayload` which we've defined. This returns a `user` and `token` field. Put the `token` into the `header` as below so that the server knows the user is signed in. 
```
{
   "authorization: "{returned_user_token}"
}
```

There are 2 types of ways to sign in.

1. Sign in with email

   `signInEmail` mutation lets users of `HackaTalk` sign in with an `email` and `password`. However, if the `user`'s email is not `verified`, the client's app will direct users to their verify email. In this case, you should [verify user's email](#verify-email).

2. Sign in with a social account

   We provide a social account sign-in. We are currently supporting below.

   * Facebook - `signInWithFacebook`
   * Apple - `signInWithApple`
   * Google - `signInWithGoogle`

   > We are not providing any `redirect` url approach like in [facebook login flow](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow). Social authentication providers redirect the url after user's authentication completes. If we use this approach in `HackaTalk`, we should have to open up a new browser for mobile applications. We don't like this workflow so instead , we will we require each client to receive a social provider's `access_token` by themselves and then send a request to our server with that `access_token`. Our `schema` is designed as below.

   ```graphql
   signInWithFacebook(accessToken: String!): AuthPayload!
   signInWithApple(accessToken: String!): AuthPayload!
   signInWithGoogle(accessToken: String!): AuthPayload!
   ```

   We used [expo-auth-session](https://docs.expo.io/versions/latest/sdk/auth-session) for `facebook` and `google` sign in to support all platforms in one codebase. This has been provided by [expo](https://expo.io) by [Evan Bacon in twitter](https://twitter.com/baconbrix/status/1256985914749759488). However, we still use [expo-apple-authentication](https://docs.expo.io/versions/latest/sdk/apple-authentication) for `apple` because providing this on server-side makes hands dirty currently refered to [apple-auth](https://github.com/ananay/apple-auth). Therefore we decide to provide Apple signin only in `iOS` (AUG-02-2020).

#### Verify email

   We are verifying user's email with the `sendVerification` mutation. By using this mutation query, we'll send our email to customer via [SendGrid](https://sendgrid.com) api. We are not using `gmail` in this case since it has limitations.

   ```graphql
   sendVerification(email: String!): Boolean!
   ```

#### Resetting password

   Users may not remember his or her password. In this case, we will provide a query to reset their password via the link sent to user's email address.

   ```graphql
   findPassword(email: String!): Boolean!
   ```

   * We wish to omit multiple requests from the same client. Maybe max 3 times per minutes would be good first step.

#### Change password

   Users can change their password only if the user is signed in. This should be done somewhere in client's user profile page.

   ```graphql
   changeEmailPassword(password: String!, newPassword: String!): Boolean!
   ```

   > Note that our queries are protected by [graphql-shield](#graphql-shield) which we use as a middleware.

### Queries

#### Query user's own profile

   ```graphql
   me: User!
   ```

   `me` query is used mostly for `authentication` like when the user is signed in after app finishes loading. If the correct user's [jwt token](https://jwt.io) is not provided, it will return an error and the `client's` request will fail. This is how the client knows that the user is signed in. Therefore, this query does not need any extra input arguments.

### Protecting our queries

#### Graphql Shield

The [graphql-shield](https://github.com/maticzav/graphql-shield) is wonderful permission management library which can be used in [graphql-middlewares](https://github.com/prisma-labs/graphql-middleware).

This is somewhat similar to [firebase security rules](https://firebase.google.com/docs/rules) in some sense that it protects queries logically. This is defined in [permissions/index.ts](https://github.com/dooboolab/hackatalk/blob/master/server/src/permissions/index.ts) file in our `server`.