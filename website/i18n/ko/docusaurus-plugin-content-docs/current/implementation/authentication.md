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

   `signInEmail` 쿼리를 사용하면 사용자가 `email`과 `password`로 로그인 할 수 있습니다. 그러나 사용자의 이메일이 `인증`되지 않은 경우 클라이언트에서 사용자를 이메일 인증 화면으로 안내합니다. 이 경우 [사용자 이메일 주소 인증](# verify-email)을 진행해야 합니다.

2. 소셜 계정으로 로그인

   해커톡에서는 아래의 소셜 계정 로그인을 제공합니다.

   * 페이스북 - `signInWithFacebook`
   * 애플 - `signInWithApple`
   * 구글 - `signInWithGoogle`

   > 현재 [facebook 로그인 플로우](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow)와 같은 URL `redirect` 접근 방식은 제공하고 있지 않습니다. 위 접근 방식은 소셜 인증 공급자가 사용자 인증이 완료된 후 요청을 처리할 URL로 `redirect` 하는 것 입니다. 해커톡에서 해당 접근 방식을 사용한다면 앱에서 새 브라우저를 열고 응답을 처리해야 합니다. 해당 `workflow`는 사용자의 경험을 해치기 때문에 앱에서 `access_token`을 직접 소셜 인증 공급자로부터 받아낸 다음 해커톡 서버로 인증 요청을 보내는 방식으로 소셜 인증을 처리하고 있습니다. 관련 `schema`는 다음과 같이 설계되었습니다.

   ```graphql
   signInWithFacebook(accessToken: String!): AuthPayload!
   signInWithApple(accessToken: String!): AuthPayload!
   signInWithGoogle(accessToken: String!): AuthPayload!
   ```

   해커톡에서는 [expo-auth-session](https://docs.expo.io/versions/latest/sdk/auth-session)을 사용하여 페이스북과 구글 회원가입을 하나의 코드베이스에서 지원하고 있습니다. 이 방법은 [expo](https://expo.io) 개발자 [Evan Bacon의 트위터](https://twitter.com/baconbrix/status/1256985914749759488)에 소개되었습니다. 하지만 애플 회원가입은 아직 [expo-apple-authentication](https://docs.expo.io/versions/latest/sdk/apple-authentication)을 사용하고 있습니다. [apple-auth](https://github.com/ananay/apple-auth)에서 확인할 수 있듯이 서버에서 이를 구현하기 위해 지져분한 구현물이 창작될 수 있습니다.

   따라서 애플 회원가입은 `iOS`에서만 우선적으로 지원하기로 했습니다. - **2020년 8월 2일**.

#### 이메일 인증

   이메일 인증은 `sendVerification` 쿼리를 이용하여 진행합니다. 해당 `mutation` 쿼리를 이용하면 [SendGrid](https://sendgrid.com) `api`를 사용하여 서버에서 메일을 보냅니다. `Gmail` 등의 메일 서비스를 바로 사용하여 메일을 전송하는 것은 많은 제약사항이 있기 때문에 올바른 이메일 서비스 프로바이더를 사용해야 합니다.

   ```graphql
   sendVerification(email: String!): Boolean!
   ```

#### 비밀번호 초기화

가끔 사용자들은 그들의 비밀번호를 기억하지 못할 수 있습니다. 이런 상황을 해소해주기 위해 아래와 같은 쿼리를 제공합니다. 아래 쿼리를 이용하여 사용자의 이메일 주소로 비밀번호 초기화 링크를 보냅니다.

```graphql
findPassword(email: String!): Boolean!
```

> 보완 요소
  - 동일한 사용자의 너무 많은 요청을 카운트하여 일정 시간 동안 요청을 제한하는 방법이 제공하는 것이 좋아 보입니다.

#### 비밀번호 변경

   사용자들은 그들의 비밀번호를 로그인이 되어 있는 경우에만 바꿀 수 있습니다. 앱에서는 설정화면에서 이메일로 가입을 한 경우에만 바꿀 수 있습니다. 소셜 계정으로 가입한 유저들에게도 별도 비밀번호를 설정할 수 있도록 제공할 예정입니다. - **2021년 6월 25일**.

   ```graphql
   changeEmailPassword(password: String!, newPassword: String!): Boolean!
   ```

   > 쿼리들은 [graphql-shield](#graphql-shield)를 통해 보호되고 있습니다. 서버에서 이를 graphql 미들웨어로 쓰고 있습니다.

### Queries

#### 사용자 프로필 조회

```graphql
me: User!
```

`me` 쿼리는 사용자의 인증 상태를 확인하기 위해 주로 활용됩니다. 예를 들어 앱을 처음 실행했을 때 로딩 화면이 끝나면 인증이 된 상태와 인증이 안 된 상태를 구분해야 합니다. 만약 사용자의 [jwt token](https://jwt.io)이 만료되었거나 제공되지 않는다면 `me` 쿼리는 `error`를 반환할 것이고 `request`는 `fail`이 날 것입니다. 이렇게 앱에서는 사용자의 인증 여부를 확인할 수 있습니다. 따라서 해당 쿼리는 어떠한 파라미터도 요구되지 않습니다.

### Query 보호하기

#### Graphql Shield

앞서 언급한 [graphql-shield](https://github.com/maticzav/graphql-shield)는 [graphql-middlewares](https://github.com/prisma-labs/graphql-middleware)에서 사용할 수 있는 유능한 권한 관리 라이브러리입니다.

혹시라도 여러분이 [firebase security rules](https://firebase.google.com/docs/rules)를 작성해보셨다면 라이브러리의 역할을 더욱 편하게 이해할 수 있을 것입니다. 쿼리에 권한 규칙을 작성할 수 있는데 이는 [server/permissions](https://github.com/dooboolab/hackatalk/blob/master/server/src/permissions)에 디렉토리에 안에서 작성되고 있습니다.
