(self.webpackChunkhackatalk_website=self.webpackChunkhackatalk_website||[]).push([[5525],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return m},kt:function(){return u}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},m=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},h=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),h=p(t),u=a,b=h["".concat(s,".").concat(u)]||h[u]||c[u]||i;return t?r.createElement(b,o(o({ref:n},m),{},{components:t})):r.createElement(b,o({ref:n},m))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=h;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=t[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}h.displayName="MDXCreateElement"},9162:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return c}});var r=t(2122),a=t(9756),i=(t(7294),t(3905)),o={id:"membership",title:"Membership",sidebar_label:"Membership"},l=void 0,s={unversionedId:"server/membership",id:"server/membership",isDocsHomePage:!1,title:"Membership",description:"As described in Channel, Membership model is a single table inheritance. Only one member(user) in the channel will have the authorization to grant other user's permission to the Channel. This member will be referred to as the owner.",source:"@site/docs/server/membership.md",sourceDirName:"server",slug:"/server/membership",permalink:"/docs/server/membership",editUrl:"https://github.com/dooboolab/hackatalk/tree/main/website/docs/server/membership.md",version:"current",frontMatter:{id:"membership",title:"Membership",sidebar_label:"Membership"},sidebar:"docs",previous:{title:"Channel",permalink:"/docs/server/channel"},next:{title:"Message",permalink:"/docs/server/message"}},p=[{value:"Types of membership",id:"types-of-membership",children:[]}],m={toc:p};function c(e){var n=e.components,t=(0,a.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"As described in ",(0,i.kt)("a",{parentName:"p",href:"docs/server/channel"},"Channel"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Membership")," model is a ",(0,i.kt)("a",{parentName:"p",href:"https://medium.com/@User3141592/when-to-use-single-table-inheritance-vs-multiple-table-inheritance-db7e9733ae2e"},"single table inheritance"),". Only one member(user) in the channel will have the authorization to grant other user's permission to the ",(0,i.kt)("inlineCode",{parentName:"p"},"Channel"),". This member will be referred to as the ",(0,i.kt)("inlineCode",{parentName:"p"},"owner"),"."),(0,i.kt)("h2",{id:"types-of-membership"},"Types of membership"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Types of membership are defined in ",(0,i.kt)("inlineCode",{parentName:"p"},"MembershipType"),". Note that the ",(0,i.kt)("inlineCode",{parentName:"p"},"MembershipType")," is only considered when the channel is ",(0,i.kt)("strong",{parentName:"p"},"public"),". All users will have the same ",(0,i.kt)("inlineCode",{parentName:"p"},"membershipType")," when the channel is ",(0,i.kt)("strong",{parentName:"p"},"private"),".")),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"owner",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"owner")," of the ",(0,i.kt)("strong",{parentName:"li"},"channel")," can add or remove ",(0,i.kt)("inlineCode",{parentName:"li"},"admin")," users in the ",(0,i.kt)("strong",{parentName:"li"},"channel"),"."),(0,i.kt)("li",{parentName:"ul"},"If ",(0,i.kt)("inlineCode",{parentName:"li"},"owner")," wants to leave the ",(0,i.kt)("strong",{parentName:"li"},"public")," channel, he or she needs to transfer ownership to other users if the users are in the channel."),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"owner")," of the ",(0,i.kt)("strong",{parentName:"li"},"public")," channel can change the ",(0,i.kt)("strong",{parentName:"li"},"channel")," name."))),(0,i.kt)("li",{parentName:"ol"},"admin",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"admin")," user can add more users to the channel."))),(0,i.kt)("li",{parentName:"ol"},"member",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"The only thing member can do in the ",(0,i.kt)("strong",{parentName:"li"},"public")," channel is sending messages or leave the channel.")))))}c.isMDXComponent=!0}}]);