//=============== Configuration ===============//
const VERSION = 1;

const RUNTIME = {
    NAME: "runtime"
};

const PRECACHE = {
    NAME: "precache-v" + VERSION,
    URLS: [
        "/vercel.svg",
        "/favicon.ico"
    ],
    ROUTES: [
        "/",
        "/en"
    ]
};
//=============================================//

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        cacheManager.getPrecacheUrls()
            .then(() => caches.open(PRECACHE.NAME))
            .then(cache =>
                cache.addAll(
                    PRECACHE.URLS.map(item => encodeURI(item))
                )
            )
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
    event.waitUntil(
        cacheManager.clearCache()
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event: FetchEvent) => {
    const request = event.request;

    // Skip cross-origin requests, like those for Google Analytics.
    if(!request.url.startsWith(self.location.origin)) return;

    if(request.method === "GET") {
        return event.respondWith(strategies.cacheFirst(request));
    }

    event.respondWith(fetch(request));
});















//=============== Implementation ===============//
const strategies = {
    async cacheFirst(request: Request) {
        return caches.match(request)
            .then(cache => {
                if(cache) return cache;
                return fetch(request)
                    .then(response => {
                        cacheManager.saveToCache({
                            request,
                            response,
                            cacheName: PRECACHE.NAME
                        });
                        return response;
                    });
            });
    },
    async networkFirst(request: Request) {
        return fetch(request)
            .then(response => {
                if(request.method === "GET") {
                    cacheManager.saveToCache({
                        request,
                        response,
                        cacheName: RUNTIME.NAME
                    });
                }
                return response;
            })
            .catch(error => {
                return caches.match(request)
                    .then(cache => {
                        if(cache) return cache;
                        return error;
                    });
            });
    }
};

const cacheManager = {
    async clearCache() {
        const currentCache = [PRECACHE.NAME, RUNTIME.NAME];

        return caches.keys()
            .then(cache => {
                return cache.filter(key => !currentCache.includes(key));
            })
            .then(cacheToDelete => {
                return Promise.all(
                    cacheToDelete.map(key => caches.delete(key))
                );
            });
    },
    saveToCache({ request, response, cacheName }: {
      request: Request,
      response: Response,
      cacheName: string
    }) {
        const responseClone = response.clone();
        caches.open(cacheName)
            .then(cache => {
                cache.put(request, responseClone);
            });
    },
    async getPrecacheUrls() {
        return fetch("/next-static.json")
            .then(response => response.json())
            .then(urls => {
                PRECACHE.URLS = [
                    ...PRECACHE.ROUTES,
                    ...PRECACHE.URLS,
                    ...urls
                ];
                return PRECACHE.URLS;
            });
    }
};
//=============================================//