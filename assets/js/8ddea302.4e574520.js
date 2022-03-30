(self.webpackChunkhackatalk_website=self.webpackChunkhackatalk_website||[]).push([[6546],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return s},kt:function(){return d}});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=o.createContext({}),l=function(e){var n=o.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=l(e.components);return o.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),m=l(t),d=r,f=m["".concat(p,".").concat(d)]||m[d]||u[d]||i;return t?o.createElement(f,a(a({ref:n},s),{},{components:t})):o.createElement(f,a({ref:n},s))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=m;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var l=2;l<i;l++)a[l]=t[l];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3919:function(e,n,t){"use strict";function o(e){return!0===/^(\w*:|\/\/)/.test(e)}function r(e){return void 0!==e&&!o(e)}t.d(n,{b:function(){return o},Z:function(){return r}})},4996:function(e,n,t){"use strict";t.d(n,{C:function(){return i},Z:function(){return a}});var o=t(2263),r=t(3919);function i(){var e=(0,o.Z)().siteConfig,n=(e=void 0===e?{}:e).baseUrl,t=void 0===n?"/":n,i=e.url;return{withBaseUrl:function(e,n){return function(e,n,t,o){var i=void 0===o?{}:o,a=i.forcePrependBaseUrl,c=void 0!==a&&a,p=i.absolute,l=void 0!==p&&p;if(!t)return t;if(t.startsWith("#"))return t;if((0,r.b)(t))return t;if(c)return n+t;var s=t.startsWith(n)?t:n+t.replace(/^\//,"");return l?e+s:s}(i,t,e,n)}}}function a(e,n){return void 0===n&&(n={}),(0,i().withBaseUrl)(e,n)}},9081:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return l},toc:function(){return s},default:function(){return m}});var o=t(2122),r=t(9756),i=(t(7294),t(3905)),a=t(4996),c={id:"components",title:"Components",sidebar_label:"Components"},p=void 0,l={unversionedId:"client/components",id:"client/components",isDocsHomePage:!1,title:"Components",description:"Creating components",source:"@site/docs/client/components.md",sourceDirName:"client",slug:"/client/components",permalink:"/docs/client/components",editUrl:"https://github.com/dooboolab/hackatalk/tree/main/website/docs/client/components.md",version:"current",frontMatter:{id:"components",title:"Components",sidebar_label:"Components"},sidebar:"docs",previous:{title:"Installation",permalink:"/docs/client/installation"},next:{title:"Integrate with backend",permalink:"/docs/client/integrate-with-backend"}},s=[{value:"Creating components",id:"creating-components",children:[{value:"Using dooboo-cli",id:"using-dooboo-cli",children:[]}]},{value:"Types",id:"types",children:[{value:"Navigation",id:"navigation",children:[]},{value:"Page",id:"page",children:[]},{value:"UI",id:"ui",children:[]}]}],u={toc:s};function m(e){var n=e.components,t=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,o.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"creating-components"},"Creating components"),(0,i.kt)("p",null,"To create additional components to ",(0,i.kt)("inlineCode",{parentName:"p"},"HackaTalk"),", you can easily run ",(0,i.kt)("inlineCode",{parentName:"p"},"dooboo page")," command. To do that you need to first install ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/dooboo-cli"},"dooboo-cli"),"."),(0,i.kt)("h3",{id:"using-dooboo-cli"},"Using ",(0,i.kt)("a",{parentName:"h3",href:"https://www.npmjs.com/package/dooboo-cli"},"dooboo-cli")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/dooboo-cli"},"dooboo-cli")," has been updated to ",(0,i.kt)("strong",{parentName:"p"},"version 3")," in Dec 2019. You can read about it in the ",(0,i.kt)("a",{parentName:"p",href:"https://medium.com/dooboolab/announcing-dooboo-cli-v3-5c9fceeb2ac4"},"medium post"),"."),(0,i.kt)("p",null,"However, we've migrated to ",(0,i.kt)("strong",{parentName:"p"},"version 6")," template which manages components into ",(0,i.kt)("inlineCode",{parentName:"p"},"navigations"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"pages"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"uis")," instead of ",(0,i.kt)("inlineCode",{parentName:"p"},"navigation"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"screen")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"ui"),"."),(0,i.kt)("img",{src:(0,a.Z)("img/dooboo-cli-5.png"),alt:"dooboo-cli-v5 sample commands"}),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"You can see how easily you can create sample screens and tests files.")),(0,i.kt)("h2",{id:"types"},"Types"),(0,i.kt)("p",null,"We are organizing our main components into three different characteristcs which are ",(0,i.kt)("inlineCode",{parentName:"p"},"navigation"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"page"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"ui"),"."),(0,i.kt)("h3",{id:"navigation"},"Navigation"),(0,i.kt)("p",null,"The navigation components are group of screen components. However, we recommend to nest navigation component inside the ",(0,i.kt)("inlineCode",{parentName:"p"},"page")," component if your have complex navigation structure."),(0,i.kt)("h4",{id:"for-exmaple"},"For exmaple"),(0,i.kt)("img",{src:(0,a.Z)("img/nested-navigation-structure.png"),alt:"dooboo-cli-v5 sample commands",width:"300"}),(0,i.kt)("p",null,"The above structure is easier to search for the component you are looking for if you have many nested navigations."),(0,i.kt)("h3",{id:"page"},"Page"),(0,i.kt)("p",null,"The page component is mostly a full-screen-sized component that has the size of the device's screen. Sometimes when there are ",(0,i.kt)("inlineCode",{parentName:"p"},"tabs"),", it may be a smaller unit. However, the page components will not include each other."),(0,i.kt)("h3",{id:"ui"},"UI"),(0,i.kt)("p",null,"The ui components are mostly reusable components which focus on UI layer. They are components like ",(0,i.kt)("inlineCode",{parentName:"p"},"Button"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"EditText"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Calendar")," and so on. Many page components reuse these components."))}m.isMDXComponent=!0}}]);