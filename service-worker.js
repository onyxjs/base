/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "babe5b43652df5444affa42723cb4dab"
  },
  {
    "url": "assets/css/0.styles.3b45fdbf.css",
    "revision": "b1f06822fbb51cf707e6b03bcb4f0f93"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.c9d8e1b3.js",
    "revision": "da74b1545fc0b5d44c384f5c3efacb29"
  },
  {
    "url": "assets/js/11.78a1a3ef.js",
    "revision": "d9bf40b0c08eedff1e20c06bb796c7ba"
  },
  {
    "url": "assets/js/12.88b8708d.js",
    "revision": "2a1e105d02e5e9be9caff68efe7b5e64"
  },
  {
    "url": "assets/js/13.062e2c47.js",
    "revision": "95b09d4b1e15125eefc8b30a253f8135"
  },
  {
    "url": "assets/js/14.1cbdbe56.js",
    "revision": "8441ad6bcb9e605d2cd8ad80046b90bc"
  },
  {
    "url": "assets/js/15.488aae39.js",
    "revision": "00f58fdbcc049b12dfbde4a09afc9f6d"
  },
  {
    "url": "assets/js/2.e75291c6.js",
    "revision": "d706905aaa7636452b8eacff30931dd3"
  },
  {
    "url": "assets/js/3.acff8b0a.js",
    "revision": "e66d370b70f4c89cafe0c41a9da1be8f"
  },
  {
    "url": "assets/js/4.a95031f2.js",
    "revision": "31aeeee51ca091ad9224e3a7873b232d"
  },
  {
    "url": "assets/js/5.7e9f3187.js",
    "revision": "c453dfa1982bfb34e1d9659dec51f6e7"
  },
  {
    "url": "assets/js/6.4e0a17c4.js",
    "revision": "14853d99c99dded6ef4268c5cb3952f0"
  },
  {
    "url": "assets/js/7.ea937671.js",
    "revision": "9c4d6b88d8d68bb129d9bb34232f0ed4"
  },
  {
    "url": "assets/js/8.d29418e0.js",
    "revision": "a8c2de17d2747251eb48acc696579a19"
  },
  {
    "url": "assets/js/9.a6af8239.js",
    "revision": "3c6ee7d2b9bd0e3215259e5a4929d1ab"
  },
  {
    "url": "assets/js/app.8baad7d8.js",
    "revision": "4fbedcd3f85824d7b9dd19d9a7626ff3"
  },
  {
    "url": "index.html",
    "revision": "5ae47ff5e17f00dfe7d1f06bfe1228d7"
  },
  {
    "url": "matchers/index.html",
    "revision": "370078dbc15034c5692f8120e17dcc40"
  },
  {
    "url": "matchers/matchers/index.html",
    "revision": "a88875431630781f7f5c64a852f34a45"
  },
  {
    "url": "matchers/matchers/to-be-defined.html",
    "revision": "78e0b1dd7c8f1fc5b324ac70e5772216"
  },
  {
    "url": "matchers/matchers/to-be.html",
    "revision": "d126c2ed769bf872d2203310220de360"
  },
  {
    "url": "mock/index.html",
    "revision": "52b30292adabb163b4525831df7a6e6a"
  },
  {
    "url": "onyx-logo-sm.svg",
    "revision": "33c488d827f1917efd9d30188b9eb261"
  },
  {
    "url": "ru/index.html",
    "revision": "34772d8ddabd993e7e7c5db9a5eb4039"
  },
  {
    "url": "ru/matchers/index.html",
    "revision": "152123818ac1cea8c2f562a1c8d0c66c"
  },
  {
    "url": "ru/mock/index.html",
    "revision": "8708c00462be621b0d32b8576b6976bc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
