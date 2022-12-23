"use strict";(self.webpackChunkhackatalk_website=self.webpackChunkhackatalk_website||[]).push([[546],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return k}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=c(n),k=r,d=u["".concat(p,".").concat(k)]||u[k]||m[k]||o;return n?a.createElement(d,i(i({ref:t},s),{},{components:n})):a.createElement(d,i({ref:t},s))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3003:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return p},default:function(){return k},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return m}});var a=n(3117),r=n(102),o=(n(7294),n(3905)),i=["components"],l={id:"installation",title:"Installation",sidebar_label:"Installation"},p=void 0,c={unversionedId:"client/installation",id:"client/installation",title:"Installation",description:"Server installation",source:"@site/docs/client/installation.md",sourceDirName:"client",slug:"/client/installation",permalink:"/docs/client/installation",draft:!1,editUrl:"https://github.com/dooboolab/hackatalk/tree/main/website/docs/client/installation.md",tags:[],version:"current",frontMatter:{id:"installation",title:"Installation",sidebar_label:"Installation"},sidebar:"docs",previous:{title:"Overview",permalink:"/docs/client/overview"},next:{title:"Components",permalink:"/docs/client/components"}},s={},m=[{value:"Server installation",id:"server-installation",level:2},{value:"Using docker compose",id:"using-docker-compose",level:4},{value:"Client installation",id:"client-installation",level:2}],u={toc:m};function k(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"server-installation"},"Server installation"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Before going further steps ensure that you need to run your local ",(0,o.kt)("inlineCode",{parentName:"p"},"HackaTalk")," server. You can do that by following procedures in ",(0,o.kt)("a",{parentName:"p",href:"/docs/server/installation"},"server installation")," but you can also use our ",(0,o.kt)("inlineCode",{parentName:"p"},"dokcer-compose.yml")," file.")),(0,o.kt)("h4",{id:"using-docker-compose"},"Using docker compose"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Go to ",(0,o.kt)("inlineCode",{parentName:"li"},"/server")," directory."),(0,o.kt)("li",{parentName:"ol"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"docker compose up"),".")),(0,o.kt)("h2",{id:"client-installation"},"Client installation"),(0,o.kt)("p",null,"Client project belongs to separate directory ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/dooboolab/hackatalk/tree/main/client"},"client"),", in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/dooboolab/hackatalk"},"github"),"."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"You need to follow ",(0,o.kt)("a",{parentName:"strong",href:"https://reactnative.dev/docs/environment-setup"},"react-native environment setup")," and ",(0,o.kt)("a",{parentName:"strong",href:"https://docs.expo.io/get-started/installation"},"expo installation")," to continue further steps.")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Clone the sourcecode."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"git clone https://github.com/dooboolab/hackatalk.git\n")),(0,o.kt)("blockquote",{parentName:"li"},(0,o.kt)("p",{parentName:"blockquote"},"If you are willing to contribute to ",(0,o.kt)("inlineCode",{parentName:"p"},"HackaTalk")," then please follow the ",(0,o.kt)("a",{parentName:"p",href:"https://medium.com/dooboolab/quick-start-for-contributing-to-whatssub-with-forking-workflow-16c8c971adc5"},"git forking workflow")," procedure."))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Navigate to ",(0,o.kt)("inlineCode",{parentName:"p"},"/client")),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"cd client\n")),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Note that ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn.lock")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"package-lock.json")," sometimes make collision. Try to delete one of them."))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Copy the environment file."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"cp .env.sample .env\n")),(0,o.kt)("p",{parentName:"li"},"You may ignore ",(0,o.kt)("inlineCode",{parentName:"p"},"facebookAppId"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"googleWebClientId"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"googleAndroidClientId"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"googleIOSClientId")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"sentryAuthToken")," if you are not developing related features. Otherwise, you should create your own.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install packages. We recommend using ",(0,o.kt)("a",{parentName:"p",href:"https://classic.yarnpkg.com"},"yarn")," instead of ",(0,o.kt)("inlineCode",{parentName:"p"},"npm"),"."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"yarn\n")),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Note")," If you are using android emulator, you may have to change the ",(0,o.kt)("inlineCode",{parentName:"li"},"localhost")," address to your local ",(0,o.kt)("inlineCode",{parentName:"li"},"ip")," address. Ex) 192.0.0.6"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Create empty ",(0,o.kt)("inlineCode",{parentName:"p"},"google-services.json")," file."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"touch google-services.json\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Finally run ",(0,o.kt)("inlineCode",{parentName:"p"},"HackaTalk")," by running ",(0,o.kt)("inlineCode",{parentName:"p"},"yarn start"),"."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"yarn start\n")),(0,o.kt)("p",{parentName:"li"},"It will open up ",(0,o.kt)("a",{parentName:"p",href:"https://expo.io"},"expo")," console.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Running in ",(0,o.kt)("inlineCode",{parentName:"p"},"web")," environment."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre"},"yarn web\n")),(0,o.kt)("blockquote",{parentName:"li"},(0,o.kt)("p",{parentName:"blockquote"},"Above command will let you develop with ",(0,o.kt)("a",{parentName:"p",href:"https://javascript.plainenglish.io/react-fast-refresh-the-new-react-hot-reloader-652c6645548c"},"react fast refresh"),".")))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"vscode extentions")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Recommended ",(0,o.kt)("a",{parentName:"li",href:"https://gist.github.com/hyochan/815e9040593180c4725d7694d863e5a1#gistcomment-3019263"},"vscode extension list")," to help contributing.")))}k.isMDXComponent=!0}}]);