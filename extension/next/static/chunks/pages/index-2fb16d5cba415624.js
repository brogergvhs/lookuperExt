(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(3678)}])},8418:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],c=!0,i=!1;try{for(r=r.call(e);!(c=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);c=!0);}catch(l){i=!0,o=l}finally{try{c||null==r.return||r.return()}finally{if(i)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}t.default=void 0;var a,c=(a=r(7294))&&a.__esModule?a:{default:a},i=r(6273),l=r(387),s=r(7190);var u={};function f(e,t,r,n){if(e&&i.isLocalURL(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;u[t+"%"+r+(o?"%"+o:"")]=!0}}var d=function(e){var t,r=!1!==e.prefetch,n=l.useRouter(),a=c.default.useMemo((function(){var t=o(i.resolveHref(n,e.href,!0),2),r=t[0],a=t[1];return{href:r,as:e.as?i.resolveHref(n,e.as):a||r}}),[n,e.href,e.as]),d=a.href,p=a.as,h=e.children,m=e.replace,v=e.shallow,y=e.scroll,_=e.locale;"string"===typeof h&&(h=c.default.createElement("a",null,h));var x=(t=c.default.Children.only(h))&&"object"===typeof t&&t.ref,g=o(s.useIntersection({rootMargin:"200px"}),2),j=g[0],b=g[1],w=c.default.useCallback((function(e){j(e),x&&("function"===typeof x?x(e):"object"===typeof x&&(x.current=e))}),[x,j]);c.default.useEffect((function(){var e=b&&r&&i.isLocalURL(d),t="undefined"!==typeof _?_:n&&n.locale,o=u[d+"%"+p+(t?"%"+t:"")];e&&!o&&f(n,d,p,{locale:t})}),[p,d,b,_,r,n]);var N={ref:w,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,a,c,l){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&i.isLocalURL(r))&&(e.preventDefault(),null==c&&n.indexOf("#")>=0&&(c=!1),t[o?"replace":"push"](r,n,{shallow:a,locale:l,scroll:c}))}(e,n,d,p,m,v,y,_)},onMouseEnter:function(e){t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),i.isLocalURL(d)&&f(n,d,p,{priority:!0})}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var L="undefined"!==typeof _?_:n&&n.locale,E=n&&n.isLocaleDomain&&i.getDomainLocale(p,L,n&&n.locales,n&&n.domainLocales);N.href=E||i.addBasePath(i.addLocale(p,L,n&&n.defaultLocale))}return c.default.cloneElement(t,N)};t.default=d},7190:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],c=!0,i=!1;try{for(r=r.call(e);!(c=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);c=!0);}catch(l){i=!0,o=l}finally{try{c||null==r.return||r.return()}finally{if(i)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,r=e.disabled||!i,n=a.useRef(),s=o(a.useState(!1),2),u=s[0],f=s[1],d=a.useCallback((function(e){n.current&&(n.current(),n.current=void 0),r||u||e&&e.tagName&&(n.current=function(e,t,r){var n=function(e){var t=e.rootMargin||"",r=l.get(t);if(r)return r;var n=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return l.set(t,r={id:t,observer:o,elements:n}),r}(r),o=n.id,a=n.observer,c=n.elements;return c.set(e,t),a.observe(e),function(){c.delete(e),a.unobserve(e),0===c.size&&(a.disconnect(),l.delete(o))}}(e,(function(e){return e&&f(e)}),{rootMargin:t}))}),[r,t,u]);return a.useEffect((function(){if(!i&&!u){var e=c.requestIdleCallback((function(){return f(!0)}));return function(){return c.cancelIdleCallback(e)}}}),[u]),[d,u]};var a=r(7294),c=r(9311),i="undefined"!==typeof IntersectionObserver;var l=new Map},3678:function(e,t,r){"use strict";r.r(t);var n=r(5893),o=r(214),a=r.n(o),c=r(1664);t.default=function(){return(0,n.jsxs)("div",{className:a().container,children:[(0,n.jsxs)("main",{className:a().main,children:[(0,n.jsxs)("h1",{className:a().title,children:["Welcome to ",(0,n.jsx)("a",{href:"https://nextjs.org",children:"Next.js!"})]}),(0,n.jsx)(c.default,{href:"/second",children:"New page"}),(0,n.jsxs)("p",{className:a().description,children:["Get started by editing"," ",(0,n.jsx)("code",{className:a().code,children:"pages/index.js"})]}),(0,n.jsxs)("div",{className:a().grid,children:[(0,n.jsxs)("a",{href:"https://nextjs.org/docs",className:a().card,children:[(0,n.jsx)("h2",{children:"Documentation \u2192"}),(0,n.jsx)("p",{children:"Find in-depth information about Next.js features and API."})]}),(0,n.jsxs)("a",{href:"https://nextjs.org/learn",className:a().card,children:[(0,n.jsx)("h2",{children:"Learn \u2192"}),(0,n.jsx)("p",{children:"Learn about Next.js in an interactive course with quizzes!"})]}),(0,n.jsxs)("a",{href:"https://github.com/vercel/next.js/tree/canary/examples",className:a().card,children:[(0,n.jsx)("h2",{children:"Examples \u2192"}),(0,n.jsx)("p",{children:"Discover and deploy boilerplate example Next.js projects."})]}),(0,n.jsxs)("a",{href:"https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",className:a().card,children:[(0,n.jsx)("h2",{children:"Deploy \u2192"}),(0,n.jsx)("p",{children:"Instantly deploy your Next.js site to a public URL with Vercel."})]})]})]}),(0,n.jsx)("footer",{className:a().footer,children:(0,n.jsxs)("a",{href:"https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",target:"_blank",rel:"noopener noreferrer",children:["Powered by"," ",(0,n.jsx)("span",{className:a().logo,children:(0,n.jsx)("img",{src:"assets/vercel.svg",alt:"Vercel Logo",width:72,height:16})})]})})]})}},214:function(e){e.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",footer:"Home_footer____T7K",title:"Home_title__T09hD",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",logo:"Home_logo__27_tb"}},1664:function(e,t,r){e.exports=r(8418)}},function(e){e.O(0,[774,888,179],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);