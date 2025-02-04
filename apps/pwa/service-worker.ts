const VERSION = 2;

const PRECACHE_NAME = "precache-v" + VERSION;
// const PRECACHE_STATIC = "/_next/static/";

// A list of local resources we always want to be cached.
const PRECACHE_ROUTES = [
    "/",
    "/en"
];

// The installation handler takes care of precaching the resources we always need.
self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        cacheManager.openCache()
            .then(() => self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", (event: ExtendableEvent) => {

    event.waitUntil(
        cacheManager.clearCache()
            .then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener("fetch", (event: FetchEvent) => {
    const request = event.request;

    const requestUrl = new URL(request.url);

    if(PRECACHE_ROUTES.includes(requestUrl.pathname)) {
        return event.respondWith(strategies.cacheFirst(request));
    }
    //
    // if(requestUrl.pathname.startsWith(PRECACHE_STATIC)) {
    //     return event.respondWith(strategies.cacheFirst(request));
    // }

    event.respondWith(fetch(request));
});


const strategies = {
    cacheFirst(request: Request) {
        return caches.match(request)
            .then(cache => {
                if(cache) return cache;
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
                return Promise.all(
                    cacheToDelete.map(key => caches.delete(key))
                );
            });
    }
};