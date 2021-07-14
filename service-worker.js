self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("v1").then((cache) => {
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
