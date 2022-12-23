"use strict";(self.webpackChunkhackatalk_website=self.webpackChunkhackatalk_website||[]).push([[6572],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=i.createContext({}),p=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return i.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=p(n),m=a,h=c["".concat(l,".").concat(m)]||c[m]||d[m]||r;return n?i.createElement(h,o(o({ref:t},u),{},{components:n})):i.createElement(h,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<r;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}c.displayName="MDXCreateElement"},9918:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return d}});var i=n(3117),a=n(102),r=(n(7294),n(3905)),o=["components"],s={id:"authentication",title:"Authentication",sidebar_label:"Authentication"},l=void 0,p={unversionedId:"implementation/authentication",id:"implementation/authentication",title:"Authentication",description:"We mainly use json web token to verify our user. This is very efficient in handling multi-device(phone, tablet, pc) users.",source:"@site/docs/implementation/authentication.md",sourceDirName:"implementation",slug:"/implementation/authentication",permalink:"/docs/implementation/authentication",draft:!1,editUrl:"https://github.com/dooboolab/hackatalk/tree/main/website/docs/implementation/authentication.md",tags:[],version:"current",frontMatter:{id:"authentication",title:"Authentication",sidebar_label:"Authentication"},sidebar:"docs",previous:{title:"Design",permalink:"/docs/implementation/design"},next:{title:"Features",permalink:"/docs/implementation/features"}},u={},d=[{value:"Resolvers",id:"resolvers",level:2},{value:"Mutations",id:"mutations",level:3},{value:"Register user",id:"register-user",level:4},{value:"Sign in user",id:"sign-in-user",level:4},{value:"Verify email",id:"verify-email",level:4},{value:"Resetting password",id:"resetting-password",level:4},{value:"Change password",id:"change-password",level:4},{value:"Queries",id:"queries",level:3},{value:"Query user&#39;s own profile",id:"query-users-own-profile",level:4},{value:"Protecting our queries",id:"protecting-our-queries",level:3},{value:"Graphql Shield",id:"graphql-shield",level:4}],c={toc:d};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"We mainly use ",(0,r.kt)("a",{parentName:"p",href:"https://jwt.io"},"json web token")," to verify our user. This is very efficient in handling multi-device(phone, tablet, pc) users."),(0,r.kt)("h2",{id:"resolvers"},"Resolvers"),(0,r.kt)("h3",{id:"mutations"},"Mutations"),(0,r.kt)("p",null,"Below are the mutations you can find in our development server."),(0,r.kt)("h4",{id:"register-user"},"Register user"),(0,r.kt)("p",null,"You can use the ",(0,r.kt)("inlineCode",{parentName:"p"},"signUp")," mutation to register users to ",(0,r.kt)("inlineCode",{parentName:"p"},"HackaTalk")," and get user info. Note that the token is not delivered directly just by the ",(0,r.kt)("inlineCode",{parentName:"p"},"signUp")," mutation. Users need to ",(0,r.kt)("inlineCode",{parentName:"p"},"sign in")," in order to achieve the ",(0,r.kt)("inlineCode",{parentName:"p"},"jwt token"),"."),(0,r.kt)("h4",{id:"sign-in-user"},"Sign in user"),(0,r.kt)("p",null,"Users sign in into ",(0,r.kt)("inlineCode",{parentName:"p"},"HackaTalk")," and this returns ",(0,r.kt)("inlineCode",{parentName:"p"},"AuthPayload")," which we've defined. This returns a ",(0,r.kt)("inlineCode",{parentName:"p"},"user")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"token")," field. Put the ",(0,r.kt)("inlineCode",{parentName:"p"},"token")," into the ",(0,r.kt)("inlineCode",{parentName:"p"},"header")," as below so that the server knows the user is signed in. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'{\n   "authorization: "{returned_user_token}"\n}\n')),(0,r.kt)("p",null,"There are 2 types of ways to sign in."),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Sign in with email"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("inlineCode",{parentName:"p"},"signInEmail")," mutation lets users of ",(0,r.kt)("inlineCode",{parentName:"p"},"HackaTalk")," sign in with an ",(0,r.kt)("inlineCode",{parentName:"p"},"email")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"password"),". However, if the ",(0,r.kt)("inlineCode",{parentName:"p"},"user"),"'s email is not ",(0,r.kt)("inlineCode",{parentName:"p"},"verified"),", the client's app will direct users to their verify email. In this case, you should ",(0,r.kt)("a",{parentName:"p",href:"#verify-email"},"verify user's email"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Sign in with a social account"),(0,r.kt)("p",{parentName:"li"},"We provide a social account sign-in. We are currently supporting below."),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Facebook - ",(0,r.kt)("inlineCode",{parentName:"li"},"signInWithFacebook")),(0,r.kt)("li",{parentName:"ul"},"Apple - ",(0,r.kt)("inlineCode",{parentName:"li"},"signInWithApple")),(0,r.kt)("li",{parentName:"ul"},"Google - ",(0,r.kt)("inlineCode",{parentName:"li"},"signInWithGoogle"))),(0,r.kt)("blockquote",{parentName:"li"},(0,r.kt)("p",{parentName:"blockquote"},"We are not providing any ",(0,r.kt)("inlineCode",{parentName:"p"},"redirect")," url approach like in ",(0,r.kt)("a",{parentName:"p",href:"https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow"},"facebook login flow"),". Social authentication providers redirect the url after user's authentication completes. If we use this approach in ",(0,r.kt)("inlineCode",{parentName:"p"},"HackaTalk"),", we should have to open up a new browser for mobile applications. We don't like this workflow so instead , we will we require each client to receive a social provider's ",(0,r.kt)("inlineCode",{parentName:"p"},"access_token")," by themselves and then send a request to our server with that ",(0,r.kt)("inlineCode",{parentName:"p"},"access_token"),". Our ",(0,r.kt)("inlineCode",{parentName:"p"},"schema")," is designed as below.")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"signInWithFacebook(accessToken: String!): AuthPayload!\nsignInWithApple(accessToken: String!): AuthPayload!\nsignInWithGoogle(accessToken: String!): AuthPayload!\n")),(0,r.kt)("p",{parentName:"li"},"We used ",(0,r.kt)("a",{parentName:"p",href:"https://docs.expo.io/versions/latest/sdk/auth-session"},"expo-auth-session")," for ",(0,r.kt)("inlineCode",{parentName:"p"},"facebook")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"google")," sign in to support all platforms in one codebase. This has been provided by ",(0,r.kt)("a",{parentName:"p",href:"https://expo.io"},"expo")," by ",(0,r.kt)("a",{parentName:"p",href:"https://twitter.com/baconbrix/status/1256985914749759488"},"Evan Bacon in twitter"),". However, we still use ",(0,r.kt)("a",{parentName:"p",href:"https://docs.expo.io/versions/latest/sdk/apple-authentication"},"expo-apple-authentication")," for ",(0,r.kt)("inlineCode",{parentName:"p"},"apple")," because providing this on server-side makes hands dirty currently refered to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ananay/apple-auth"},"apple-auth"),"."),(0,r.kt)("p",{parentName:"li"},"Therefore we decide to provide Apple signin only in ",(0,r.kt)("inlineCode",{parentName:"p"},"iOS")," - ",(0,r.kt)("strong",{parentName:"p"},"AUG-02-2020"),"."))),(0,r.kt)("h4",{id:"verify-email"},"Verify email"),(0,r.kt)("p",null,"   We are verifying user's email with the ",(0,r.kt)("inlineCode",{parentName:"p"},"sendVerification")," mutation. By using this mutation query, we'll send our email to customer via ",(0,r.kt)("a",{parentName:"p",href:"https://sendgrid.com"},"SendGrid")," api. We are not using ",(0,r.kt)("inlineCode",{parentName:"p"},"gmail")," in this case since it has limitations."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"sendVerification(email: String!): Boolean!\n")),(0,r.kt)("h4",{id:"resetting-password"},"Resetting password"),(0,r.kt)("p",null,"   Users may not remember his or her password. In this case, we will provide a query to reset their password via the link sent to user's email address."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"findPassword(email: String!): Boolean!\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"We wish to omit multiple requests from the same client. Maybe max 3 times per minutes would be good first step.")),(0,r.kt)("h4",{id:"change-password"},"Change password"),(0,r.kt)("p",null,"   Users can change their password only if the user is signed in. This should be done somewhere in client's user profile page."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"changeEmailPassword(password: String!, newPassword: String!): Boolean!\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Note that our queries are protected by ",(0,r.kt)("a",{parentName:"p",href:"#graphql-shield"},"graphql-shield")," which we use as a middleware.")),(0,r.kt)("h3",{id:"queries"},"Queries"),(0,r.kt)("h4",{id:"query-users-own-profile"},"Query user's own profile"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-graphql"},"me: User!\n")),(0,r.kt)("p",null,"   ",(0,r.kt)("inlineCode",{parentName:"p"},"me")," query is used mostly for ",(0,r.kt)("inlineCode",{parentName:"p"},"authentication")," like when the user is signed in after app finishes loading. If the correct user's ",(0,r.kt)("a",{parentName:"p",href:"https://jwt.io"},"jwt token")," is not provided, it will return an error and the ",(0,r.kt)("inlineCode",{parentName:"p"},"client's")," request will fail. This is how the client knows that the user is signed in. Therefore, this query does not need any extra input arguments."),(0,r.kt)("h3",{id:"protecting-our-queries"},"Protecting our queries"),(0,r.kt)("h4",{id:"graphql-shield"},"Graphql Shield"),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/maticzav/graphql-shield"},"graphql-shield")," is wonderful permission management library which can be used in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/prisma-labs/graphql-middleware"},"graphql-middlewares"),"."),(0,r.kt)("p",null,"This is somewhat similar to ",(0,r.kt)("a",{parentName:"p",href:"https://firebase.google.com/docs/rules"},"firebase security rules")," in some sense that it protects queries logically. This is defined in ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dooboolab/hackatalk/blob/main/server/src/permissions/index.ts"},"permissions/index.ts")," file in our ",(0,r.kt)("inlineCode",{parentName:"p"},"server"),"."))}m.isMDXComponent=!0}}]);