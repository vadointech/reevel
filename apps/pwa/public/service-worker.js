"use strict";
const VERSION = 2;
const PRECACHE_NAME = "precache-v" + VERSION;
const PRECACHE_ROUTES = [
    "/",
    "/en"
];
self.addEventListener("install", (event) => {
    event.waitUntil(cacheManager.openCache()
        .then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
    event.waitUntil(cacheManager.clearCache()
        .then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
    const request = event.request;
    const requestUrl = new URL(request.url);
    if (PRECACHE_ROUTES.includes(requestUrl.pathname)) {
        return event.respondWith(strategies.cacheFirst(request));
    }
    event.respondWith(fetch(request));
});
const strategies = {
    cacheFirst(request) {
        return caches.match(request)
            .then(cache => {
            if (cache)
                return cache;
            return fetch(request)
                .then(response => {
                const responseClone = response.clone();
                caches.open(PRECACHE_NAME)
                    .then(cache => {
                    cache.put(request, responseClone);
                });
                return response;
            });
        });
    }
};
const cacheManager = {
    async openCache() {
        const cache = await caches.open(PRECACHE_NAME);
        return await cache.addAll(PRECACHE_ROUTES);
    },
    async clearCache() {
        const currentCache = [PRECACHE_NAME];
        return caches.keys()
            .then(cache => {
            return cache.filter(key => !currentCache.includes(key));
        })
            .then(cacheToDelete => {
            return Promise.all(cacheToDelete.map(key => caches.delete(key)));
        });
    }
};
