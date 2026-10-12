/* 初回に全デモを保存し、以降は通信なしでも学習可能にする。 */
const CACHE = 'motion-match-pages-a67e149bb57b';
const ASSETS = [
  "./",
  "./dist/app.js",
  "./dist/core.js",
  "./dist/icon.svg",
  "./index.html",
  "./manifest.webmanifest",
  "./dist/renderer.js",
  "./dist/styles.css",
  "./dist/vendor/assets/atlas-bundle.js",
  "./dist/vendor/assets/atlas-stage.css",
  "./dist/vendor/assets/motion-base-fixes.css",
  "./dist/vendor/assets/motion-base-fixes.js",
  "./dist/vendor/assets/motion-catalog-experimental-en.js",
  "./dist/vendor/assets/motion-catalog-experimental.css",
  "./dist/vendor/assets/motion-catalog-experimental.js",
  "./dist/vendor/assets/motion-catalog-ui.css",
  "./dist/vendor/assets/motion-catalog-ui.js",
  "./dist/vendor/assets/motion-runtime.js",
  "./dist/vendor/assets/style.css",
  "./dist/vendor/assets/text-bundle.js",
  "./dist/vendor/assets/text-motion.css",
  "./dist/vendor/data/atlas-items.js",
  "./dist/vendor/data/atlas-merge.js",
  "./dist/vendor/data/motion-expansion.js",
  "./dist/vendor/data/motions.js",
  "./dist/vendor/data/text/items.js",
  "./dist/vendor/data/text-merge.js"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) if (name.startsWith('motion-match-') && name !== CACHE) await caches.delete(name);
    await self.clients.claim();
    for (const client of await self.clients.matchAll()) client.postMessage({type:'CACHE_READY'});
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'CHECK_CACHE') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const complete = (await Promise.all(ASSETS.map(url => cache.match(url)))).every(Boolean);
    if (complete) event.source?.postMessage({type:'CACHE_READY'});
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(event.request);
    if (cached) return cached;
    try { return await fetch(event.request); }
    catch (error) { if (event.request.mode === 'navigate') return cache.match('./index.html'); throw error; }
  }));
});
