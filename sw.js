// Ask Artemis — Service Worker
// Enables PWA "Add to Home Screen" and basic offline caching

const CACHE_NAME = 'ask-artemis-v1';
const ASSETS = [
  '/artemis-chatbot-demo/chat.html',
  '/artemis-chatbot-demo/icon-192.png',
  '/artemis-chatbot-demo/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
