/* 初回に全デモを保存し、以降は通信なしでも学習可能にする。 */
const CACHE = 'motion-match-20261012-v1';
const ASSETS = [
  "./",
  "./app.js",
  "./core.js",
  "./icon.svg",
  "./index.html",
  "./manifest.webmanifest",
  "./renderer.js",
  "./styles.css",
  "./vendor/assets/atlas-bundle.js",
  "./vendor/assets/atlas-stage.css",
  "./vendor/assets/motion-base-fixes.css",
  "./vendor/assets/motion-base-fixes.js",
  "./vendor/assets/motion-catalog-experimental-en.js",
  "./vendor/assets/motion-catalog-experimental.css",
  "./vendor/assets/motion-catalog-experimental.js",
  "./vendor/assets/motion-catalog-ui.css",
  "./vendor/assets/motion-catalog-ui.js",
  "./vendor/assets/motion-runtime.js",
  "./vendor/assets/style.css",
  "./vendor/assets/text-bundle.js",
  "./vendor/assets/text-motion.css",
  "./vendor/data/atlas-items.js",
  "./vendor/data/atlas-merge.js",
  "./vendor/data/motion-expansion.js",
  "./vendor/data/motions.js",
  "./vendor/data/text/items.js",
  "./vendor/data/text-merge.js"
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
