---
id: authentication
title: 인증
sidebar_label: 인증
---


해커톡에서는 [json web token](https://jwt.io)을 사용하여 사용자들을 인증합니다. 이는 여러 기기(스마트폰, 태블릿, PC)를 지원하는 멀티 디바이스 플랫폼인만큼 세션 변수를 관리해야하는 서버의 부담을 줄여주기 위함입니다.

## Resolvers

### Mutations

다음은 서버코드에서 확인할 수 있는 `mutation` 쿼리입니다.

#### 회원가입
`signUp` mutation 쿼리를 사용하여`HackaTalk`에서 사용자를 등록하고 정보를 획득할 수 있습니다. `Access Token`은 `signUp` 쿼리로 반환되지는 않습니다. 사용자는`토큰`을 획득하기 위해 `login` 쿼리를 호출해야 합니다.

#### 로그인
사용자가 `HackaTalk`에 로그인하면 `AuthPayload`가 반환됩니다. 이것은 `user` 및 `token` 필드를 가지고 있습니다. 서버에서 사용자가 로그인되었음을 알 수 있도록 아래와 같이`header`에`token`을 넣습니다.

```
{
   "authorization: "{returned_user_token}"
}
```

로그인은 두가지 방법으로 할 수 있습니다.

1. 이메일로 로그인

   `signInEmail` 쿼리를 사용하면 사용자가 `email`과 `password`로 로그인 할 수 있습니다. 그러나 사용자의 이메일이 `검증`되지 않은 경우 클라이언트에서 사용자를 이메일 검증 화면으로 안내합니다. 이 경우 [사용자 이메일 주소 검증](# verify-email)을 진행해야 합니다.

2. 소셜 계정으로 로그인

   해커톡에서는 아래의 소셜 계정 로그인을 제공합니다.

   * 페이스북 - `signInWithFacebook`
   * 애플 - `signInWithApple`
   * 구글 - `signInWithGoogle`

   > [facebook 로그인 플로우](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow)와 같은 URL `redirect` 접근 방식은 제공하고 있지 않습니다. 소셜 인증 공급자는 사용자 인증이 완료된 후 URL을 리디렉션합니다. 'HackaTalk'에서이 접근 방식을 사용한다면 모바일 애플리케이션 용 새 브라우저를 열어야합니다. 우리는이 워크 플로를 좋아하지 않으므로 대신 각 클라이언트가 소셜 공급자의 'access_token'을 직접 수신 한 다음 해당 'access_token'을 사용하여 서버에 요청을 보내야합니다. 우리의 '스키마'는 다음과 같이 설계되었습니다.

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