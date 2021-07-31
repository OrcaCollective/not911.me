const citySlugs = ['seattle'];
const version = 0.1;

self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(version).then((cache) => {
            return cache.addAll([
                "./",
                "service-worker.js",
                "not911.webmanifest",
                "404.html",
                "style.css",
                "phone.svg",
                "apple-touch-icon.png",
                "favicon.ico",
                // include all cities in both their `.html` and non `.html` forms
                ...citySlugs,
                ...citySlugs.map(name => `${name}.html`)
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(r => {
            if (r) {
                return r;
            }
            return fetch(event.request.clone())
                .then(response => {
                    if (response.status < 400) {
                        caches.open(version).then(cache => cache.put(event.request, response));
                        return response.clone();
                    } else {
                        const req404 = new Request("/404.html");
                        return caches.match(req404);
                    }
                })
        })
    )
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.filter((cacheName) => {
                return cacheName !== version;
            }).map((cacheName) => {
                return caches.delete(cacheName);
            })
        );
      })
    );
});
