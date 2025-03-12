const CACHE_NAME = "abstract-rhf-cache-v1"; // ! DEPENDENT ON MANIFEST.JSON. UPDATE ON SUBSEQUENT DEPLOYMENTS.

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll([
				"/",
				"/offline",
				// Add other static assets here
			]);
		}),
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return (
				response ||
				fetch(event.request).catch(() => {
					return caches.match("/offline");
				})
			);
		}),
	);
});
