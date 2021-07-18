---
---
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open('v{{ site.version }}').then((cache) => {
            return cache.addAll([
                "./",
                "index.html",
                "service-worker.js",
                "not911.webmanifest",
                "seattle.html",
                "404.html",
                "style.css",
                "phone.svg",
                "apple-touch-icon.png",
                "favicon.ico",
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.filter((cacheName) => {
                console.log(cacheName);
                return cacheName !== 'v{{ site.version }}';
            }).map((cacheName) => {
                return caches.delete(cacheName);
            })
        );
      })
    );
});
