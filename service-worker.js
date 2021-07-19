---
---
const cityNames = [
    {%- for city in site.cities -%}
        "{{ city.slug }}",
    {%- endfor -%}
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open('v{{ site.version }}').then((cache) => {
            return cache.addAll([
                "./",
                "index.html",
                "service-worker.js",
                "not911.webmanifest",
                "404.html",
                "style.css",
                "phone.svg",
                "apple-touch-icon.png",
                "favicon.ico",
                // include all cities in both their `.html` and non `.html` forms
                ...cityNames,
                ...cityNames.map(name => `${name}.html`)
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.filter((cacheName) => {
                return cacheName !== 'v{{ site.version }}';
            }).map((cacheName) => {
                return caches.delete(cacheName);
            })
        );
      })
    );
});
