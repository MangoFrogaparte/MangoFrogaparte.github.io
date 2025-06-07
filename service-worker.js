const CACHE_NAME = 'frogmangonapoleon-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  // Add paths to any other assets like CSS files, JavaScript files, images etc.
  './BIGSHOT-SIMULATOR/', // If this is an actual directory with an index file, you might need to list its contents
  './CHAOS-SIMULATOR/'   // Same here
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
