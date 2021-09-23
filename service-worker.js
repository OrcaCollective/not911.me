---
---
const cityNames = [
	{%- for city in site.cities -%}
		"{{ city.slug }}",
	{%- endfor -%}
];

// Add/remove/edit files to cache here
const cachedFiles = [
	"./",
	"index.html",
	"main.js",
	"service-worker.js",
	"not911.webmanifest",
	"404.html",
	"style.css",
	"apple-touch-icon.png",
	"icons/dark-theme.svg",
	"icons/light-theme.svg",
	"icons/phone-dark.svg",
	"icons/phone-light.svg",
	"favicon.ico",
	// include all cities in both their `.html` and non `.html` forms
	...cityNames,
	...cityNames.map(name => `${name}.html`)
];

const cacheKey = '{{ site.version }}';

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(cacheKey).then((cache) => {
			// Cache all the files listed above
			return cache.addAll(cachedFiles);
		})
	);
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	if (request.method === 'GET') {
		event.respondWith(
			fetch(request)
			.then(function(response) {
				return caches.open(cacheKey).then(function(cache) {
					return cache.put(event.request, response.clone()).then(function() {
						return response;
					})
				})
			})
			.catch((err) => {
				console.error(err);
				return caches.open(cacheKey).then((cache) => {
					return cache.match(request);
				});
			})
		)
	}
});
