if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let n=Promise.resolve();return r[e]||(n=new Promise((async n=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=n}else importScripts(e),n()}))),n.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},n=(n,r)=>{Promise.all(n.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(n)};self.define=(n,s,a)=>{r[n]||(r[n]=Promise.resolve().then((()=>{let r={};const i={uri:location.origin+n.slice(1)};return Promise.all(s.map((n=>{switch(n){case"exports":return r;case"module":return i;default:return e(n)}}))).then((e=>{const n=a(...e);return r.default||(r.default=n),r}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/framework-64eb7138163e04c228e4.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/chunks/main-173e16f84e46bc18352f.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/chunks/pages/_app-f323922e5db7ee54ac90.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/chunks/pages/_error-e69890b6db18dcbc6fa4.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/chunks/pages/index-8efff97941d2404ac4e3.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/chunks/pages/person/%5Bid%5D-c240ea65c3640d092794.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/chunks/polyfills-eef578260fd80f8fff94.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/chunks/webpack-189c53927ffd3caf09c3.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/css/7f1ea3cc6d4cf2b1e42b.css",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/wy7MrOQPtnECFhH3Mff7J/_buildManifest.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/_next/static/wy7MrOQPtnECFhH3Mff7J/_ssgManifest.js",revision:"wy7MrOQPtnECFhH3Mff7J"},{url:"/android-launchericon-144-144.png",revision:"1f317debfb9aa8de0d7841a5e166c38b"},{url:"/android-launchericon-192-192.png",revision:"aaa9ed6a96fbb32649c35bcbdf31ae65"},{url:"/android-launchericon-48-48.png",revision:"7fffd1da0705d2b27f90a99806ff51bd"},{url:"/android-launchericon-512-512.png",revision:"b004ea1a55f934d1cd6da63dd0fb55bf"},{url:"/android-launchericon-72-72.png",revision:"e3de04dfba2cf41dcb86e549960e0387"},{url:"/android-launchericon-96-96.png",revision:"8e508790c9530963e9110901e4d03eb2"},{url:"/chrome-extensionmanagementpage-48-48.png",revision:"7fffd1da0705d2b27f90a99806ff51bd"},{url:"/chrome-favicon-16-16.png",revision:"cc2790d2b3b6f4da872064c6861721fd"},{url:"/chrome-installprocess-128-128.png",revision:"08c5fccebb71e92e3494f67288ab70a9"},{url:"/favicon.ico",revision:"90f02dc17d1fbe4126291d2fa3b0b8ac"},{url:"/firefox-general-16-16.png",revision:"cc2790d2b3b6f4da872064c6861721fd"},{url:"/firefox-general-256-256.png",revision:"eac927c094c1da3525016d83dfbede36"},{url:"/firefox-general-32-32.png",revision:"884e4b2181140d3d1117417a4242a1d4"},{url:"/firefox-general-48-48.png",revision:"7fffd1da0705d2b27f90a99806ff51bd"},{url:"/firefox-general-64-64.png",revision:"7951fbaaf79b6af286e9cdc909dbb32c"},{url:"/firefox-general-90-90.png",revision:"73008fbb08d07e932dc2f67a223d3237"},{url:"/firefox-marketplace-512-512.png",revision:"b004ea1a55f934d1cd6da63dd0fb55bf"},{url:"/logo.png",revision:"241c8f9403597ddaf1fce7f28cad95e1"},{url:"/manifest.json",revision:"8cd4e7e40f5bfca5f95de2cd0cdb20f4"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:r,state:s})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
